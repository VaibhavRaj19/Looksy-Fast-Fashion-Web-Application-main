import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import securityicon from "../../../Assets/securityicon.png";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";

export default function PaymentNavBar(props) {
  var theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  var navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "#FFF" }}>
        <Toolbar>
          {matches ? null : (
            <div
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                fontSize: 26,
                fontWeight: 700,
                width: "40%",
                fontFamily: "cursive",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                color: "#000",
                textAlign: "center",
              }}
            >
              Looksy – Fast Fashion
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              right: 0,
              color: "#000",
              background: "#fff",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "#f2f2f2",
                fontSize: 23,
                fontFamily: "sans-serif",
                fontWeight: 550,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img
                src={securityicon}
                style={{ width: "12%", height: "auto" }}
                alt=""
              />
              100% SECURE PAYMENT
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
