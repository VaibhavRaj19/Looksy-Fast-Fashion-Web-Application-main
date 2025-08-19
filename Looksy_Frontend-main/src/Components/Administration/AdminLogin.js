import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { postData } from "../Services/NodeServices";
import backgroundImage from "../../Assets/image.png";
const theme = createTheme();

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    const body = { emailid, password };
    const result = await postData("admin/check_admin_login", body);

    if (result.status) {
      localStorage.setItem("token", result.token);
      console.log("Login Result:", result); // Added for debugging
      dispatch({
        type: "ADD_USER",
        payload: [
          result.emailid,
          { email: result.emailid, userid: result.userid },
        ],
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message || "Invalid Email Address or Password",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => t.palette.grey[50],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                fullWidth
                required
                label="Email Address"
                margin="normal"
                onChange={(e) => setEmailid(e.target.value)}
                autoFocus
              />
              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Login
              </Button>
              <Button type="button" onClick={() => navigate("/adminregister")}>
                Register as Admin
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
