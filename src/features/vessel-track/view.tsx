import {useHistoricalPositionQuery} from "../../app/api";
import {useParams} from "react-router-dom";
import {Button, Layout, Space} from "antd";
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import L from 'leaflet';
import markerUrl from "../../assets/images/ship.png";
import {LeftOutlined, PauseOutlined, PlayCircleOutlined, RightOutlined} from "@ant-design/icons";
import {IVesselPosition} from "../../app/types";

function Controls({positions}: { positions: IVesselPosition[] }) {
    const map = useMap();
    const [activeIndex, setActiveIndex] = useState(1);
    const intervalId = useRef<NodeJS.Timeout>();
    const markers = useMemo(() => [...positions]
        .map((position) => {
            const icon = L.divIcon({
                iconSize: [25, 25],
                iconAnchor: [25, 25],
                popupAnchor: [-12.5, -20],
                className: 'ship-marker',
                html: `<div style="transform: rotate(${position.HEADING}deg)"><img src="${markerUrl}" alt="" /></div>`
            });

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

    const goPrevious = useCallback(() => {
        setActiveIndex(activeIndex => (activeIndex === 0) ? markers.length - 1 : activeIndex - 1);
    }, [markers]);

    const goNext = useCallback(() => {
        setActiveIndex(activeIndex => (activeIndex + 1) % markers.length)
    }, [markers]);

    const play = useCallback(() => {
        intervalId.current = setInterval(goNext, 500);
    }, [goNext]);

    const stop = useCallback(() => {
        if (intervalId.current)
            clearInterval(intervalId.current)
    }, []);

    return (
        <Space style={{position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999}}>
            <Button icon={<LeftOutlined/>} onClick={goPrevious}/>
            <Button icon={<RightOutlined/>} onClick={goNext}/>
            <Button icon={<PlayCircleOutlined/>} onClick={play}/>
            <Button icon={<PauseOutlined/>} onClick={stop}/>
        </Space>
    );
}

function VesselPositionsContainer({id}: { id: number }) {
    const {data = []} = useHistoricalPositionQuery({shipid: id, days: 1});

    if (!data?.length) return null;

    return <Controls positions={data}/>
}

export default function VesselPositions() {
    const {id} = useParams();

    return (
        <Layout>
            <Layout.Content>
                <MapContainer center={[38.568100, -74.719560]} zoom={12} style={{height: "100vh", width: '100%'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {id && (<VesselPositionsContainer id={+id}/>)}
                </MapContainer>
            </Layout.Content>
        </Layout>
    )
}
