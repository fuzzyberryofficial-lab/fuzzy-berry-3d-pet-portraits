import type { Metadata } from "next";
import ShowroomPage from "@/components/showroom/ShowroomPage";

export const metadata: Metadata = {
  title: "Showroom Frankfurt",
  alternates: { canonical: "/showroom" },
};

export default function Page() {
  return <ShowroomPage />;
}
