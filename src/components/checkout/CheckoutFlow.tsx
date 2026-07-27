"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Baloo_2, Poppins } from "next/font/google";
import styles from "./CheckoutFlow.module.css";
import ImageUploadSlot from "./ImageUploadSlot";
import { COLLECTIONS_BASE, FRAME_SWATCHES, type CollectionKey, type FrameColorKey } from "./catalog";
import { COLLECTION_KEYS, TR, type Lang, type Step } from "./translations";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-baloo" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

interface ShipInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  country: string;
}

interface CheckoutSnapshot {
  collectionKey: CollectionKey | null;
  typeKey: string | null;
  sizeIndex: number;
  addFrame: boolean;
  frameColor: FrameColorKey;
  artistNotes: string;
  ship: ShipInfo;
}

const SNAPSHOT_KEY = "fb_checkout_snapshot";

const STEP_ORDER: Step[] = ["style", "upload", "shipping", "payment", "done"];
const STEP_COLORS: Record<Step, string> = {
  style: "var(--sun)",
  upload: "var(--mint)",
  shipping: "var(--plum)",
  payment: "var(--berry)",
  done: "var(--sun)",
};

export default function CheckoutFlow() {
  const [lang, setLangState] = useState<Lang>("en");
  const [step, setStep] = useState<Step>("style");
  const [collectionKey, setCollectionKey] = useState<CollectionKey | null>(null);
  const [typeKey, setTypeKey] = useState<string | null>(null);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [addFrame, setAddFrame] = useState(false);
  const [frameColor, setFrameColor] = useState<FrameColorKey>("naturalWood");
  const [artistNotes, setArtistNotes] = useState("");
  const [photos, setPhotos] = useState<(File | null)[]>([null, null, null]);
  const [ship, setShip] = useState<ShipInfo>({ name: "", email: "", address: "", city: "", postal: "", country: "" });
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentError, setPaymentError] = useState<"start-error" | "failed" | "verify-error" | null>(null);
  const [paymentCancelled, setPaymentCancelled] = useState(false);

  useEffect(() => {
    // One-time correction after hydration: the server always renders "en"
    // (localStorage isn't available there), so the stored preference can
    // only be applied once the client has mounted.
    const stored = window.localStorage.getItem("fb_lang");
    if (stored === "en" || stored === "de") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    // Stripe Checkout is a real browser redirect away from the app and back,
    // so any in-memory selection is gone by the time the customer returns.
    // We stash a snapshot in sessionStorage right before redirecting and
    // restore it here so the payment step (and the confirmation screen)
    // still has the right data.
    const params = new URLSearchParams(window.location.search);
    const stripeStatus = params.get("stripe");
    if (!stripeStatus) return;

    const raw = window.sessionStorage.getItem(SNAPSHOT_KEY);
    window.sessionStorage.removeItem(SNAPSHOT_KEY);
    if (raw) {
      try {
        const snapshot: CheckoutSnapshot = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCollectionKey(snapshot.collectionKey);
        setTypeKey(snapshot.typeKey);
        setSizeIndex(snapshot.sizeIndex);
        setAddFrame(snapshot.addFrame);
        setFrameColor(snapshot.frameColor);
        setArtistNotes(snapshot.artistNotes);
        setShip(snapshot.ship);
      } catch {}
    }
    setStep("payment");

    const sessionId = params.get("session_id");
    if (stripeStatus === "success" && sessionId) {
      setIsVerifying(true);
      fetch(`/api/orders?session_id=${encodeURIComponent(sessionId)}`)
        .then((res) => res.json())
        .then((data: { paid?: boolean; customerName?: string | null; customerEmail?: string | null }) => {
          if (data.paid) {
            setShip((prev) => ({
              ...prev,
              name: prev.name || data.customerName || "",
              email: prev.email || data.customerEmail || "",
            }));
            setStep("done");
          } else {
            setPaymentError("failed");
          }
        })
        .catch(() => setPaymentError("verify-error"))
        .finally(() => setIsVerifying(false));
    } else if (stripeStatus === "cancel") {
      setPaymentCancelled(true);
    }

    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const setLang = (next: Lang) => {
    try {
      window.localStorage.setItem("fb_lang", next);
    } catch {}
    setLangState(next);
  };

  const t = TR[lang];

  const collectionBase = collectionKey ? COLLECTIONS_BASE[collectionKey] : null;
  const typeBase = collectionBase && typeKey ? collectionBase.types[typeKey] : null;
  const size = typeBase ? typeBase.sizes[sizeIndex] : null;
  const portraitPrice = size ? size.price : 0;
  const total = portraitPrice + (addFrame ? 20 : 0);

  const currentIdx = STEP_ORDER.indexOf(step);
  const canContinueStyle = !!(collectionBase && typeBase && size);
  const shipValid = !!(ship.name && ship.email && ship.address && ship.city && ship.postal && ship.country);
  const canPay = !!(collectionBase && typeBase && size && shipValid);

  const selectedType = typeBase ? { label: t.types[typeBase.key] } : null;
  const selectedFrameColor = { label: t.frameColors[frameColor] };
  const selectedCollectionTitle = collectionBase ? t[collectionBase.key].title : "";

  const selectCollection = (key: CollectionKey) => {
    setCollectionKey(key);
    setTypeKey(null);
    setSizeIndex(0);
  };
  const selectType = (key: string) => {
    setTypeKey(key);
    setSizeIndex(0);
  };
  const setPhoto = (index: number, file: File | null) =>
    setPhotos((prev) => prev.map((p, i) => (i === index ? file : p)));
  const updateShip = (field: keyof ShipInfo, value: string) => setShip((prev) => ({ ...prev, [field]: value }));

  const handlePayWithStripe = async () => {
    if (!canPay || !collectionKey || !selectedType) return;
    setPaymentError(null);
    setPaymentCancelled(false);
    setIsRedirecting(true);

    const snapshot: CheckoutSnapshot = { collectionKey, typeKey, sizeIndex, addFrame, frameColor, artistNotes, ship };
    window.sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collectionKey,
          typeKey,
          sizeIndex,
          addFrame,
          displayNames: {
            collectionTitle: selectedCollectionTitle,
            typeLabel: selectedType.label,
            frameColorLabel: selectedFrameColor.label,
          },
          ship,
          artistNotes,
        }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "start-error");
      window.location.href = data.url;
    } catch {
      window.sessionStorage.removeItem(SNAPSHOT_KEY);
      setPaymentError("start-error");
      setIsRedirecting(false);
    }
  };

  const steps = useMemo(
    () =>
      STEP_ORDER.map((k, i) => ({
        key: k,
        label: t.steps[k],
        opacity: i <= currentIdx ? 1 : 0.4,
        bg: i === currentIdx ? STEP_COLORS[k] : "var(--surface)",
      })),
    [t, currentIdx],
  );

  return (
    <div className={`${styles.page} ${baloo.variable} ${poppins.variable}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>
          Fuzzy Berry
        </Link>
        <div className={styles.langSwitch}>
          <button
            type="button"
            className={`${styles.langPill} ${lang === "en" ? styles.langPillActive : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={`${styles.langPill} ${lang === "de" ? styles.langPillActive : ""}`}
            onClick={() => setLang("de")}
          >
            DE
          </button>
        </div>
        <Link href="/" className={styles.backLink}>
          {t.backToSite}
        </Link>
      </nav>

      <div className={styles.stepsWrap}>
        <div className={styles.stepsRow}>
          {steps.map((s) => (
            <span key={s.key} className={styles.stepPill} style={{ background: s.bg, opacity: s.opacity }}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        {step === "style" && (
          <>
            <h2 className={styles.h2}>{t.chooseCollection}</h2>
            <p className={styles.sub}>{t.chooseCollectionSub}</p>

            <div className={styles.collectionGrid}>
              {COLLECTION_KEYS.map((key) => {
                const c = COLLECTIONS_BASE[key];
                const label = t[key];
                const selected = collectionKey === key;
                return (
                  <div
                    key={key}
                    className={styles.collectionCard}
                    style={{ boxShadow: selected ? "6px 6px 0 var(--berry)" : "4px 4px 0 var(--ink)" }}
                    onClick={() => selectCollection(key)}
                  >
                    <div className={styles.collectionKicker}>{label.kicker}</div>
                    <div className={styles.collectionTitle}>{label.title}</div>
                    <p className={styles.collectionBody}>{label.body}</p>
                    <div className={styles.collectionFrom}>
                      {t.fromLabel} €{c.from}
                    </div>
                  </div>
                );
              })}
            </div>

            {collectionBase && (
              <div className={styles.field}>
                <label className={styles.fbFieldLabel}>{t.typeLabel}</label>
                <div className={styles.fbSeg}>
                  {Object.keys(collectionBase.types).map((k) => {
                    const active = typeKey === k;
                    return (
                      <label
                        key={k}
                        className={styles.fbSegOpt}
                        style={{ background: active ? "var(--sun)" : "var(--surface)" }}
                      >
                        <input type="radio" name="type" checked={active} onChange={() => selectType(k)} />
                        {t.types[k as keyof typeof t.types]}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {typeBase && (
              <>
                <div className={styles.field}>
                  <label className={styles.fbFieldLabel}>{t.sizeLabel}</label>
                  <div className={styles.fbSeg}>
                    {typeBase.sizes.map((sz, i) => {
                      const active = sizeIndex === i;
                      return (
                        <label
                          key={sz.label}
                          className={styles.fbSegOpt}
                          style={{ background: active ? "var(--mint)" : "var(--surface)" }}
                        >
                          <input type="radio" name="size" checked={active} onChange={() => setSizeIndex(i)} />
                          {sz.label} — €{sz.price}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.fbFieldLabel}>{t.frameLabel}</label>
                  <div className={styles.fbSeg}>
                    <label className={styles.fbSegOpt} style={{ background: addFrame ? "var(--berry)" : "var(--surface)" }}>
                      <input type="radio" name="frame" checked={addFrame} onChange={() => setAddFrame(true)} />
                      {t.yes}
                    </label>
                    <label className={styles.fbSegOpt} style={{ background: !addFrame ? "var(--berry)" : "var(--surface)" }}>
                      <input type="radio" name="frame" checked={!addFrame} onChange={() => setAddFrame(false)} />
                      {t.no}
                    </label>
                  </div>
                </div>

                {addFrame && (
                  <div className={styles.field} style={{ marginBottom: 24 }}>
                    <label className={styles.fbFieldLabel}>{t.frameColorLabel}</label>
                    <div className={styles.frameColorRow}>
                      {(Object.keys(FRAME_SWATCHES) as FrameColorKey[]).map((k) => (
                        <button key={k} type="button" className={styles.frameColorBtn} onClick={() => setFrameColor(k)}>
                          <span
                            className={styles.frameSwatch}
                            style={{ background: FRAME_SWATCHES[k], boxShadow: frameColor === k ? "0 0 0 3px var(--berry)" : "none" }}
                          />
                          <span className={styles.frameSwatchLabel}>{t.frameColors[k]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {size && selectedType && (
              <div className={styles.summaryCard}>
                <div className={styles.summaryLine}>
                  <span>
                    {selectedType.label} · {size.label}
                  </span>
                  <span>€{portraitPrice}</span>
                </div>
                {addFrame && (
                  <div className={styles.summaryLine}>
                    <span>
                      {t.frameLine} ({selectedFrameColor.label})
                    </span>
                    <span>€20</span>
                  </div>
                )}
                <div className={styles.summaryDivider} />
                <div className={styles.summaryTotal}>
                  <span>{t.total}</span>
                  <span>€{total}</span>
                </div>
              </div>
            )}

            <button
              type="button"
              className={`${styles.fbBtn} ${styles.fbBtnPrimary}`}
              disabled={!canContinueStyle}
              onClick={() => setStep("upload")}
            >
              {t.continueUpload} →
            </button>
          </>
        )}

        {step === "upload" && (
          <>
            <h2 className={styles.h2}>{t.uploadTitle}</h2>
            <p className={styles.sub}>{t.uploadSub}</p>
            <div className={styles.uploadGrid}>
              <ImageUploadSlot placeholder={t.uploadPh1} file={photos[0]} onChange={(f) => setPhoto(0, f)} />
              <ImageUploadSlot placeholder={t.uploadPh2} file={photos[1]} onChange={(f) => setPhoto(1, f)} />
              <ImageUploadSlot placeholder={t.uploadPh3} file={photos[2]} onChange={(f) => setPhoto(2, f)} />
            </div>
            <div className={styles.field} style={{ marginBottom: 28 }}>
              <label className={styles.fbFieldLabel}>{t.notesLabel}</label>
              <textarea
                className={`${styles.fbInput} ${styles.fbTextarea}`}
                rows={3}
                value={artistNotes}
                onChange={(e) => setArtistNotes(e.target.value)}
              />
            </div>
            <div className={styles.actions}>
              <button type="button" className={`${styles.fbBtn} ${styles.fbBtnOutline}`} onClick={() => setStep("style")}>
                {t.back}
              </button>
              <button type="button" className={`${styles.fbBtn} ${styles.fbBtnPrimary}`} onClick={() => setStep("shipping")}>
                {t.continueShipping} →
              </button>
            </div>
          </>
        )}

        {step === "shipping" && (
          <>
            <h2 className={styles.h2}>{t.shippingTitle}</h2>
            <p className={styles.sub}>{t.shippingSub}</p>
            <div className={styles.rowTwo}>
              <div className={styles.field}>
                <label className={styles.fbFieldLabel}>{t.fullName}</label>
                <input className={styles.fbInput} type="text" value={ship.name} onChange={(e) => updateShip("name", e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.fbFieldLabel}>{t.email}</label>
                <input className={styles.fbInput} type="email" value={ship.email} onChange={(e) => updateShip("email", e.target.value)} />
              </div>
            </div>
            <div className={styles.field} style={{ marginBottom: 16 }}>
              <label className={styles.fbFieldLabel}>{t.address}</label>
              <input className={styles.fbInput} type="text" value={ship.address} onChange={(e) => updateShip("address", e.target.value)} />
            </div>
            <div className={styles.rowThree}>
              <div className={styles.field}>
                <label className={styles.fbFieldLabel}>{t.city}</label>
                <input className={styles.fbInput} type="text" value={ship.city} onChange={(e) => updateShip("city", e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.fbFieldLabel}>{t.postal}</label>
                <input className={styles.fbInput} type="text" value={ship.postal} onChange={(e) => updateShip("postal", e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.fbFieldLabel}>{t.country}</label>
                <input className={styles.fbInput} type="text" value={ship.country} onChange={(e) => updateShip("country", e.target.value)} />
              </div>
            </div>
            <div className={styles.actions}>
              <button type="button" className={`${styles.fbBtn} ${styles.fbBtnOutline}`} onClick={() => setStep("upload")}>
                {t.back}
              </button>
              <button
                type="button"
                className={`${styles.fbBtn} ${styles.fbBtnPrimary}`}
                disabled={!shipValid}
                onClick={() => setStep("payment")}
              >
                {t.continuePayment} →
              </button>
            </div>
          </>
        )}

        {step === "payment" && (
          <div className={styles.coGrid}>
            <div>
              <h2 className={styles.paymentTitle}>{t.paymentTitle}</h2>

              {isVerifying && <div className={`${styles.banner} ${styles.bannerNotice}`}>{t.verifyingPayment}</div>}
              {!isVerifying && paymentCancelled && (
                <div className={`${styles.banner} ${styles.bannerNotice}`}>{t.paymentCancelledMsg}</div>
              )}
              {!isVerifying && paymentError === "failed" && (
                <div className={`${styles.banner} ${styles.bannerError}`}>{t.paymentFailedMsg}</div>
              )}
              {!isVerifying && (paymentError === "verify-error" || paymentError === "start-error") && (
                <div className={`${styles.banner} ${styles.bannerError}`}>{t.paymentVerifyErrorMsg}</div>
              )}

              <p className={styles.paymentNote}>{t.stripeNote}</p>
              <div className={styles.actions}>
                <button type="button" className={`${styles.fbBtn} ${styles.fbBtnOutline}`} onClick={() => setStep("shipping")}>
                  {t.back}
                </button>
                <button
                  type="button"
                  className={`${styles.fbBtn} ${styles.fbBtnPrimary}`}
                  disabled={!canPay || isRedirecting || isVerifying}
                  onClick={handlePayWithStripe}
                >
                  {isRedirecting ? "…" : `${t.payWithStripe} — €${total}`}
                </button>
              </div>
            </div>
            <div className={styles.summarySidebar}>
              <div className={styles.summaryKicker}>{t.orderSummary}</div>
              <div className={styles.summaryItemTitle}>
                {selectedCollectionTitle} · {selectedType?.label} · {size?.label}
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryLine}>
                <span>{t.portrait}</span>
                <span>€{portraitPrice}</span>
              </div>
              {addFrame && (
                <div className={styles.summaryLine}>
                  <span>
                    {t.frameLine} ({selectedFrameColor.label})
                  </span>
                  <span>€20</span>
                </div>
              )}
              <div className={styles.summaryDivider} />
              <div className={styles.summarySidebarTotal}>
                <span>{t.total}</span>
                <span>€{total}</span>
              </div>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className={styles.doneWrap}>
            <p className={styles.doneKicker}>{t.orderConfirmed}</p>
            <h2 className={styles.doneTitle}>
              {t.thankYou} {ship.name}!
            </h2>
            <p className={styles.doneBody}>{t.doneBody}</p>
            <p className={styles.doneConfirmation}>
              {t.confirmationSent} {ship.email}
            </p>
            <Link href="/" className={`${styles.fbBtn} ${styles.fbBtnPrimary}`}>
              {t.backToFuzzy}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
