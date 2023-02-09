import "./Aboutus.css";
import groupPhoto from "../../img/groupPhoto.jpeg"
import Christian from "../../img/Christian.png"
import Courtney from "../../img/Courtney.jpeg"
import Yasmin from "../../img/Yasmin.jpeg"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Aboutus() {
  return (
    <>
      {/* <Stack direction="row" spacing={2} sx={{
        height: '200px', width: '200px' 
      }}> 
        <Avatar alt="Christian Bryan" src={Christian} />
        <Avatar alt="Yasmin Senior" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Courtney Fenderson" src="/static/images/avatar/3.jpg" />
      </Stack> */}
      <div className="aboutUsPhotos">
        <div className="imageCard">
          <img src={Christian} alt="Christian photo" className="christianPhoto"></img>
          <h1 className="ourNames"> Christian Bryan </h1>
        </div>
        <div className="imageCard">
          <img src={Yasmin}  alt="Yasmin photo" className="yasminPhoto"></img>
          <h1 className="ourNames"> Yasmin Senior </h1>
        </div>
        <div className="imageCard">
          <img src={Courtney}  alt="Courtney photo" className="courtneyPhoto"></img>
          <h1 className="ourNames"> Courtney Fenderson </h1>
        </div>
      </div>
      <h1 className="aboutUsLabel"> About Us </h1>
      <p className="aboutUsParagraph"> Hello and welcome to our Salesforce x Codepath Capstone Project! 
        We are team CYC and our members are Christian Bryan, Yasmin Senior, and Courtney Fenderson. 
        Team CYC is apart of the first cohort of Futureforce Tech Launchpad Interns at Salesforce Tower in San Francisco. 
        Christian attends the University of Southern California and is majoring in Computer Science and Business Administration. 
        Yasmin attends Howard University and is majoring in Computer Science. Courtney attends Washington University and is also majoring in Computer Science. 
        We truly enjoyed having the opportunity to  learn and implement the PERN (Postgresql, Express.js, React, and Node.js) stack to create Health Hero. 
        This project gave us the opportunity to expand our knowledge and find our tech niche as Christian and Yasmin focused backend and Courtney foucused on the frontend of the project. 
        This project gave us the opportunity to take a dive  into real world programing and we are super excited to pursue fullstack further!</p>
    </>
  )
}
