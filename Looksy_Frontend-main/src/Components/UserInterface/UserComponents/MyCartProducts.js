import React, { useState } from "react";
import { Grid } from "@mui/material";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";
import emptycart from "../../../Assets/emptycart.gif";

export default function MyCartProducts(props) {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleQtyChange = (value, product) => {
    console.log("MyCartProducts: handleQtyChange - new value:", value);
    const updatedProduct = { ...product, qty: value };
    console.log(
      "MyCartProducts: handleQtyChange - updatedProduct:",
      updatedProduct
    );

    if (value === 0) {
      dispatch({
        type: "DELETE_CART",
        payload: [updatedProduct.id, updatedProduct],
      });
    } else {
      dispatch({
        type: "ADD_CART",
        payload: [updatedProduct.id, updatedProduct],
      });
    }

    setRefresh(!refresh);
    props.updateCart();
  };

  return (
    <div>
      {props.value.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img
              src={emptycart}
              style={{ width: "100%", height: "100%" }}
              alt="empty cart"
            />
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: 30,
              fontFamily: "cursive",
              marginTop: "10%",
            }}
          >
            Your shopping cart is empty.
          </div>
        </div>
      ) : (
        props.value.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              background: "#fff",
              padding: 20,
            }}
          >
            <Grid
              style={{ marginLeft: 22, marginTop: 4 }}
              container
              spacing={2}
            >
              <Grid item xs={4}>
                <div>
                  <img src={`${item.icon}`} style={{ width: 130 }} alt="" />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div style={{ lineHeight: 2, paddingLeft: 10 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {item.productname}
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        fontSize: 16,
                        fontFamily: "sans-serif",
                        fontWeight: 600,
                        textDecoration: "line-through",
                        color: "red",
                      }}
                    >
                      ₹{item.price}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontFamily: "sans-serif",
                        fontWeight: 600,
                        color: "black",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;₹{item.offerprice}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      color: "green",
                    }}
                  >
                    Saving - ₹{item.price - item.offerprice}
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      color: "#746e6e",
                    }}
                  >
                    SIZE:
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    &nbsp;&nbsp;{item.size}
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {/* <span style={{ fontSize: 14, fontFamily: 'sans-serif', fontWeight: 600, color: '#746e6e' }}>Qty:</span>
                  <span style={{ fontSize: 14, fontFamily: 'sans-serif', fontWeight: 400 }}>&nbsp;&nbsp;{item.qty}</span> */}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      color: "#746e6e",
                    }}
                  >
                    Color:
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    &nbsp;&nbsp;{item.color.color}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <PlusMinusComponent
                        value={item.qty}
                        onChange={(value) => handleQtyChange(value, item)}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        ))
      )}
    </div>
  );
}
