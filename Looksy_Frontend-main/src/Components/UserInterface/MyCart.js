import React, { useMemo, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import MyCartProducts from "./UserComponents/MyCartProducts";
import CouponAndPriceDetail from "./UserComponents/CouponAndPriceDetail";
import PaymentNavBar from "./UserComponents/PaymentNavBar";
import ShoppingSteps from "./UserComponents/ShoppingSteps";
import QualityAssuredLogo from "./UserComponents/QualityAssuredLogo";
import PaymentLogo from "./UserComponents/PaymentLogo";

export default function MyCart(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const cart = useSelector((state) => state.cart);
  const values = useMemo(() => Object.values(cart), [cart]);
  console.log('MyCart: Cart state from Redux:', cart);



  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ background: "#ecf0f1" }}>
      <PaymentNavBar />
      <ShoppingSteps />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: "95%",
            background: "#fff",
            marginTop: 40,
            boxShadow: "rgb(0 0 0 / 20%) 0px 1px 5px 0px",
            padding: 10,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={matches ? 12 : 6}>
              <MyCartProducts value={values} updateCart={handleRefresh} />
            </Grid>
            <Grid item xs={matches ? 12 : 6}>
              <CouponAndPriceDetail value={values} page={"Cart"} />
            </Grid>
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
