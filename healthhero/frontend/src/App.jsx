import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { AuthContextProvider, useAuthContext } from "../AuthContext/auth";
import Register from "./components/Register/Register";
import Restform from "./components/Restform/Restform";
import Landing from "./components/Landing/Landing";
import apiClient from "../services/apiClient";
import Slick from "./components/Slick/Slick";
import SchoolsView from "./components/SchoolsView/SchoolsView";
import Commform from "./components/CommForm/Commform";
import Diet from "./components/Diet/Diet";
import Prof from "./components/Prof/Prof";
import SelComm from "./components/SelComm/SelComm";
import ViewRes from "./components/Restform/viewRest";
import MyComm from "./components/MyComm/MyComm";
import YourRes from "./components/YourRes/YourRes";
import ResResults from "./components/ResResults/ResResults";
// import { Text, View, StyleSheet } from "react-native";
import Aboutus from "./components/AboutUs/Aboutus";
// import InResults from "./components/ResResults/InResults";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";

import DetailedComm from "./components/SelComm/DetailedCom";
import ResDetail from "./components/ResResults/ResDetail";
import MapApp from "./components/Maps/MapApp";
// import ComGrid from "./components/SelComm/ComGrid";

function App() {
  const { user, setUser } = useAuthContext();
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   console.log("app is rendering")
  //   const fetchAuthUser = async () => {
  //     const { data, error } = await apiClient.fetchUserFromToken();
  //     if (data) setUser(data.user);
  //   };

  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     console.log("token: ", token);
  //     apiClient.setToken(token);
  //     fetchAuthUser();
  //   }
  // }, []);



  const autoLoggIn = async () => {
    if (!user) {
      const authMeData = await apiClient.fetchUserFromToken();
      const fetchedUser = authMeData.data?.user;
      console.log("fetched user: ", fetchedUser);
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        console.log("auth me error: ", authMeData.error);
      }
      console.log("User in app: ", user);
    }
  };

  useEffect(() => {
    autoLoggIn();
    // const token = localStorage.getItem("token");
    // if(!token){
    //   navigateTo("/login")
    // }
  }, []);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  const logoutuser = async () => {
    await apiClient.logoutUser();
    console.log("LOGOUT PRESSED");
    setUser(null);
  };
  const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "relative",
    left: "0",
    bottom: "0",
    height: "60px",

    // width: "100%",
  };

  return (
    <>
      <>
        {/* {console.log("value of loggedIn in app jsx" , loggedIn)} */}
        <Navbar logoutuser={logoutuser} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Landing />
              </>
            }
          />
          <Route
            path="/schools"
            element={
              <>
                <SchoolsView />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route path="/diet" element={<Diet />} />

          <Route
            path="/restForm"
            element={
              <>
                <Restform />
              </>
            }
          />
          <Route
            path="/communities"
            element={
              <SelComm />
              //       {/*header
              //   grid.. where you press image-> descripting and being able to add the community.(comm detail)
              // load more buttom gets pushed down}
              // ideal to only render selcom component
              //       {/* <SelComm />
              //       <ComGrid />
              //       <CommCard /> */}
            }
          />
          <Route
            path="/prof"
            element={
              <>
               {user ? <MyComm/> : <Login/>}
              </>
            }
          />
          <Route
            path="/commForm"
            element={
              <>
                {user ? <Commform /> :  <Login/>}
              </>
            }
          />
          <Route
            path="/viewrest"
            element={
              <>
                {user ?  <ViewRes/> : <Login/>} 
              </>
            }
          />
          <Route path="/resResults" element={user ? <ResResults /> : <Login/>} />
          {/* <Route
      path="/resResults/specific"
      // would matter on id / which restaurant
      element={
        <>
          <InResults />
        </>
      }
    /> */}
          <Route
            path="/commDescript/:id"
            element={
              <>
                <DetailedComm />
              </>
            }
          />
          <Route
            path="/commDescript/:id"
            element={
              <>
                <DetailedComm />
              </>
            }
          />
          <Route
            path="/resDescript/:id"
            element={
              <>
                <ResDetail />
              </>
            }
          />
          <Route
            path="/aboutus"
            element={
              <>
                <Aboutus />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Contact />
              </>
            }
          />
        </Routes>
      </>
      {/* <div>
        <div style={style}>
          <div>
            <a href="">Contact Us</a>
          </div>
        </div>
        hello
      </div> */}
      <Footer></Footer>

      {/* <View style={styles.container}>
        <View style={styles.content}> content goes here</View>
        <View style={styles.footer}>
          <Text>This footer will be pushed to the bottom</Text>
        </View>
      </View> */}
    </>
  );
}
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ecf0f1",
//   },
//   content: {
//     flex: 1,
//   },
//   footer: {
//     backgroundColor: "blue",
//     padding: 40,
//   },
// });
export default App;
