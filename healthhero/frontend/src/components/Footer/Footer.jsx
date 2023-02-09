import * as React from "react";
import "../Footer/Footer.css";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const links = {
  //   Categories: ["All Categories", "Clothing", "Food", "Accessories", "Tech"],
  //   Company: ["About Us", "Find a Store", "Terms", "Sitemap", "Careers"],
  //   Support: [
  //     "Contact Us",
  //     "Money Refund",
  //     "Order Status",
  //     "Shipping Info",
  //     "Open Dispute",
  //   ],

  //   Account: ["Login", "Register", "Account Setting", "My Orders"],
  Links: ["Contact Us", "About Us"],
};
const LinkColumn = ({ title, links }) => {
  return (
    <>
      <h4>{title}</h4>
      <a href="">Contact Us</a>
      <a href="">About Us</a>
    </>
  );
};
export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#976f60", flexGrow: "0" }}>
      {/* display: "flex" */}
      {/* "rgba(223,246,200,1)" */}
      <br></br>
      <Box>
        {" "}
        <a href="/contact">Contact Us</a>{" "}
      </Box>
      <Box>
        {" "}
        <a href="/aboutus">About Us</a>{" "}
      </Box>
      <Box className="madeByCyc"> Made By CYC ☁️ </Box>
      <br></br>
    </Box>
  );
}
