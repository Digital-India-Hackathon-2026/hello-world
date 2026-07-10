import { redirect } from "next/navigation";

export default function LegacySroRedirect() {
  redirect("/dashboard/transfers");
}
