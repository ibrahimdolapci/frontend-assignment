import {Layout} from "antd";
import {MapContainer, TileLayer} from "react-leaflet";
import React from "react";
import {VesselPositionsContainer} from "./container";
import {VesselDetails} from "./details";

export default function VesselsPositionList() {
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
