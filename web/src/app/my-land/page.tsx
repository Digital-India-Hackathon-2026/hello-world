import { redirect } from "next/navigation";

export default function LegacyMyLandRedirect() {
  redirect("/portal/parcels");
}
