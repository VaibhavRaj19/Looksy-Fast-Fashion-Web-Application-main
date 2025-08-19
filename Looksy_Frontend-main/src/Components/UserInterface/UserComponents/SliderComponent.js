import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SliderComponent(props) {
  const mySlider = useRef(null);
  const matches = useMediaQuery("(max-width:1400px)");
  const imagesToRender = props.images || [];

  const setImageInSlider = () => {
    return imagesToRender.map((item, index) => (
      <div key={index}>
        <img
          src={item}
          alt={`Slide ${index}`}
          style={{
            width: "100%",
            height: "100%",
            // objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </div>
    ));
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {imagesToRender.length > 0 ? (
        <>
          {!matches && <div></div>}

          <Slider {...props.bannersettings} ref={mySlider}>
            {setImageInSlider()}
          </Slider>

          {!matches && <div></div>}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: 20 }}>
          No banners to display
        </div>
      )}
    </div>
  );
}
