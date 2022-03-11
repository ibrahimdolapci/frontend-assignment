import L from "leaflet";
import markerUrl from "../assets/images/ship.png";
import { IVesselPosition } from "./types";

export function getMarkerIcon(position: IVesselPosition) {
  return L.divIcon({
    iconSize: [25, 25],
    iconAnchor: [25, 25],
    popupAnchor: [-12.5, -20],
    className: "ship-marker",
    html: `<div style="transform: rotate(${position.HEADING}deg)"><img src="${markerUrl}" alt="" /></div>`,
  });
}
