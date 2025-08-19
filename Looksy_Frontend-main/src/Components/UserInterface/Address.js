import React from "react";
import { Button, Grid } from "@mui/material";
import AddAddress from "../UserInterface/AddAddress";
import CouponAndPriceDetail from "./UserComponents/CouponAndPriceDetail";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PaymentNavBar from "./UserComponents/PaymentNavBar";
import ShoppingSteps from "./UserComponents/ShoppingSteps";
import QualityAssuredLogo from "./UserComponents/QualityAssuredLogo";
import PaymentLogo from "./UserComponents/PaymentLogo";
import { useSelector } from "react-redux";

export default function Address(props) {
  var theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  var cart = useSelector((state) => state.cart);
  var values = Object.values(cart);
  var user = useSelector((state) => state.user);
  var userData = Object.values(user)[0];

  return (
    <div style={{ background: "#ecf0f1" }}>
      <PaymentNavBar />
      <ShoppingSteps />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "95%",
            background: "#fff",
            marginTop: 40,
            boxShadow: "rgb(0 0 0 / 20%) 0px 1px 5px 0px",
            padding: 10,
          }}
        >
          <Grid container>
            {matches ? (
              <Grid item xs={12}>
                <AddAddress userData={userData} />
              </Grid>
            ) : (
              <Grid item xs={6}>
                <AddAddress userData={userData} />
              </Grid>
            )}

            {matches ? (
              <Grid item xs={12}>
                <CouponAndPriceDetail
                  value={values}
                  page={"Address"}
                  userData={userData}
                />
              </Grid>
            ) : (
              <Grid item xs={6}>
                <CouponAndPriceDetail
                  value={values}
                  page={"Address"}
                  userData={userData}
                />
              </Grid>
            )}
          </Grid>
        </div>
      </div>

      <div style={{ marginTop: 60 }}>
        <QualityAssuredLogo />
      </div>
      <div style={{ marginTop: 60 }}>
        <PaymentLogo />
      </div>
    </div>
  );
}
