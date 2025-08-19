import React from "react";
import { Grid } from "@mui/material";

export default function ProductDetails(props) {
  return (
    <div>
      <div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 40,
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Product Details
        </div>
      </div>
      <Grid
        style={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
        }}
        container
        spacing={2}
      >
        <div style={{ padding: 25 }}>
          <Grid item xs={3}>
            <div
              style={{
                background: "#f5f5f5",
                width: 300,
                height: 300,
                padding: 25,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  lineHeight: "35px",
                  display: "flex",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Product Highlights
              </div>
              <div>
                <table>
                  <tbody>
                  <tr>
                    <th>Fabric:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;NS Crush Lycra</td>
                  </tr>
                  <tr>
                    <th>Collar Type:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Mock Collar</td>
                  </tr>
                  <tr>
                    <th>Pattern:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Solid</td>
                  </tr>
                  <tr>
                    <th>Fit:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Regular-fit</td>
                  </tr>
                  <tr>
                    <th>Pocket:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;2 Side Pockets</td>
                  </tr>
                  <tr>
                    <th>Purpose: </th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Moderate Winter</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Grid>
        </div>
        <div style={{ padding: 25 }}>
          <Grid item xs={3}>
            <div
              style={{
                background: "#f5f5f5",
                padding: 25,
                width: 300,
                height: 300,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  lineHeight: "35px",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                Product Description
              </div>
              <ul type="disc">
                <li>
                  95% Nylon, 5% Lycra - durable fabric & resists you from the
                  extreme cold winds
                </li>
                <li>
                  Side Pockets - you can actually use to warm your hands &
                  keeping the essentials
                </li>
                <li>
                  Interior Hem Drawcord - fully adjustable lower hem to prevent
                  from cold
                </li>
                <li>
                  Elasticated Cuffs - can be pulled-up to assist in keeping heat
                  from escaping
                </li>
              </ul>
            </div>
          </Grid>
        </div>
        <div style={{ padding: 25 }}>
          <Grid item xs={3}>
            <div
              style={{
                background: "#f5f5f5",
                padding: 25,
                width: 300,
                height: 300,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  lineHeight: "35px",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                Delivery & Return Policy
              </div>
              We provide free shipping on all orders. Pay online to avoid
              charges of ₹50/product applicable on COD orders. The return or
              exchange can be done within 15 days after delivery. Every delivery
              from Beyoung is processed under excellent condition and in the
              fastest time possible. For our beloved customer’s care, we give
              contactless delivery. Refer to FAQ for more information.
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
