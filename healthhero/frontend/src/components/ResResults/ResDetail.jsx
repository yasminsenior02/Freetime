import * as React from "react";
import { AuthContextProvider, useAuthContext } from "../../../AuthContext/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import ResCard from "./ResCard";
import "./ResDetail.css";
import MapApp from "../Maps/MapApp";

export default function ResDetail() {
  // var comm = community[commid];
  // const { comm, setComm } = useAuthContext();
  // const {id } = useAuthContext();
  // const [comm, setcomm] = useState(null);
  const [restaurant, setRestaurant] = useState();
  const { id } = useParams();
  useEffect(() => {
    console.log("id working", id);
  }, [id]);

  useEffect(() => {
    console.log("restaurant: ", restaurant);
  }, [restaurant]);

  useEffect(() => {
    async function getRestid() {
      const res = await apiClient.listRestbyId(id);
      console.log("response", res);
      setRestaurant(res.data.restaurant);
      console.log("restaurant id", res.data.restaurant);
    }
    getRestid();
  }, []);

  useEffect(() => {
    console.log("restaurant by id:", restaurant);
  }, [restaurant]);

  return (
    <div className="Restview">
      <h1 className="rest-card">Restaurant {restaurant?.name} !</h1>
      {/*// if not null try to get property if null= undefined */}
      {restaurant ? (
        <>
          <ResCard rest={restaurant} showdescription={true} id={id} />
          <MapApp restaurant={restaurant} />
        </>
      ) : null}
    </div>
  );
}
