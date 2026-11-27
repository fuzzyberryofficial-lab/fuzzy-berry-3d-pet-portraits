import type { Metadata } from "next";
import { langAlternates } from "@/lib/langRoutes";
import ShowroomPage from "@/components/showroom/ShowroomPage";

export const metadata: Metadata = {
  title: "Showroom Frankfurt",
  description:
    "See FuzzyBerry portraits in person: our display shelf at 's Fachl in Frankfurt. Address and visiting info.",
  alternates: langAlternates("/showroom", "en"),
};

export default function Page() {
  return <ShowroomPage />;
}
