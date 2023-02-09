import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ResFormCard from "../Restform/restformcard";

import "./MapApp.css";

function MapApp(props) {
  const [position, setPosition] = useState([40.876, -63.98]);
  useEffect(() => {
    console.log("map rest", props.restaurant);
    setPosition([props.restaurant.latitude, props.restaurant.longitude]);
    // console.log("typeof", typeof props.restaurant.latitude);
  }, [props.restaurant]);

  // const position = [rest.latitude, rest.longitude];
  // let position = [37.7912043, -122.3961921];
  // if (props.restaurant) {
  //    position = [props.restaurant.latitude, props.restaurant.longitude];
  // }
  // default position, if have rest props set it to correct value

  return (
    <div>
      {props.restaurant &&
        props.restaurant.latitude &&
        props.restaurant.longitude && (
          <MapContainer
            center={[props.restaurant.latitude, props.restaurant.longitude]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[props.restaurant.latitude, props.restaurant.longitude]}
            >
              <Popup>
                Your Restuarant is Located Here! <br />
              </Popup>
            </Marker>
          </MapContainer>
        )}
      {/* <ResFormCard latitude={latitude} longitude={longitude} /> */}
    </div>
  );
}

export default MapApp;
