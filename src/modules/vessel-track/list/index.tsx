import { Layout } from "antd";
import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";
import { VesselPositionsContainer } from "./container";
import { VesselDetails } from "./details";

export default function VesselsPositionList() {
  return (
    <Layout>
      <Layout.Content>
        <MapContainer
          center={[38.5681, -74.71956]}
          zoom={12}
          className="h-screen w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <VesselPositionsContainer />
        </MapContainer>
      </Layout.Content>
      <VesselDetails />
    </Layout>
  );
}
