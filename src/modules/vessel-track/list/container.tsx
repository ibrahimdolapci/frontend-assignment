import { useMap, useMapEvents } from "react-leaflet";
import React, { useCallback, useEffect, useState } from "react";
import { IVesselPositionsQueryArgs } from "../../../app/types";
import { useLazyPositionsQuery } from "../../../app/api";
import { VesselPositionMarkers } from "./markers";

const DEFAULT_BOUNDS = {
  MINLAT: 38.544,
  MAXLAT: 38.59218,
  MINLON: -74.84315,
  MAXLON: -74.59596,
};

export function VesselPositionsContainer() {
  const map = useMap();
  const [bounds, setBounds] =
    useState<IVesselPositionsQueryArgs>(DEFAULT_BOUNDS);
  const [loadPositions, { data: positions = [] }] = useLazyPositionsQuery();

  useEffect(() => {
    if (bounds) loadPositions(bounds);
  }, [loadPositions, bounds]);

  const updateBounds = useCallback(() => {
    const bounds = map.getBounds();
    const { lat: MAXLAT, lng: MAXLON } = bounds.getNorthEast();
    const { lat: MINLAT, lng: MINLON } = bounds.getSouthWest();
    setBounds({
      MINLAT,
      MAXLAT,
      MINLON,
      MAXLON,
    });
  }, [map]);

  useMapEvents({
    zoomend: updateBounds,
    dragend: updateBounds,
  });

  return <VesselPositionMarkers positions={positions} />;
}
