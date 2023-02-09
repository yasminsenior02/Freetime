import * as React from "react";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "../Slick/Slick.css";
import { USC, HU, washu, VT, UTEP, HSSU } from "../../constants";
// import { HSSU } from "../../constants";
import USF from "../../img/USF.png";
// ("hero-img").src = HSSU;

export default function Slick() {
  <script
    src="https://kit.fontawesome.com/cf9f7f67f7.js"
    crossorigin="anonymous"
  ></script>;
  const [sliderRef, setSliderRef] = useState(null);
  const [schools, setSchools] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,

    slidesToScroll: 1,
    arrows: false,
  };

  function cacheImages(array) {
    if (!cacheImages.list) {
      cacheImages.list = [];
    }
    var list = cacheImages.list;
    for (var i = 0; i < array.length; i++) {
      var img = new Image();
      img.onload = function () {
        var index = list.indexOf(this);
        if (index !== -1) {
          // remove image from the array once it's loaded
          // for memory consumption reasons
          list.splice(index, 1);
        }
      };
      list.push(img);
      img.src = array[i];
    }
  }

  // useEffect(() => {
  //   async function getSchools() {
  //     const res = await apiClient.listSchools();
  //     setSchools(res.data.school);
  //     console.log("school list", res.data.school);
  //   }
  //   getSchools();
  // }, []);

  // useEffect(() => {
  //   cacheImages([HSSU, USC, HU, washu, VT, USF, UTEP]);
  // }, []);

  return (
    <div className="content">
      <div className="leftbtton">
        <button onClick={sliderRef?.slickPrev} className="liBrB butRight">
          {"<"}
        </button>
      </div>

      <div className="slider">
        <Slider ref={setSliderRef} {...settings}>
          <div className="schoolHome" id="okur">
            {/* {schools.map((school, i) => {
          return (
            <div
              className="schoolButton"
              onClick={() => handleOnSchoolClick(school.id)}
              key={i}
            >
              <div id="schoolHome">
                <img src={school.image} alt={school.name} />
              </div>
            </div>
          );
        })}
          <div id="schoolHome"> */}

            <img
              src={USC}
              onLoad={() => {
                console.log("loaded");
              }}
              onError={(e) => {
                console.log("on error", e);
              }}
              alt="USC"
            />
          </div>
          <div className="schoolHome" id="okur">
            <img src={HU} alt="Howard" />
          </div>
          <div className="schoolHome" id="okur">
            <img src={washu} alt="WashU" />
          </div>
          <div className="schoolHome" id="okur">
            <img src={VT} alt="VT" />
            {/* <img src="/healthhero/frontend/src/img/vtt.png"></img> */}
          </div>
          <div className="schoolHome" id="okur">
            <img src={USF} alt="USF" />
          </div>
          <div className="schoolHome" id="okur">
            <img src={HSSU} alt="HSSU" />
          </div>

          <div className="schoolHome" id="okur">
            <img src={UTEP} alt="uni of Texas El Paso" />
          </div>
        </Slider>
      </div>

      <div className="rightbtton">
        <button onClick={sliderRef?.slickNext} className="liBrB butLeft">
          {">"}
        </button>
      </div>
    </div>
  );
}

// for more info: https://blog.logrocket.com/create-carousel-react-slick/
