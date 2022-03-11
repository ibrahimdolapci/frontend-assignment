import {MapContainer, TileLayer, Marker, useMapEvents, useMap} from 'react-leaflet'
import {useLazyPositionsQuery} from "../../app/api";
import {useCallback, useEffect, useMemo, useState} from "react";
import {IVesselPosition, IVesselPositionsQueryArgs} from "../../app/types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectVesselTracks, updatePosition} from "./slice";
import L from 'leaflet';
import markerUrl from '../../assets/images/ship.png';
import {Button, Descriptions, Layout, Typography} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

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
        className: 'ship-marker',
        html: `<div style="transform: rotate(${position.HEADING}deg)"><img src="${markerUrl}" alt="" /></div>`
    }), [position]);

    return (
        <Marker position={{lat: position.LAT, lng: position.LON}} icon={markerIcon}
                eventHandlers={{click: handleClick}}/>
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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <Layout.Sider width={0} collapsedWidth={300} collapsed={!!selectedPosition} theme="light">
            <div style={{padding: 20}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography.Title level={5}
                                      style={{marginBottom: 0}}>{selectedPosition?.SHIPNAME}</Typography.Title>
                    <Button type="text" icon={<CloseOutlined/>} onClick={() => dispatch(updatePosition(null))}/>
                </div>
                <Descriptions title="Position Details" column={1}>
                    <Descriptions.Item label="Type">{selectedPosition?.TYPE_NAME}</Descriptions.Item>
                    <Descriptions.Item label="Course">{selectedPosition?.COURSE}</Descriptions.Item>
                    <Descriptions.Item label="Destination">{selectedPosition?.DESTINATION}</Descriptions.Item>
                    <Descriptions.Item label="Width">{selectedPosition?.WIDTH} metres</Descriptions.Item>
                    <Descriptions.Item label="Speed">{selectedPosition?.SPEED} knot</Descriptions.Item>
                </Descriptions>
                <Button type="primary" ghost
                        onClick={() => selectedPosition?.SHIP_ID && navigate(selectedPosition?.SHIP_ID)}>Show Vessel
                    Historical Positions</Button>
            </div>
        </Layout.Sider>
    )
}

export default function VesselsPosition() {
    return (
        <Layout>
            <Layout.Content>
                <MapContainer center={[38.568100, -74.719560]} zoom={12} style={{height: "100vh", width: '100%'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <VesselPositionsContainer/>
                </MapContainer>
            </Layout.Content>
            <VesselDetails/>
        </Layout>

    )
}
