import React, { useState } from "react";
import SearchBar from "./UserComponents/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router";

// Your other components
import ProductDetailsFilling from "./UserComponents/ProductDetailsFilling";
import ProductWithSlider from "./UserComponents/ImageSlider"; // Use this instead of ImageSlider
import RatingLogo from "./UserComponents/RatingLogo";
import ProductDetails from "./UserComponents/ProductDetails";
import Footer from "./UserComponents/Footer";

export default function SetProductDetails() {
  const [refresh, setRefresh] = useState(false);
  const updateCart = () => setRefresh(!refresh);

  const location = useLocation();
  const product = location.state?.product;

  // If product is a JSON string, parse it, else assume object
  const productObj =
    typeof product === "string" ? JSON.parse(product) : product;

  const productid = productObj?.id;
  const categoryid = productObj?.categoryid;
  const subcategoryid = productObj?.subcategoryid;

  console.log("Product Props:", productObj);
  console.log("Product ID:", productid);

  const matches = useMediaQuery("(max-width:720px)");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          letterSpacing: "2px",
          color: "black",
          background: "azure",
          fontWeight: 600,
          fontStyle: "italic",
        }}
      >
        <marquee direction="left">FREE SHIPPING ON ORDERS OVER ₹990 </marquee>
      </div>
      <SearchBar />

      {matches ? (
        <div
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "column",
            marginLeft: 35,
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <ProductWithSlider productId={productid} />
          </div>

          <div style={{ paddingLeft: 2, marginTop: 15, width: "100%" }}>
            <ProductDetailsFilling
              updateCart={updateCart}
              productInfo={productObj}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <ProductDetails />
          </div>
          <div style={{ marginTop: 20 }}>
            <RatingLogo />
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginTop: 25, display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
                marginRight: 15,
                marginLeft: 15,
              }}
            >
              <ProductWithSlider productId={productid} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
                marginTop: 25,
                marginLeft: 25,
              }}
            >
              <ProductDetailsFilling
                updateCart={updateCart}
                productInfo={productObj}
              />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <ProductDetails />
          </div>
          <div style={{ marginTop: 20 }}>
            <RatingLogo />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
