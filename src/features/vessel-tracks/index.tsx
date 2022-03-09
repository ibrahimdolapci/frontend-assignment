import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {usePositionsQuery} from "../../app/api";

export function VesselTracks() {
    const {data, error, isLoading} = usePositionsQuery({
        MINLAT: 38.20882,
        MAXLAT: 40.24562,
        MINLON: -6.7749,
        MAXLON: -4.13721
    });

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{height: "100vh"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
