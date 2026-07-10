"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Parcel } from "@/lib/types";
import { bhumiApi } from "@/lib/api-client";

const MapInner = dynamic(() => import("./FraudMapInner"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gov-grey rounded-card animate-pulse" />,
});

export function FraudMap() {
  const [parcels, setParcels] = useState<Parcel[]>([]);

  useEffect(() => {
    bhumiApi.getParcels().then(setParcels).catch(() => {});
  }, []);

  return (
    <div className="gov-card overflow-hidden">
      <div className="p-3 border-b border-gov-border">
        <p className="text-sm font-semibold text-gov-navy">District Parcel Map</p>
        <p className="text-xs text-gov-muted">Green = Active · Amber = In Transfer · Red = Flagged</p>
      </div>
      <MapInner parcels={parcels} />
    </div>
  );
}
