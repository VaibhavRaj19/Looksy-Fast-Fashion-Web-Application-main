import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { clearToken } from "../Services/NodeServices";

export default function AdminAppBar() {
  var navigate = useNavigate();

  const handleLogout = async () => {
    var result = await clearToken();

    // Client-side logout: remove token from localStorage
    localStorage.removeItem("token");

    if (result) {
      navigate("/adminlogin");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          background:
            "linear-gradient(90deg, rgba(36,0,0,0.9251050762101716) 0%, rgba(224,2,208,1) 11%, rgba(121,9,43,0.8914916308320203) 96%, rgba(255,0,74,0.5777661406359419) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Looksy – Fast Fashion
          </Typography>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
