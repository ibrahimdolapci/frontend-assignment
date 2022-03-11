export interface IVesselPosition {
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
  // The Shipname of the subject vessel
  SHIPNAME: string;
  // The Shiptype of the subject vessel according to AIS transmissions - more
  SHIPTYPE: number;
  // A uniquely designated identifier for the vessel's transmitter station
  CALLSIGN: string;
  // The flag of the subject vessel according to AIS transmissions - more
  FLAG: string;
  // The name of the Port the subject vessel is currently in (NULL if the vessel is underway)
  CURRENT_PORT: string;
  // The Name of the Last Port the vessel has visited
  LAST_PORT: string;
  // The Date and Time (in UTC) that the subject vessel departed from the Last Port
  LAST_PORT_TIME: Date;
  // The Destination of the subject vessel according to the AIS transmissions
  DESTINATION: string;
  // The overall Length (in metres) of the subject vessel
  LENGTH: number;
  // The Breadth (in metres) of the subject vessel
  WIDTH: number;
  // The Draught (in metres x10) of the subject vessel according to the AIS transmissions
  DRAUGHT: number;
  // Gross Tonnage - unitless measure that calculates the moulded volume of all enclosed spaces of a ship
  GRT: number;
  // Deadweight - a measure (in metric tons) of how much weight a vessel can safely carry (excluding the vessel's own weight)
  DWT: number;
  // The year that the subject vessel was built
  YEAR_BUILT: number;
  // A uniquely assigned ID by MarineTraffic for the Current Port
  PORT_ID: number;
  // A uniquely assigned ID by United Nations for the Current Port
  PORT_UNLOCODE: string;
  // A uniquely assigned ID by MarineTraffic for the Last Port
  LAST_PORT_ID: number;
  // A uniquely assigned ID by United Nations for the Last Port
  LAST_PORT_UNLOCODE: string;
  // The Estimated Time of Arrival to Destination of the subject vessel according to the AIS transmissions
  ETA: Date;
  // The Estimated Time of Arrival to Destination of the subject vessel according to the MarineTraffic calculations
  ETA_CALC: Date;
  // A uniquely assigned ID by MarineTraffic for the Next Port
  NEXT_PORT_ID: number;
  // A uniquely assigned ID by United Nations for the Next Port
  NEXT_PORT_UNLOCODE: string;
  // The Name of the Next Port as derived by MarineTraffic based on the subject vessel's reported Destination
  NEXT_PORT_NAME: string;
  // The Country that the Next Port is located at
  NEXT_PORT_COUNTRY: string;
  // The Type of the subject vessel
  TYPE_NAME: string;
  // Further explanation of the SHIPTYPE ID
  AIS_TYPE_SUMMARY: string;
}

export interface IVesselPositionsQueryArgs {
  MINLAT: number;
  MAXLAT: number;
  MINLON: number;
  MAXLON: number;
}

export interface IVesselPositionQueryArgs {
  shipid: number;
  days: number;
}
