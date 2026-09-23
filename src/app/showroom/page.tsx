import type { Metadata } from "next";
import ShowroomPage from "@/components/showroom/ShowroomPage";

export const metadata: Metadata = {
  title: "Showroom — Fuzzy Berry",
};

export default function Page() {
  return <ShowroomPage />;
}
