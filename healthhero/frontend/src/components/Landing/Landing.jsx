import "../Landing/Landing.css";

import * as React from "react";
import { Box } from "@mui/material";
import Slick from "../Slick/Slick";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { brown } from "@mui/material/colors";
// import USC from "/Users/cfenderson/Desktop/CPLabs/site-capstone/healthhero/frontend/src/img/LicenseHeader229UofSouthernCal_2SportStyleUSC_132524476454863670.webp";
import Hero from "../HeroBar/Hero";

import { Container } from "@mui/system";

import { useAuthContext } from "../../../AuthContext/auth";
import Aboutus from "../AboutUs/Aboutus";
// const useStyles = makeStyles(
//   //adding for MUI res
//   theme({
//     textExample: {
//       fontSize: "4rem",
//       texAlign: "center",
//     },
//   })
// );

const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  "&:hover": {
    backgroundColor: brown[700],
  },
  alignItems: "center",
}));

<>
  <link
    rel="stylesheet"
    type="text/css"
    charset="UTF-8"
    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
  />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
  />
</>;
export default function Landing() {
  const { user, setUser } = useAuthContext();
  // function TestBox() {
  //   const styles = {
  //     width: "50vw",
  //     height: "50vh",
  //     backgroundColor: "purple",
  //     sm: { backgroundColor: "pink" },
  //   };
  //   return <Box sx={styles}></Box>;
  // }
  return (
    <>
      <Container
        className="landingPage"
        sx={{
          flexGrow: 1,
          background: " #fffaec",
          alignItems: "stretch",
          display: "flex",
          flexDirection: "column",
        }} //2 brackets for its object.. setting the container
        maxWidth={false}
      >
        {/* //{" "}
      <div className="landingPage">
        {" "}
        commenting out to attemmpt to use container */}
        {/* <div>
        <img src="background: url(leaves.png);" alt="" />
      </div> */}

        <Hero></Hero>
        <h1 className="findYourSchool"> Find Your School! </h1>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={8}
          // will work if al stack
        >
          <Slick />
          <ColorButton variant="contained">
            {user ? (
              <a href="/schools" id="link">
                See All Schools
              </a>
            ) : (
              <a href="/login" id="link">
                {" "}
                Please Login
              </a>
            )}
          </ColorButton>
        </Stack>
        {/* //{" "}
      </div> */}
      </Container>
    </>
  );
}
