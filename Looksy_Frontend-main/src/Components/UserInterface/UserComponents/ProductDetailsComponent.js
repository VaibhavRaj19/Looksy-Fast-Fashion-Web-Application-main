import React from "react";

import { useNavigate } from "react-router";

export default function ProductDetailsComponent(props) {
  const navigate = useNavigate();
  const handleProductDetails = (item) => {
    navigate("/setproductdetails", {
      state: { product: JSON.stringify(item) },
    });
  };

  return props.data.map((item) => {
    return (
      <div
        onClick={() => handleProductDetails(item)}
        style={{
          padding: 4,
          margin: 3,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ width: 330, height: 330, cursor: "pointer" }}>
          <img src={`${item.icon}`} style={{ width: "95%", height: "95%" }} alt="" />
          <div
            style={{
              position: "absolute",
              top: "70.3%",
              color: "#FFF",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              width: "93%",
              zIndex: 1,
              background: "#0000002e",
              height: "13%",
            }}
          >
            {item.description}
          </div>
        </div>

        <div
          style={{
            color: "black",
            marginTop: "-7px",
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: 18,
          }}
        >
          {item.productname}
        </div>

        <div
          style={{
            color: "black",
            marginTop: 3,
            fontWeight: 600,
            letterSpacing: 1,
            fontSize: 12,
          }}
        >
          {item.offerprice > 0 ? (
            <>
              <span style={{ color: "#000", fontSize: 18 }}>
                &#8377;{item.offerprice}
              </span>
              <span
                style={{
                  marginLeft: 5,
                  textDecoration: "line-Through",
                  color: "red",
                }}
              >
                &#8377;{item.price}
              </span>
              <span style={{ marginLeft: 10, color: "green", fontSize: 15 }}>
                Save &#8377;{item.price - item.offerprice}
              </span>
            </>
          ) : (
            <>
              <span>&#8377;{item.price}</span>
              <span>Fixed Price</span>
            </>
          )}
        </div>
      </div>
    );
  });
}
