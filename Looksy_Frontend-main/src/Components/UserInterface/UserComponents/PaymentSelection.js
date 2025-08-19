import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { ServerURL } from "../../Services/NodeServices";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import paytm from "../../../Assets/paytm.png";
import razorpay from "../../../Assets/razorpay.png";
import debitcard from "../../../Assets/debitcard.png";
import upi from "../../../Assets/upi.png";
import wallet from "../../../Assets/wallet.png";
import netbanking2 from "../../../Assets/netbanking2.png";
import cod from "../../../Assets/cod.png";
import mobikwik from "../../../Assets/mobikwik.png";
import paytmcircle from "../../../Assets/paytmcircle.png";
import phonepecircle from "../../../Assets/phonepecircle.png";
import sbi from "../../../Assets/sbi.png";
import pnb from "../../../Assets/pnb.png";
import axis from "../../../Assets/axis.png";
import delivery from "../../../Assets/delivery.png";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function PaymentSelection(props) {
  const [showPaytm, setShowPaytm] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [showUpi, setShowUpi] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [showCod, setShowCod] = useState(false);

  const handlePaytm = () => {
    setShowPaytm(true);
    setShowCard(false);
    setShowUpi(false);
    setShowWallets(false);
    setShowNetBanking(false);
    setShowCod(false);
  };
  const handlCard = () => {
    setShowCard(true);
    setShowPaytm(false);
    setShowUpi(false);
    setShowWallets(false);
    setShowNetBanking(false);
    setShowCod(false);
  };
  const handleUpi = () => {
    setShowUpi(true);
    setShowCard(false);
    setShowPaytm(false);
    setShowWallets(false);
    setShowNetBanking(false);
    setShowCod(false);
  };
  const handleWallets = () => {
    setShowWallets(true);
    setShowUpi(false);
    setShowCard(false);
    setShowPaytm(false);
    setShowNetBanking(false);
    setShowCod(false);
  };

  const handleNetBanking = () => {
    setShowNetBanking(true);
    setShowWallets(false);
    setShowUpi(false);
    setShowCard(false);
    setShowPaytm(false);
    setShowCod(false);
  };

  const handleCod = () => {
    setShowCod(true);
    setShowNetBanking(false);
    setShowWallets(false);
    setShowUpi(false);
    setShowCard(false);
    setShowPaytm(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        background: "#fff",
        width: "100%",
        marginTop: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          border: "2px solid #ABABAB",
          margin: 20,
          width: "100%",
          padding: 10,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div
              onClick={handlePaytm}
              style={{
                marginBottom: 10,
                background: "#fff",
                textAlign: "center",
                fontSize: 16,
                padding: 10,
                borderRadius: 3,
                fontWeight: 700,
                cursor: "pointer",
                border: showPaytm ? "2px solid #51cccc" : "2px solid #ddd",
              }}
            >
              Pay using Paytm{" "}
              <img src={paytm} style={{ width: "18%", height: "auto" }} />
            </div>

            <div
              onClick={handlCard}
              style={{
                marginBottom: 10,
                background: "#fff",
                textAlign: "center",
                fontSize: 16,
                padding: 2,
                borderRadius: 3,
                fontWeight: 700,
                cursor: "pointer",
                border: showCard ? "2px solid #51cccc" : "2px solid #ddd",
              }}
            >
              <span>
                <img src={debitcard} style={{ width: "10%", height: "auto" }} />
              </span>{" "}
              <span> Debit/Credit Card</span>
              <div style={{ fontSize: 12, fontWeight: 350 }}>
                VISA,Master Card
              </div>
            </div>

            <div
              onClick={handleUpi}
              style={{
                marginBottom: 10,
                background: "#fff",
                textAlign: "center",
                fontSize: 16,
                padding: 2,
                borderRadius: 3,
                fontWeight: 700,
                cursor: "pointer",
                border: showUpi ? "2px solid #51cccc" : "2px solid #ddd",
              }}
            >
              <span>
                <img src={upi} style={{ width: "14%", height: "auto" }} />
              </span>{" "}
              <span> UPI</span>
              <div style={{ fontSize: 12, fontWeight: 350 }}>
                Google Pay,PhonePe,BHIM & More
              </div>
            </div>

            <div
              onClick={handleWallets}
              style={{
                marginBottom: 10,
                background: "#fff",
                textAlign: "center",
                fontSize: 16,
                padding: 2,
                fontWeight: 700,
                borderRadius: 3,
                cursor: "pointer",
                border: showWallets ? "2px solid #51cccc" : "2px solid #ddd",
              }}
            >
              <span>
                <img src={wallet} style={{ width: "8%", height: "auto" }} />
              </span>{" "}
              <span> Wallets</span>
              <div style={{ fontSize: 12, fontWeight: 350 }}>
                Paytm, PhonePe, Mobikwik, OlaMoney & More
              </div>
            </div>

            <div
              onClick={handleNetBanking}
              style={{
                marginBottom: 10,
                background: "#fff",
                textAlign: "center",
                fontSize: 16,
                padding: 2,
                fontWeight: 700,
                borderRadius: 3,
                cursor: "pointer",
                border: showNetBanking ? "2px solid #51cccc" : "2px solid #ddd",
              }}
            >
              <span>
                <img
                  src={netbanking2}
                  style={{ width: "10%", height: "auto" }}
                />
              </span>{" "}
              <span> Netbanking</span>
              <div style={{ fontSize: 12, fontWeight: 350 }}>
                All Indian Banks
              </div>
            </div>

            <div
              onClick={handleCod}
              style={{
                marginBottom: 10,
                background: "#fff",
                textAlign: "center",
                fontSize: 16,
                padding: 2,
                fontWeight: 700,
                borderRadius: 3,
                cursor: "pointer",
                border: showCod ? "2px solid #51cccc" : "2px solid #ddd",
              }}
            >
              <span>
                <img src={cod} style={{ width: "10%", height: "auto" }} />
              </span>{" "}
              <span> Cash on Delivery</span>
              <div style={{ fontSize: 12, fontWeight: 350 }}>
                Pay online to avoid cash handling charges(₹50 per product)
              </div>
            </div>
          </Grid>

          <Grid item xs={8}>
            {showPaytm ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #000",
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#fff",
                    padding: 15,
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  100% secured by{" "}
                  <img src={paytm} style={{ width: "20%", height: "auto" }} />
                </div>
              </div>
            ) : null}

            {showCard ? (
              <div style={{ border: "2px solid #fff", marginTop: 10 }}>
                <div
                  style={{ background: "#fff", fontWeight: 700, fontSize: 20 }}
                >
                  Enter Your Debit/Credit Card Details
                  <div
                    style={{
                      background: "#fff",
                      fontWeight: 350,
                      fontSize: 14,
                    }}
                  >
                    We do not store your card details.
                  </div>
                  <div>
                    <TextField
                      color="secondary"
                      margin="normal"
                      fullWidth
                      placeholder="Card Number"
                      disableUnderline={false}
                      InputLabelProps="disableAnimation"
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      color="secondary"
                      margin="normal"
                      fullWidth
                      placeholder="Valid Through(MM/YY)"
                      disableUnderline={false}
                      InputLabelProps="disableAnimation"
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      color="secondary"
                      margin="normal"
                      fullWidth
                      placeholder="Name on Card "
                      disableUnderline={false}
                      InputLabelProps="disableAnimation"
                      size="small"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    100% secured by{" "}
                    <img
                      src={razorpay}
                      style={{ width: "20%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {showUpi ? (
              <div style={{ border: "2px solid #fff", marginTop: 10 }}>
                <div
                  style={{ background: "#fff", fontWeight: 700, fontSize: 20 }}
                >
                  Pay Using UPI
                  <div>
                    <TextField
                      color="secondary"
                      margin="normal"
                      fullWidth
                      placeholder="Enter Your UPI ID"
                      disableUnderline={false}
                      InputLabelProps="disableAnimation"
                      size="small"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    100% secured by{" "}
                    <img
                      src={razorpay}
                      style={{ width: "20%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {showWallets ? (
              <div
                style={{
                  border: "2px solid #fff",
                  marginTop: 10,
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 5,
                  }}
                >
                  Pay Using Wallets
                </div>
                <div>
                  <input type="radio" value="mobikwik" name="wallet" />{" "}
                  <img
                    src={mobikwik}
                    style={{
                      width: "6%",
                      height: "auto",
                      position: "relative",
                      top: 7,
                    }}
                  />{" "}
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Mobikwik
                  </span>
                  <br />
                  <input type="radio" value="paytm" name="wallet" />{" "}
                  <img
                    src={paytmcircle}
                    style={{
                      width: "6%",
                      height: "auto",
                      marginTop: 10,
                      position: "relative",
                      top: 7,
                    }}
                  />{" "}
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Paytm
                  </span>
                  <br />
                  <input type="radio" value="phonepe" name="wallet" />{" "}
                  <img
                    src={phonepecircle}
                    style={{
                      width: "6%",
                      height: "auto",
                      marginTop: 10,
                      position: "relative",
                      top: 7,
                    }}
                  />{" "}
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    PhonePe
                  </span>
                  <br />
                </div>
              </div>
            ) : null}

            {showNetBanking ? (
              <div
                style={{
                  border: "2px solid #fff",
                  marginTop: 10,
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 5,
                  }}
                >
                  Pay Using Net Banking
                </div>
                <div>
                  <input type="radio" value="paytm" name="netbanking" />{" "}
                  <img
                    src={paytmcircle}
                    style={{
                      width: "6%",
                      height: "auto",
                      position: "relative",
                      top: 7,
                    }}
                  />{" "}
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Paytm
                  </span>
                  <br />
                  <input type="radio" value="sbi" name="netbanking" />{" "}
                  <img
                    src={sbi}
                    style={{
                      width: "6%",
                      height: "auto",
                      marginTop: 10,
                      position: "relative",
                      top: 7,
                    }}
                  />{" "}
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    SBI
                  </span>
                  <br />
                  <input type="radio" value="pnb" name="netbanking" />{" "}
                  <img
                    src={pnb}
                    style={{
                      width: "6%",
                      height: "auto",
                      marginTop: 10,
                      position: "relative",
                      top: 7,
                    }}
                  />{" "}
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    PNB
                  </span>
                  <br />
                  <input type="radio" value="axis" name="netbanking" />{" "}
                  <img
                    src={axis}
                    style={{
                      width: "6%",
                      height: "auto",
                      marginTop: 10,
                      position: "relative",
                      top: 7,
                    }}
                  />{" "}
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    AXIS
                  </span>
                  <br />
                </div>
              </div>
            ) : null}

            {showCod ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #fff",
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#fff",
                    padding: 2,
                    fontWeight: 700,
                    fontSize: 25,
                  }}
                >
                  Saftey Delivery of Your Item{" "}
                  <img
                    src={delivery}
                    style={{ width: "40%", height: "auto" }}
                  />
                </div>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
