import React, {SetStateAction} from "react";
import Map from "./Map";
import useMap from "./MapHook";

function MapContainer() {
  const {mapRef} = useMap();
  return <Map mapRef={mapRef}></Map>;
}

export default MapContainer;
