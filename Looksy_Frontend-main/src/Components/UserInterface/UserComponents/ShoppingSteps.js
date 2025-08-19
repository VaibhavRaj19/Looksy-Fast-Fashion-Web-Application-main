import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";

export default function ShoppingSteps(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        background: "#ecf0f1",
        paddingTop: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          width: "60%",
          background: "#fff",
          boxShadow: "rgb(0 0 0 / 20%) 0px 1px 5px 0px",
          padding: 10,
        }}
      >
        <span
          style={{
            border: "2px solid #fff",
            width: 70,
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: "#000",
              background: "#fff",
              padding: 6,
              border: "2px solid #51CBCC",
              borderRadius: 45,
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <ShoppingCartIcon fontSize="medium" />
          </span>
          <span
            style={{ marginTop: 4, fontFamily: "sans-serif", fontWeight: 550 }}
          >
            {" "}
            My Cart
          </span>
        </span>

        <span
          style={{
            border: "2px solid #fff",
            width: 70,
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "#fff",
              padding: 6,
              border: "2px solid #51CBCC",
              borderRadius: 45,
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <HomeIcon fontSize="medium" />
          </span>
          <span
            style={{ marginTop: 4, fontFamily: "sans-serif", fontWeight: 550 }}
          >
            {" "}
            Address
          </span>
        </span>

        <span
          style={{
            border: "2px solid #fff",
            width: 70,
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "#fff",
              padding: 6,
              border: "2px solid #51CBCC",
              borderRadius: 45,
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <PaymentIcon fontSize="medium" />
          </span>
          <span
            style={{ marginTop: 4, fontFamily: "sans-serif", fontWeight: 550 }}
          >
            {" "}
            Payment
          </span>
        </span>
      </div>
    </div>
  );
}
