import * as React from "react";
import { useEffect, useState, Text, StyleSheet, TouchableOpacity } from "react";
import { useAuthContext } from "../../../AuthContext/auth";
import ComCard from "./ComCard";
import { Box } from "@mui/system";
// import { CommForm } from "../CommForm/Commform";
import "./SelComm.css";
import apiClient from "../../../services/apiClient";
import { Grid } from "@mui/material";

export default function ComGrid() {
  const { comm, setComm } = useAuthContext();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    async function getComm() {
      const res = await apiClient.listCommBySchool();
      console.log(res);
      setCommunities(res.data.communities);
      console.log("community list", res.data.communities);
    }
    getComm();
  }, []);

  useEffect(() => {
    console.log("communities by school:", communities);
  }, [communities]);

  return (
    // <Grid>
    <Box
      sx={{
        // background: "white",
        width: "90%",

        // m: 3,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {communities.map((comm, index) => {
        return (
          <ComCard key={index} comm={comm} showdescription={false} />
          // <Box
          //   key={index}
          //   sx={{
          //     background: "yellow",
          //     width: "1in",
          //     height: "1in",
          //     m: 3,
          //     borderRadius: ".5in",
          //     color: "black",
          //   }}
          // >
          //   {index + 1}
          // </Box>
        );
      })}
    </Box>
    // </Grid>
  );
  return (
    <div className="grid">
      <h1 className="header">Select A Community</h1>
      {community?.map((comm, index) => (
        <ComCard key={index} comm={comm} />
      ))}
    </div>
  );
}
