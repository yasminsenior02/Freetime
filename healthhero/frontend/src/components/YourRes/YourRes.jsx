import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";

import ResCard from "../ResResults/ResCard";
import "./YourRes.css";
const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  "&:hover": {
    backgroundColor: brown[700],
  },
  alignItems: "center",
}));
export default function YourRes({ res }) {
  return (
    <div>
      <h1>View Your Res here</h1>
      {/* this shud be a duplicate of individual res results but has edit-->back to
      form */}
      {/* <ResCard key={res.id} restaurant={res} des={res.description} /> */}
      {/* <ResCard />  maybe by id or sum */}
      <div className="RestCardProf">
        <div className="media">
          {res.image ? (
            <img src={res.image} alt="product cover" />
          ) : //   <img src={codepath} alt="product cover" /> put our own placeholder img here

          null}
        </div>
        {/* should be able to change view by using ids */}
        <div className="res-info">
          <div className="info">
            <p className="res-name">{res}</p>
            <p className="res-loc">{res.location}</p>
            <p className="res-des">{res.description}</p>
          </div>
        </div>
      </div>
      <ColorButton variant="contained">
        <a href="/restForm" id="link">
          {/*slash some edit by id type link? */}
          Edit listing
        </a>
      </ColorButton>
    </div>
  );
}
