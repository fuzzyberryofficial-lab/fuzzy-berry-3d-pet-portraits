// Shared by the gift card page (browser) and the API (server).
export const GIFT_CARD_AMOUNTS = [50, 100, 179] as const;
export type GiftCardAmount = (typeof GIFT_CARD_AMOUNTS)[number];

export const GIFT_CARD_VALID_DAYS = 365;

export const GIFT_CARD_LIMITS = {
  name: 40,
  message: 200,
};
