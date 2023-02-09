import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import { Card } from "@mui/material";
import { AuthContextProvider, useAuthContext } from "../../../AuthContext/auth";
import { Container } from "@mui/system";
import "../MyComm/MyComm.css";
import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";
import students from "../../img/students.png";
import chefs from "../../img/chefs.png";

export default function MyComm() {
  const { user, setUser } = useAuthContext(); //from prof
  var isRest = false;
  var isStudent = false;

  if (user?.type == "restaurant owner") {
    console.log("user type in navbar", user.type);
    isRest = true; //yes Restaurant!
    isStudent = false;
  } else if (user?.type == "student") {
    //user is student
    isRest = false;
    isStudent = true; //yes Student!
  }

  // const [userRestrictions, setUserRestrictions] = useState([]);
  const [diets, setDie] = useState([]);
  const [allergies, setAlls] = useState([]);
  // const [comms, setcomms] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  // console.log(user.school_id);
  useEffect(() => {
    async function getRest() {
      const res = await apiClient.listUserRestrictionsObj();
      setRestrictions(res.data.restrictions);
    }
    // async function getAlls() {
    //   const res = await apiClient.listAllergies();
    //   setAlls(res.data.allergies);
    // }
    async function getUserComms() {
      const res = await apiClient.listUserComms();
      setCommunities(
        res?.data?.userCommunities
          ? [...communities, res?.data?.userCommunities]
          : []
      );
      console.log("community list: ", res?.data?.userCommunities);
    }
    // getDiets();
    // getAlls();
    getRest();
    getUserComms();
  }, []);

  useEffect(() => {
    console.log("new version diets: ", diets);
  }, [diets]);

  useEffect(() => {
    console.log("new version allergeis: ", allergies);
  }, [allergies]);

  useEffect(() => {
    console.log("community array: ", communities);
  }, [communities]);

  const style = {
    color: "black",
    backgroundColor: "FFFAEC",
  };
  return (
    <Stack
      direction="column"
      sx={{ flexGrow: 1, marginLeft: "1%", marginRight: "1%" }}
    >
      <Box sx={style}>
        <h1 className="title"> Welcome {user ? user.username : null}! </h1>
      </Box>
      <Grid container spacing={2} sx={style}>
        <Grid item xs={12} lg={8}>
          <Box
            sx={{
              backgroundColor: "beige",
              // height: "3in",
              borderRadius: "10px",
            }}
          >
            {isStudent ? (
              <h3 id="left">My Restrictions</h3>
            ) : (
              <h3 id="left">My Restaurants</h3>
            )}
            {/* code for title of upper box dep on user^ */}
            {isStudent ? (
              <div>
                <div className="circles">
                  {restrictions
                    .filter((restriction) => restriction.type == "diet")
                    .map((diet) => {
                      return <div className="smoval">{diet.name}</div>;
                    })}
                  {restrictions
                    .filter((restriction) => restriction.type == "allergy")
                    .map((allergy) => {
                      return <div className="smoval2">{allergy.name}</div>;
                    })}
                </div>
              </div>
            ) : (
              <div>{/* <p>insert res data here</p> */}</div>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: "darkseagreen",
              height: "3in",
              borderRadius: "10px",
            }}
          >
            {isStudent ? (
              <>
                <h3 id="left">My Communities</h3>
                <div className="circles">
                  {communities?.map((comm) => {
                    return <div className="smoval3">{comm.name}</div>;
                  })}
                </div>
              </>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              backgroundColor: "green",
              borderRadius: "10px",
              height: "3in",
              // marginTop: "15%",
            }}
          >
            <h3 id="left">My Info</h3>
            <div className="info">
              <p> You are a {user ? user.type : null}</p>

              <p>Email : {user ? user.email : null}</p>
              {/* {isStudent ? <p>User's school</p> : null} */}

              {/* <p> School : {user ? credentials.school_id : null}</p> */}
            </div>
          </Box>
          <Box
            sx={{
              marginBottom: "20%",
              borderRadius: "10px",
              height: "3in",
              marginTop: "2%",
            }}
          >
            {isStudent ? (
              <img src={students} className="padT"></img>
            ) : (
              <img src={chefs} className="padT"></img>
            )}
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
