import {useMap} from "react-leaflet";
import React, {useEffect, useMemo} from "react";
import L from 'leaflet';
import {IVesselPosition} from "../../../app/types";
import {getMarkerIcon} from "../../../app/utils";

export default function VesselHistoricalPositionMarkers({
                                                            positions,
                                                            activeIndex
                                                        }: { positions: IVesselPosition[], activeIndex: number }) {
    const map = useMap();
    const markers = useMemo(() => [...positions]
        .map((position) => {
            const icon = getMarkerIcon(position);

            return L.marker([position.LAT, position.LON], {icon})
        }), [positions]);

    const activeMarker = useMemo(() => markers[0], [markers]);

    useEffect(() => {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds());
    }, [map, markers]);

    useEffect(() => {
        activeMarker.addTo(map);

        return () => {
            activeMarker.removeFrom(map)
        }
    }, [map, activeMarker])

    useEffect(() => {
        const newActiveMarker = markers[activeIndex].removeFrom(map).addTo(map).setOpacity(0.2);
        activeMarker.setLatLng(newActiveMarker.getLatLng()).setIcon(newActiveMarker.getIcon()).setOpacity(1);
    }, [activeIndex]);

    return null;
}




