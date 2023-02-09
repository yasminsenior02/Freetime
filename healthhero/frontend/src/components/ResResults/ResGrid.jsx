import * as React from "react";
import { useEffect, useState, Text, StyleSheet, TouchableOpacity } from "react";
import { useAuthContext } from "../../../AuthContext/auth";
import ResCard from "./ResCard";
import { Box } from "@mui/system";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./ResGrid.css";
import apiClient from "../../../services/apiClient";

export default function ResGrid() {
  //   const { rest, setRes } = useAuthContext();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState("");
  const [restrictions, setRestrictions] = useState([]);
  const [diets, setDiets] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function getRes() {
      //gets all restaurants that meet one or more of the users requirements
      const res = await apiClient.listMinRestaurants();
      console.log(res);
      setRestaurants(res.data.restaurants);
      console.log("restaurant list: ", res.data.restaurants);
    }
    async function getUserRestrictions() {
      const res = await apiClient.listUserRestrictionsObj();
      setRestrictions(res.data.restrictions)
    }
    async function getDiets() {
      const res = await apiClient.listDiets();
      console.log("diets list", res.data.diets);
      setDiets(res.data.diets); //this needs to change
    }
    async function getAllergies() {
      const res = await apiClient.listAllergies();
      setAllergies(res.data.allergies); //this need to change
      console.log("allergies list", res.data.allergies);
    }
    console.log("res grid rendering");
    getRes();
    getUserRestrictions();
    getDiets();
    getAllergies();
  }, []);

  // useEffect(() => {
  //   console.log("allergies from api call: " , allergies)
  // }, [])

  // useEffect(() => {
  //   console.log("diets from api call: " , diets)
  // }, [])

  // useEffect(() => {
  //   console.log("filter value is: ", filter);
  // }, [filter]);

  useEffect(() => {
    console.log("selected restrictions array", selected);
  }, [selected]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDiet(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAllergy(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    setSelected([...selectedDiet, ...selectedAllergy]);
  }, [selectedDiet, selectedAllergy]);

  let checker = (arr, target) => target.every((v) => arr.includes(v));

  //Step 1 make api call for minrestaurants #
  //Step 1.5 make an api call that gets user restrictions and stores them in an array #
  //step 2 add checkboxes that have user's restrictions #
  /*
  restaurants.filter(restaurant => checker(restaurant.restriction_name, user_restrictions))
  
  let checker = (arr, target) => target.every(v => arr.includes(v));
    target = user selections 
    checker(array2, array1)
  arr would be restaruant restriction list 
*/
  return (
    <Box
      sx={{
        // background: "white",
        width: "85%",

        // m: 3,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {/* <>
    
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Diets</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedDiet}
            onChange={handleChange1}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selectedDiet) => selectedDiet.join(", ")}
            MenuProps={MenuProps}
          >
            {restrictions.filter((restriction) => restriction.type == "diet").map((restriction) => (
              <MenuItem key={restriction.name} value={restriction.name}>
                <Checkbox
                  checked={selectedDiet.indexOf(restriction.name) > -1}
                />
                <ListItemText primary={restriction.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
       
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Allergies</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedAllergy}
            onChange={handleChange2}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selectedAllergy) => selectedAllergy.join(", ")}
            MenuProps={MenuProps}
          >
            {restrictions.filter((restriction) => restriction.type == "allergy").map((restriction) => (
              <MenuItem key={restriction.name} value={restriction.name}>
                <Checkbox
                  checked={selectedAllergy.indexOf(restriction.name) > -1}
                />
                <ListItemText primary={restriction.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </> */}
      {restaurants
        .filter((restaurant) => checker(restaurant.restriction_name, selected))
        .map((rest, index) => {
          console.log("selected array in map: ", selected);
          return <ResCard key={index} rest={rest} showdescription={false} />;
        })}
    </Box>
  );
}
