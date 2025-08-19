import React from "react";
import { Grid } from "@mui/material";
import milion from "../../../Assets/milion.jpg";
import india from "../../../Assets/india.jpg";
import safe from "../../../Assets/safe.jpg";
import returnpolicy from "../../../Assets/returnpolicy.jpg";

export default function RatingLogo(props) {
  return (
    <div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          lineHeight: "35px",
          marginBottom: 40,
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Rating & Reviews
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
                width: 200,
                height: 150,
                padding: 25,
                textAlign: "center",
                borderRadius: "5px",
                border: "1px solid #a7a7a7",
              }}
            >
              <img
                src={milion}
                style={{ width: "35%", height: "auto", marginTop: 17 }}
                alt=""
              />
              <br />
              <div
                style={{
                  fontSize: 17,
                  padding: "10px 0 15px",
                  fontWeight: 700,
                }}
              >
                Happy Customers
              </div>
            </div>
          </Grid>
        </div>
        <div style={{ padding: 25 }}>
          <Grid item xs={3}>
            <div
              style={{
                width: 200,
                height: 150,
                padding: 25,
                textAlign: "center",
                borderRadius: "5px",
                border: "1px solid #a7a7a7",
              }}
            >
              <img
                src={india}
                style={{ width: "35%", height: "auto", marginTop: 17 }}
                alt=""
              />
              <br />
              <div
                style={{
                  fontSize: 17,
                  padding: "10px 0 15px",
                  fontWeight: 700,
                }}
              >
                Made in India
              </div>
            </div>
          </Grid>
        </div>
        <div style={{ padding: 25 }}>
          <Grid item xs={3}>
            <div
              style={{
                width: 200,
                height: 150,
                padding: 25,
                textAlign: "center",
                borderRadius: "5px",
                border: "1px solid #a7a7a7",
              }}
            >
              <img
                src={safe}
                style={{ width: "35%", height: "auto", marginTop: 17 }}
                alt=""
              />
              <br />
              <div
                style={{
                  fontSize: 17,
                  padding: "10px 0 15px",
                  fontWeight: 700,
                }}
              >
                Packed with Safety
              </div>
            </div>
          </Grid>
        </div>

        <div style={{ padding: 25 }}>
          <Grid item xs={3}>
            <div
              style={{
                width: 200,
                height: 150,
                padding: 25,
                textAlign: "center",
                borderRadius: "5px",
                border: "1px solid #a7a7a7",
              }}
            >
              <img
                src={returnpolicy}
                style={{ width: "35%", height: "auto", marginTop: 17 }}
                alt=""
              />
              <br />
              <div
                style={{
                  fontSize: 17,
                  padding: "10px 0 15px",
                  fontWeight: 700,
                }}
              >
                Easy Replacement
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
