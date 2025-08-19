import React from "react";
import { ServerURL } from "../../Services/NodeServices";
import paytm from "../../../Assets/paytm.png";
import upi from "../../../Assets/upi.png";
import rupay from "../../../Assets/rupay.png";
import netbanking from "../../../Assets/netbanking.png";
import visa from "../../../Assets/visa.png";

export default function PaymentLogo(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ecf0f1",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          background: "#fff",
          padding: 15,
        }}
      >
        <img src={paytm} style={{ width: "10%", height: "auto" }} />
        <img src={upi} style={{ width: "10%", height: "auto" }} />
        <img src={rupay} style={{ width: "10%", height: "auto" }} />
        <img src={netbanking} style={{ width: "10%", height: "auto" }} />
        <img src={visa} style={{ width: "10%", height: "auto" }} />
      </div>
    </div>
  );
}
