"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { Parcel } from "@/lib/types";
import "leaflet/dist/leaflet.css";

export default function FraudMapInner({ parcels }: { parcels: Parcel[] }) {
  const center: [number, number] = parcels.length
    ? (() => {
        const [lat, lng] = parcels[0].geo.split(",").map(Number);
        return [lat || 17.75, lng || 78.05] as [number, number];
      })()
    : [17.75, 78.05];

  return (
    <MapContainer center={center} zoom={7} style={{ height: 320, width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parcels.map((p) => {
        const [lat, lng] = p.geo.split(",").map(Number);
        const color =
          p.status === "InTransfer" ? "#FF9933" : "#138808";
        return (
          <CircleMarker
            key={p.id}
            center={[lat, lng]}
            radius={10}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.7 }}
          >
            <Popup>
              <strong>#{p.id}</strong> — {p.surveyNumber}
              <br />
              {p.district} · {p.status}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
