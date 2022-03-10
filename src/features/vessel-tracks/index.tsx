import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet'
import {useLazyPositionQuery, useLazyPositionsQuery} from "../../app/api";
import {useCallback, useEffect, useMemo, useState} from "react";
import {IVesselPosition, IVesselPositionsQueryArgs} from "../../app/types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectVesselTracks, updatePosition} from "./slice";
import L from 'leaflet';
import markerUrl from '../../assets/images/ship.png';

const DEFAULT_BOUNDS = {
    MINLAT: 38.54400,
    MAXLAT: 38.59218,
    MINLON: -74.84315,
    MAXLON: -74.59596,
}

function VesselPosition({position, handleClick}: { position: IVesselPosition, handleClick: () => void }) {

    const markerIcon = useMemo(() => L.divIcon({
        iconSize: [25, 25],
        iconAnchor: [25, 25],
        popupAnchor: [-12.5, -20],
        html: `<div style="transform: rotate(${position.HEADING}deg)">
                <img src="${markerUrl}" width="25" height="25" alt="${position.SHIPNAME}" />
                </div>`
    }), [position]);

    return (
        <Marker position={{lat: position.LAT, lng: position.LON}} icon={markerIcon}>
            <Popup eventHandlers={{click: () => handleClick()}}>
                <span>{position.SHIPNAME}</span>
            </Popup>
        </Marker>
    )
}

function VesselPositions({positions}: { positions: IVesselPosition[] }) {
    const dispatch = useAppDispatch();

    const handleClick = useCallback((position: IVesselPosition) => {
        dispatch(updatePosition(position))
    }, [dispatch])

    return (
        <>
            {positions.map(position => (
                <VesselPosition key={position.MMSI} position={position} handleClick={() => handleClick(position)}/>
            ))}
        </>
    )
}

function VesselPositionsContainer() {
    const map = useMap();
    const [bounds, setBounds] = useState<IVesselPositionsQueryArgs>(DEFAULT_BOUNDS);
    const [loadPositions, {data: positions = []}] = useLazyPositionsQuery();

    useEffect(() => {
        if (bounds)
            loadPositions(bounds)
    }, [loadPositions, bounds]);

    const updateBounds = useCallback(() => {
        const bounds = map.getBounds();
        const {lat: MAXLAT, lng: MAXLON} = bounds.getNorthEast();
        const {lat: MINLAT, lng: MINLON} = bounds.getSouthWest();
        setBounds({
            MINLAT,
            MAXLAT,
            MINLON,
            MAXLON
        })
    }, [map]);

    useMapEvents({
        zoomend: updateBounds,
        dragend: updateBounds
    });

    return <VesselPositions positions={positions}/>
}

function VesselDetails() {
    const {selectedPosition} = useAppSelector(selectVesselTracks);
    const [loadPosition, {data}] = useLazyPositionQuery();

    console.log(data, selectedPosition);

    useEffect(() => {
        if (selectedPosition) {
            loadPosition({shipid: selectedPosition.SHIP_ID, days: 1});
        }
    }, [loadPosition, selectedPosition]);

    return (
        <div />
    )
}

export function VesselTracks() {
    return (
        <div>
            <MapContainer center={[38.568100, -74.719560]} zoom={12} style={{height: "100vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <VesselPositionsContainer/>
            </MapContainer>
            <VesselDetails/>
        </div>

    )
}
