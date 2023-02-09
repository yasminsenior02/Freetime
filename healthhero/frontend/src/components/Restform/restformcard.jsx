import "./restformcard.css";
import React from "react";
import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { Box } from "@mui/system";
import { Container } from "@mui/system";
import { colors } from "@mui/material";
import MapApp from "../Maps/MapApp";

export default function ResFormCard({ resId }) {
  const [restaurant, setRestaurant] = useState([]);
  const [restrictions, setRestrictions] = useState([]);

  useEffect(() => {
    async function getResId() {
      const res = await apiClient.listRestsbyId();
      //   console.log(res);
      console.log("restaurant list", res.data.restaurants);
      setRestaurant(res.data.restaurants[0]);
    }
    getResId();
  }, []);

  useEffect(() => {
    console.log("restaurant in restFormCard", restaurant);
    console.log("restaurant lat", restaurant.latitude);
    console.log("restaurant long", restaurant.longitude);
  }, [restaurant]);

  //const { image_url, name, location, description, restrictions } = resId;

  useEffect(() => {
    async function getRestrictions() {
      console.log("restaurant id in getRest", restaurant.id);
      const res = await apiClient.listRestaurantRestrictions(restaurant.id);
      setRestrictions(res.data.restrictions);
      console.log("Restaurant restriction list", res.data.restrictions);
    }
    getRestrictions();
  }, [restaurant]);

  useEffect(() => {
    console.log("restaurant's restrictions:", restrictions);
  }, [restrictions]);

  return (
    <div>
      <p className="resname">{restaurant.name}</p>
      <Container
        className="RestCard"
        sx={{ background: "#B1907F", display: "flex" }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontCol: "white",
          }}
        ></Box>
        {/* <Link to={"/resDescript/" + id} className="media"> */}
        <img className="resImage" src={restaurant.image_url}></img>
        {/* </Link> */}
        <div className="resinfo">
          <Container
            sx={{
              background: "#B1907F",
              justifyContent: "space-between",
              Height: "500%",
              Width: "20",
              float: "left",
            }}
          >
            <Box sx={{ fontSize: "150%", justifyContent: "space-between" }}>
              <p className="location">
                {" "}
                Address: <br></br>
                {restaurant.location}
              </p>
              <p className="latitude">
                {" "}
                Latitude: <br></br> {restaurant.latitude}
              </p>
              <p className="longitude">
                {" "}
                Longitude: <br></br> {restaurant.longitude}
              </p>
              Restrictions: <br></br>
              {restrictions.map((restriction) => {
                return <div> {restriction} </div>;
              })}
              <p className="restrict">{restaurant.restrictions} </p>
            </Box>

            <Box sx={{ fontSize: "150%", justifyContent: "space-between" }}>
              <p className="resdes">{restaurant.description}</p>
            </Box>
          </Container>
          {/* <MapApp
            restaurant={restaurant}
            latitude={restaurant.latitude}
            longitude={restaurant.longitude}
          /> */}
          {/* <a href="https://gps-coordinates.org/my-location.php?lat=40.7648&lng=-73.9808" target="_blank">(40.7648,-73.9808)</a> */}
        </div>
      </Container>
      <MapApp
        restaurant={restaurant}
        latitude={restaurant.latitude}
        longitude={restaurant.longitude}
      />
    </div>
  );
}
