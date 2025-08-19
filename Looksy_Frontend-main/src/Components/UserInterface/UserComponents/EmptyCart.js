import { getData, postData, ServerURL } from "../../Services/NodeServices";
import { Button, Grid } from "@mui/material";
import PaymentNavBar from "./PaymentNavBar";
import { ShoppingCart } from "@mui/icons-material";
import customersgif from "../../../Assets/customers.gif"
export default function EmptyCart(props) {
  return (
    <div>
      <PaymentNavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          textAlign: "center",
          marginTop: 90,
        }}
      >
        <div
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img src={customersgif} alt="gif" style={{ width: "30%", height: "auto" }} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          textAlign: "center",
          marginTop: 20,
          fontSize: 30,
          fontFamily: "sans-serif",
          fontWeight: 550,
        }}
      >
        Your cart is empty and sad :(
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          textAlign: "center",
          marginTop: 10,
          fontSize: 22,
          fontFamily: "sans-serif",
          fontWeight: 550,
        }}
      >
        Add Something To Make It Happy!
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          textAlign: "center",
          marginTop: 10,
          fontSize: 26,
          fontFamily: "sans-serif",
          fontWeight: 550,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            background: "#ffb8b8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            padding: 15,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <ShoppingCart /> &nbsp;Continue Shopping
        </div>
      </div>
    </div>
  );
}
