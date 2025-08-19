import React, { useState, useEffect } from "react";
// Service
import { getData, postData } from "../Services/NodeServices";
// Main Bar
import MainBar from "./UserComponents/MainBar";
// Search Bar
import SearchBar from "./UserComponents/SearchBar";
// Carousel
import SliderComponent from "./UserComponents/SliderComponent";
// Small Component Card
import SmallCardComponent from "./UserComponents/SmallCardComponent";
// Three Card Component
import ThreeCardComponent from "./UserComponents/ThreeCardComponent";
// Two Card Component
import TwoCardComponent from "./UserComponents/TwoCardComponent";
// One Component

// Footer
import Footer from "./UserComponents/Footer";

// Carousel Manupilation.............
var bannersettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 900,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

export default function Home(props) {
  // Carousel Manupialtion............
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    const result = await getData("api/banners/all"); // relative path only
    console.log("Fetch Result:", result);

    if (result?.status) {
      const bannerData = result.data;
      if (Array.isArray(bannerData) && bannerData.length > 0) {
        setBanners(bannerData);
      } else {
        console.warn("No banner data found");
      }
    } else {
      console.error("Failed to load banners", result);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  console.log("Banners:", banners);

  //....................................

  // Fetch Product By Sale Status.......
  const [productBySaleStatus, setProductBySaleStatus] = useState([]);
  const [productBySalePopular, setProductByPopular] = useState([]);
  const [twoPriorityImages1, setTwoPriorityImages1] = useState([]);
  const [twoPriorityImages2, setTwoPriorityImages2] = useState([]);
  const [twoPriorityImages3, setTwoPriorityImages3] = useState([]);

  const fetchProducts = async (status) => {
    var body = { salestatus: status };
    var result = await postData("api/products/by_salestatus", body);
    setProductBySaleStatus(result.data);
  };
  const fetchPopularProducts = async (status) => {
    var body = { salestatus: status };
    var result = await postData("api/products/by_salestatus", body);
    setProductByPopular(result.data);
  };

  const fetchTwoPriorityForSubcategory1 = async (priority) => {
    var result = await getData("subcategory/by-priority/2");
    console.log("Priority 2 data:", result); // Add this line
    setTwoPriorityImages1(result);
  };
  const fetchTwoPriorityForSubcategory2 = async (priority) => {
    var result = await getData(`subcategory/by-priority/1`);
    setTwoPriorityImages2(result);
    console.log("Priority 1 data:", result); // Add this line
  };
  const fetchTwoPriorityForSubcategory3 = async (priority) => {
    var result = await getData(`subcategory/by-priority/3`);
    setTwoPriorityImages3(result);
    console.log("Priority 1 data:", result); // Add this line
  };
  useEffect(function () {
    fetchProducts("Trending");
    fetchPopularProducts("Popular");
    fetchTwoPriorityForSubcategory3(3);
    fetchTwoPriorityForSubcategory1(2);
    fetchTwoPriorityForSubcategory2(1);
  }, []);
  //....................................

  // Heading of Small Components........
  const Heading = (props) => {
    return (
      <div
        style={{
          width: "100wh",
          textAlign: "center",
          fontSize: 32,
          letterSpacing: 1,
          fontWeight: "bolder",
          fontFamily: "cursive",
          margin: 5,
          color: props.color,
        }}
      >
        {props.heading}
      </div>
    );
  };
  //.................................... 

  return (
    <div>
      {/* <div style={{position:'fixed',zIndex:3,width:'100%',marginTop:'-120px'}}> */}

      <SearchBar search={false} />

      <MainBar />
      {/* </div> */}

      {/* <div style={{marginTop:120}}> */}
      <SliderComponent images={banners} bannersettings={bannersettings} />
      {/* </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          marginTop: 30,
        }}
      >
        <Heading heading="TRENDING" color="#343434" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginRight: 40,
            marginLeft: 40,
            width: "90%",
            padding: 2,
            flexWrap: "wrap",
          }}
        >
          <SmallCardComponent data={productBySaleStatus} url={"productlist"} />
        </div>
        <Heading heading="POPULAR" color="#343434" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "0px 40px 40px 40px",
            width: "90%",
            padding: 2,
            flexWrap: "wrap",
          }}
        >
          <ThreeCardComponent data={productBySalePopular} url={"productlist"} />
        </div>
        <Heading heading="SHOP FOR MEN" color="#343434" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "0px 40px 40px 40px",
            width: "90%",
            padding: 2,
            flexWrap: "wrap",
          }}
        >
          <TwoCardComponent data={twoPriorityImages1} url={"productlist"} />
        </div>
        <Heading heading="SHOP FOR WOMEN" color="#343434" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "0px 40px 40px 40px",
            width: "90%",
            padding: 2,
            flexWrap: "wrap",
          }}
        >
          <TwoCardComponent data={twoPriorityImages2} url={"productlist"} />
        </div>

        <Heading heading="SHOP FOR Kids" color="#343434" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "0px 40px 40px 40px",
            width: "90%",
            padding: 2,
            flexWrap: "wrap",
          }}
        >
          <TwoCardComponent data={twoPriorityImages3} url={"productlist"} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "0px 40px 40px 40px",
            width: "90%",
            padding: 2,
            flexWrap: "wrap",
          }}
        ></div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
