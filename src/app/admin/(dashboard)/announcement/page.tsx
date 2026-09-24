import { getAnnouncementSettings } from "@/lib/adminData";
import AnnouncementForm from "@/components/admin/AnnouncementForm";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementPage() {
  const settings = await getAnnouncementSettings();

  return (
    <div className={tableStyles.section}>
      <h2 className={tableStyles.sectionTitle}>Announcement Bar</h2>
      <AnnouncementForm initial={settings} />
    </div>
  );
}
