import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DialogActions from "@mui/material/DialogActions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slide from "@mui/material/Slide";
import { ServerURL } from "../../Services/NodeServices";
import { postData } from "../../Services/NodeServices";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SignupDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [value, setValue] = useState("female");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDetailClickOpen = (scrollType) => () => {
    setOpenDetail(true);
    setScroll(scrollType);
    setOpen(false);
    setOpenOtp(false);
  };

  const handleDetailClose = () => {
    setOpenDetail(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openDetail) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDetail]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await postData("user/register", {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      dob,
      gender: value,
    });

    if (result.message === "OTP sent to email") {
      setOpenOtp(true);
      setOpen(false);
      setError("");
    } else {
      setError(result.message);
    }
  };

  const handleVerifyOtp = async () => {
    const result = await postData("user/verify-otp", {
      email,
      otp,
    });

    if (result.message === "User verified and registered successfully.") {
      setOpenOtp(false);
      setError("");
      // Optionally auto-login the user
      const loginResult = await postData("user/login", {
        email,
        password,
      });

      if (loginResult.token) {
        setToken(loginResult.token);
        localStorage.setItem("token", loginResult.token);
        handleClose();
      }
    } else {
      setError(result.message);
    }
  };

  const handleLogin = async () => {
    const result = await postData("user/login", {
      email: loginEmail,
      password: loginPassword,
    });

    console.log("Login API Result:", result); // Debug log

    if (result.token) {
      setToken(result.token);
      setEmail(loginEmail);
      localStorage.setItem("token", result.token);

      // ✅ Fetch full user details
      const userResponse = await fetch(
        `http://localhost:8080/user/get-by/${loginEmail}`
      );
      const user = await userResponse.json();

      console.log("Fetched User Data:", user); // Debug log

      if (user.userid) {
        // Assuming 'userid' is the correct property for user ID
        // 🔄 Save user to localStorage or pass via props
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Dispatching ADD_USER with payload:", [user.email, user]); // Debug log
        dispatch({ type: "ADD_USER", payload: [user.email, user] });
      } else {
        console.warn("User ID not found in fetched user data:", user); // Debug log
      }

      handleClose();
      setError("");
    } else {
      setError(result.error || "Login failed");
      console.error("Login failed:", result.error || "Unknown error"); // Debug log
    }
  };

  const handleResendOtp = async () => {
    const result = await postData("user/resend-otp", { email });
    if (result.message === "OTP resent successfully") {
      setError("");
    } else {
      setError(result.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setOpenOtp(false);
    setOpenDetail(false);
    setError("");
  };

  const handleOtpClose = () => {
    setOpenOtp(false);
  };

  const handleBackToClickOpen = () => {
    setOpen(true);
    setOpenOtp(false);
  };

  const handleLogout = () => {
    setToken("");
    setLoginEmail("");
    setLoginPassword("");
    setError("");
  };

  const signupDetailDialog = () => {
    return (
      <Dialog
        open={openDetail}
        onClose={handleDetailClose}
        PaperProps={{ sx: { position: "fixed", top: 40, right: 70, m: 0 } }}
        fullWidth
        maxWidth="xs"
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div
            style={{
              width: 70,
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img
              src={`${ServerURL}/images/popimg.webp`}
              alt="Welcome"
              style={{ width: "100%", height: "100%" }}
            /> */}
          </div>
          <div style={{ fontSize: 40, color: "#02475b" }}>Welcome to TUG</div>
          <div style={{ fontSize: 15, fontWeight: 400, color: "#0087BA" }}>
            Enter your details. Let us quickly get to know you so that we can
            get you the best help :)
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Full Name</div>
              <TextField
                fullWidth
                placeholder="First Name"
                id="firstName"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Last Name"
                id="lastName"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Date Of Birth</div>
              <TextField
                fullWidth
                placeholder="dd/mm/yyyy"
                id="dob"
                variant="standard"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Gender</div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Email Address</div>
              <TextField
                fullWidth
                placeholder="name@email.com"
                id="email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Password</div>
              <TextField
                fullWidth
                placeholder="Password"
                id="password"
                type="password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                Confirm Password
              </div>
              <TextField
                fullWidth
                placeholder="Confirm Password"
                id="confirmPassword"
                type="password"
                variant="standard"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="success" />}
                label="Send me personalised health tips & offers on WhatsApp"
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <div style={{ color: "red" }}>{error}</div>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div style={{ padding: 14 }}>
                <Button
                  style={{ background: "#02475b", color: "#fff" }}
                  fullWidth
                  variant="contained"
                  onClick={handleRegister}
                >
                  REGISTER
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  };

  const signupOtpDialog = () => {
    return (
      <BootstrapDialog
        onClose={handleOtpClose}
        PaperProps={{ sx: { position: "fixed", top: 40, right: 70, m: 0 } }}
        fullWidth
        maxWidth="xs"
        aria-labelledby="customized-dialog-title"
        open={openOtp}
      >
        <div
          style={{
            fontSize: 40,
            marginLeft: 15,
            marginTop: 15,
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon fontSize="large" onClick={handleBackToClickOpen} />
        </div>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleOtpClose}
        >
          <div style={{ fontSize: 40, color: "#02475b" }}>Verify OTP</div>
        </BootstrapDialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{ fontSize: 16, fontWeight: "500", color: "#0087BA" }}
              >
                Now type in the OTP sent to {email} for authentication
              </div>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="otp"
                variant="standard"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <div
                style={{ fontSize: 13, cursor: "pointer", marginTop: 5 }}
                onClick={handleResendOtp}
              >
                Resend OTP
              </div>
              <div>or</div>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={handleVerifyOtp}
                variant="contained"
                style={{ backgroundColor: "#02475b" }}
              >
                <ArrowForwardIcon />
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <div style={{ color: "red" }}>{error}</div>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    );
  };

  const signupDialog = () => {
    return (
      <BootstrapDialog
        onClose={handleClose}
        PaperProps={{ sx: { position: "fixed", top: 40, right: 70, m: 0 } }}
        fullWidth
        maxWidth="xs"
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div style={{ fontSize: 40, color: "#02475b" }}>Login / Signup</div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
                Login
              </div>
              <TextField
                fullWidth
                placeholder="Email"
                variant="standard"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                variant="standard"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                style={{ marginTop: 10, backgroundColor: "#02475b" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                OR
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginTop: 20,
                  cursor: "pointer",
                  color: "#0087BA",
                  textAlign: "center",
                }}
                onClick={handleDetailClickOpen("paper")}
              >
                Register New User
              </div>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <div style={{ color: "red" }}>{error}</div>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    );
  };

  return (
    <div>
      {/* Show LOGIN | SIGNUP link only if user is NOT logged in */}
      {!token && (
        <div
          style={{ fontFamily: "Sans-serif", fontSize: 13, fontWeight: 600 }}
          onClick={handleClickOpen}
        >
          LOGIN | SIGNUP
        </div>
      )}

      {/* If logged in, show Logout button */}
      {token && (
        <div
          style={{
            fontFamily: "Sans-serif",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>{email}</span>
          <Button variant="text" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}

      {signupDialog()}
      {signupOtpDialog()}
      {signupDetailDialog()}
    </div>
  );
}
