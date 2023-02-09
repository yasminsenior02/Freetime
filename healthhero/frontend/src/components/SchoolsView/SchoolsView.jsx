import * as React from "react";
import "../SchoolsView/SchoolsView.css";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, Link, useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { Navigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const options = [
  "University of South California",
  "Howard",
  "Washington University in St Louis",
];

const handleOnSchoolClick = async (schoolId) => {
  try {
    console.log(schoolId);
    const res = await apiClient.addSchoolToUser(schoolId);
  } catch (err) {
    console.log(err);
    const message = err?.response?.data?.error?.message;
    setErrors((e) => ({
      ...e,
      form: message ? String(message) : String(err),
    }));
  }
};

export default function SchoolsView() {
  const [schools, setSchools] = useState([]);
  const [filBoxVal, setFilBoxVal] = useState("");

  const handleFilChange = (ev, value) => {
    setFilBoxVal(ev.target.value); //mui is calling

    console.log(value);
  };

  // const [searchText, setSearchText] = useState("");
  // const handleOnTextChange = (event) => {
  //   setSearchText(event.target.value);
  // };
  // //console.log(products);
  // var searching = options.filter((element) => {
  //   return element.name.toLowerCase().includes(searchText.toLowerCase());
  // });
  //build more on school data.

  useEffect(() => {
    async function getSchools() {
      const res = await apiClient.listSchools();
      setSchools(res.data.schools);
      console.log("school list", res.data.schools);
    }
    getSchools();
  }, []);

  const fil = (school) => {
    const { name } = school; //decons
    return name.toLowerCase().includes(filBoxVal.toLowerCase());
  };

  //applying to every el in arr.
  return (
    <div className="viewS">
      <br/>
      <h1>Pick Your School</h1>
      <div className="marg">
        <span>
          {/* <label id="selS">Select your school: </label> */}
          <div className="flexy">
            <Autocomplete
              onInputChange={handleFilChange}
              id="custom-input-demo"
              options={options}
              renderInput={(params) => (
                <Box
                  component="form"
                  sx={{"& > :not(style)": { m: 1, width: "50ch",},  maxwidth: "100%" }} 
                  noValidate
                  autoComplete="off"
                >
                  {/* backgroundColor: 'rgba(179, 207, 153, 1)' */}
                  <TextField
                    id="Filled success"
                    label="Search"
                    variant="filled"
                    type="text"
                    color="success"
                    
                    {...params.inputProps}
                  />
                </Box>
              )}
            />
          </div>
        </span>
      </div>

      <div className="">
        {schools.filter(fil).map((school, i) => {
          //rendering schools

          return (
            <a href="/diet" key={i}>
              <button
                className="schoolButton"
                onClick={() => handleOnSchoolClick(school.id)}
              >
                <div className="schoolHome" id="yas">
                  <img src={school.image} alt={school.name} />
                </div>
              </button>
            </a>
          );
        })}
        <div>
          <button className="liBrB" id="ma">
            Load more schools
          </button>
        </div>
      </div>
    </div>
  );
}
