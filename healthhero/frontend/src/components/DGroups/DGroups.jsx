// a slick file for the dietary groups
import * as React from "react";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "../DGroups/DGroups.css";

export default function DGroups() {
  <script
    src="https://kit.fontawesome.com/cf9f7f67f7.js"
    crossorigin="anonymous"
  ></script>;
  const [sliderRef, setSliderRef] = useState(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    //prob get slider dots out of the way
  };

  return (
    <div className="contentD">
      <div className="leftbtton">
        <button onClick={sliderRef?.slickPrev} className="liBrB butRight">
          {"<"}
        </button>
      </div>

      <div className="sliderD">
        <Slider ref={setSliderRef} {...settings}>
          {/* <div id="sliderD">
            <button>
              <h3>Vegan</h3>
            </button>
          </div>
          <div id="sliderD">
            <button>
              <h3>Halal</h3>
            </button>
          </div>
          <div id="sliderD">
            <button>
              <h3>Kosher</h3>
            </button>
          </div>
          <div id="sliderD">
            <button>
              <h3>Keto</h3>
            </button>
          </div>
          <div id="sliderD">
            <button>
              <h3>Kids Food</h3>
            </button>
          </div>
          <div id="sliderD">
            <button>
              <h3>Pescatarian</h3>
            </button>
          </div> */}
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
