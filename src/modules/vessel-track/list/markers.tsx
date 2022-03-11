import {IVesselPosition} from "../../../app/types";
import React, {useCallback, useMemo} from "react";
import {Marker, Popup} from "react-leaflet";
import {useAppDispatch} from "../../../app/hooks";
import {updatePosition} from "../slice";
import {getMarkerIcon} from "../../../app/utils";

function VesselPositionMarker({position, handleClick}: { position: IVesselPosition, handleClick: () => void }) {
    const markerIcon = useMemo(() => getMarkerIcon(position), [position]);

    return (
        <Marker position={{lat: position.LAT, lng: position.LON}} icon={markerIcon}
                eventHandlers={{click: handleClick}}>
            <Popup>
                {position.SHIPNAME}
            </Popup>
        </Marker>
    )
}

export function VesselPositionMarkers({positions}: { positions: IVesselPosition[] }) {
    const dispatch = useAppDispatch();

    const handleClick = useCallback((position: IVesselPosition) => {
        dispatch(updatePosition(position))
    }, [dispatch])

    return (
        <>
            {positions.map(position => (
                <VesselPositionMarker key={position.MMSI} position={position}
                                      handleClick={() => handleClick(position)}/>
            ))}
        </>
    )
}
