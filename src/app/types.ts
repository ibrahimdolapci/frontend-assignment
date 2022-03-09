export interface VesselPosition {
    // Maritime Mobile Service Identity - a nine-digit number sent in digital form over a radio frequency that identifies the vessel's transmitter station
    MMSI: number;
    // 	International Maritime Organisation number - a seven-digit number that uniquely identifies vessels
    IMO: number;
    // The AIS Navigational Status of the subject vessel as input by the vessel's crew - more. There might be discrepancies with the vessel's detail page when vessel speed is near zero (0) knots.
    STATUS: number;
    // The speed (in knots x10) that the subject vessel is reporting according to AIS transmissions
    SPEED: number;
    // Longitude - a geographic coordinate that specifies the east-west position of the vessel on the Earth's surface
    LON: number;
    // Latitude - a geographic coordinate that specifies the north-south position of the vessel on the Earth's surface
    LAT: number;
    // The course (in degrees) that the subject vessel is reporting according to AIS transmissions
    COURSE: number;
    // The heading (in degrees) that the subject vessel is reporting according to AIS transmissions
    HEADING: number;
    // The date and time (in UTC) that the subject vessel's position was recorded by MarineTraffic
    TIMESTAMP: Date;
    // A uniquely assigned ID by MarineTraffic for the subject vessel
    SHIP_ID: number;
}

export interface VesselPositionsQuery {
    MINLAT: number;
    MAXLAT: number;
    MINLON: number;
    MAXLON: number;
}
