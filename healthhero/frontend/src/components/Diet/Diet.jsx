import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { brown } from "@mui/material/colors";
import DGroup from "../DGroups/DGroups";
import Autocomplete from "@mui/material/Autocomplete";
import "../Diet/Diet.css";
import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "../DGroups/DGroups.css";

const dietaryG = ["Eggs", "Dairy", "Peanuts"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };
<script
  src="https://kit.fontawesome.com/cf9f7f67f7.js"
  crossorigin="anonymous"
></script>;

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  //prob get slider dots out of the way
};

const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  "&:hover": {
    backgroundColor: brown[700],
  },
  alignItems: "center",
  alignContent: "center",
  marginTop: "20px",
}));
export default function Diet() {
  const [sliderRef, setSliderRef] = useState(null);
  const [diets, setDiets] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [errors, setErrors] = useState({});
  const [userRestrictions, setUserRestrictions] = useState({
    restrictions: [],
  });
  const [filBoxValD, setFilBoxValD] = useState("");
  const [filBoxValA, setFilBoxValA] = useState(""); //filtering for all restricts (as ofrn)
  //toggle switch for which searching, can include diff options to search too
  //make search so that checkboc can still be there --> include checked

  const filD = (restrictions) => {
    const { name } = restrictions; //decons
    return name.toLowerCase().includes(filBoxValD.toLowerCase());
  };

  const handleFilChangeD = (ev, value) => {
    if (ev.target.checked) {
      console.log("✅ Checkbox is checked");
    } else {
      setFilBoxValD(ev.target.value); //mui is calling
    }
    console.log(value);
  };

  useEffect(() => {
    console.log("user Restrictions", userRestrictions);
  }, [userRestrictions]);

  useEffect(() => {
    async function getDiets() {
      const res = await apiClient.listDiets();
      console.log("diets list", res);
      setDiets(res.data.diets); //this needs to change
    }
    getDiets();
  }, []);

  useEffect(() => {
    async function getAllergies() {
      const res = await apiClient.listAllergies();
      setAllergies(res.data.allergies); //this need to change
      console.log("allergies list", res.data.allergies);
    }
    getAllergies();
  }, []);

  const handleChange = (event) => {
    //this function should add to the userRestrictions array
    var newValue = event.target.checked;
    console.log("checkbox was changed to: ", newValue);
    if (newValue) {
      setUserRestrictions({
        ...userRestrictions,
        restrictions: [...userRestrictions.restrictions, event.target.name],
      });
    } else {
      setUserRestrictions({
        ...userRestrictions,
        restrictions: userRestrictions.restrictions.filter(
          (element) => element != event.target.name
        ),
      });
    }
  };

  const handleOnSubmit = async () => {
    //on submit add the restrictions to user_restrictions table
    console.log("in handle on submit");
    try {
      console.log(
        "user Restrictions in handle on submit",
        userRestrictions.restrictions
      );
      const res = await apiClient.postUserRestrictions(
        userRestrictions.restrictions
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    }
  };

  return (
    <div className="diet">
      <div className="topD">
        {/* <br /> */}
        <h3 id="restrictionLabels">Dietary Groups</h3>
      </div>
      {/* 
      <br /> */}
      {/* {diets.map(({ id, name, type, i }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={userRestrictions.restrictions[name]}
                onChange={handleChange}
                name={name}
                key={i}
              />
            }
            label={name}
          />
        );
      })} */}

      <div className="contentD">
        <div className="leftbtton">
          <button onClick={sliderRef?.slickPrev} className="liBrB butRight">
            {"<"}
          </button>
        </div>

        <div className="sliderD">
          <Slider ref={setSliderRef} {...settings}>
            {diets.map(({ id, name, type, i }) => {
              return (
                <FormControlLabel
                  sx={{minWidth: "max-content", display: "flex", flexDirection: "column"}}
                  control={
                    <Checkbox
                      checked={userRestrictions.restrictions[name]}
                      onChange={handleChange}
                      name={name}
                      key={i}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 60 } }}
                    />
                  }
                  label={name}
                />
              );
            })}
          </Slider>
        </div>

        <div className="rightbtton">
          <button onClick={sliderRef?.slickNext} className="liBrB butLeft">
            {">"}
          </button>
        </div>
      </div>
      {/* <br /> */}
      <div style={{display: "flex",  flexWrap: "wrap",  alignContent: "flex-end", justifyContent : "space-between"}}>
        <h3 id="restrictionLabels">Allergies</h3>
      {/* allergies */}
      <div id="flexri">
        <Autocomplete
          onInputChange={handleFilChangeD}
          sx={{
            display: "inline-block",
            paddingLeft: "20%",
            float: "right",
            "& input": {
              // float: "right",
              "@media only screen and (max-width: 600px)": {
                width: 300,
              },
            },
          }}
          id="custom-input-demo"
          options={dietaryG}
          renderInput={(params) => (
            <Box
              component="form"
              // sx={{
              //   "& > :not(style)": { m: 1, width: "55ch" },
              //   maxwidth: "100%",
              // }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="Filled success"
                label="Search for Allergies"
                variant="filled"
                type="text"
                color="success"
                {...params.inputProps}
              />
            </Box>
          )}
        />
      </div>
      </div>
      <div id="allergyBoxes">
        {allergies.filter(filD).map(({ id, name, type }) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={userRestrictions.restrictions[name]}
                  onChange={handleChange}
                  name={name}
                />
              }
              label={name}
            />
          );
        })}
      </div>
      <div>
        {/* flex id here^ */}
        <ColorButton variant="contained" onClick={handleOnSubmit} sx={{mb : 2}}> 
          <a href="/resResults" id="link">
            Submit Options
          </a>
        </ColorButton>
    
      </div>
    </div>
  );
}
