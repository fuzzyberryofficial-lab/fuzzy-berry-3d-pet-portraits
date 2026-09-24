import { getAnnouncementSettings } from "@/lib/adminData";
import AnnouncementBarClient from "./AnnouncementBarClient";

export default async function AnnouncementBar() {
  const settings = await getAnnouncementSettings();
  return <AnnouncementBarClient settings={settings} />;
}
