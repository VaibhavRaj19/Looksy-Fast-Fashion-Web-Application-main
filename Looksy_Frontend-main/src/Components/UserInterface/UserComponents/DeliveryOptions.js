import { TextField, Button } from "@mui/material";
import cod from "../../../Assets/cod.jpg";
import ship from "../../../Assets/ship.jpg";
export default function DeliveryOptions() {
  return (
    <div>
      <b> DELIVERY OPTIONS</b>
      <div style={{ border: "1px solid #ddd", marginTop: "2%", padding: "1%" }}>
        <div style={{ fontSize: "17px", padding: "2%" }}>
          {" "}
          Enter your Pincode to check the delivery time and free pick up options
        </div>
        <div style={{ padding: "2%", display: "flex", position: "relative" }}>
          {" "}
          <TextField
            id="standard-basic"
            variant="outlined"
            inputProps={{ maxLength: 6, style: { height: "6px" } }}
            placeholder="Enter Pincode"
            style={{ width: "50%", height: "10%" }}
          />
          <Button
            style={{
              position: "relative",
              right: "65px",
              color: "#51cbcc",
              textDecoration: "underline",
            }}
          >
            Check
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src={cod} width="40px" alt="" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "1%",
            }}
          >
            Cash On Delivery
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src={ship} width="40px" alt="" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "1%",
            }}
          >
            Express Shipping
          </div>
        </div>
      </div>
    </div>
  );
}
