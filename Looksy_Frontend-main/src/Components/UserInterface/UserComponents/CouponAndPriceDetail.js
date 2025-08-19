import React, { useState, useEffect } from "react";
import { Button, Grid, CircularProgress, TextField } from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import Signup from "./Signup";
import { useNavigate } from "react-router";
import { postData, isValidAuth } from "../../Services/NodeServices";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWithAddress from "../CheckoutWithAddress";

export default function CouponAndPriceDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, addresses } = useSelector((state) => state);
  const userEmail = user ? Object.keys(user)[0] : null;
  const userData = userEmail ? user[userEmail] : {};

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [authState, setAuthState] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState({
    First20: false,
    Get40: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await isValidAuth();

      if (result.auth) {
        setAuthState(true);
        dispatch({ type: "ADD_USER", payload: [result.email, result] });

        if (result.email && (!addresses || !addresses[result.email])) {
          try {
            setLoading(true);
            const res = await postData(`address/display_email/${result.email}`);
            dispatch({
              type: "SET_ADDRESSES",
              payload: {
                email: result.email,
                addresses: res,
              },
            });
          } catch (error) {
            Swal.fire("Error", "Failed to fetch address", "error");
          } finally {
            setLoading(false);
          }
        }
      } else {
        setAuthState(false);
      }
    };

    fetchData();
  }, [dispatch, addresses]);

  const values = props.value || [];
  const tpay = values.reduce(
    (a, b) => a + (b.offerprice > 0 ? b.offerprice * b.qty : b.price * b.qty),
    0
  );
  const aamt = values.reduce((a, b) => a + b.price * b.qty, 0);

  // Calculate final amount after discount
  const finalAmount = Math.max(tpay - discount, 0);

  useEffect(() => {
    if (values.length > 0) {
      setCouponStatus({
        First20: true, // Always available for first order
        Get40: tpay >= 3500, // Only available for orders above ₹3500
      });
    } else {
      setCouponStatus({
        First20: false,
        Get40: false,
      });
    }
  }, [values, tpay]);

  const handleCheckout = () => {
    if (!authState) {
      Swal.fire({
        icon: "warning",
        title: "Please login to continue",
        showConfirmButton: false,
        timer: 1500,
      });
      setOpen(true);
      return;
    }
    setAddressDialogOpen(true);
  };

  const applyCoupon = () => {
    const coupon = couponCode.trim();
    let discountAmount = 0;
    let validCoupon = false;

    switch (coupon) {
      case "First20":
        if (couponStatus.First20) {
          discountAmount = tpay * 0.2; // 20% discount
          validCoupon = true;
        }
        break;
      case "Get40":
        if (couponStatus.Get40) {
          discountAmount = tpay * 0.4; // 40% discount
          validCoupon = true;
        }
        break;
      default:
        validCoupon = false;
        break;
    }

    if (validCoupon) {
      setDiscount(discountAmount);
      setAppliedCoupon(coupon);
      Swal.fire({
        icon: "success",
        title: "Coupon Applied!",
        text: `You got ${
          coupon === "First20" ? "20%" : "40%"
        } discount (₹${discountAmount.toFixed(2)})`,
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      setDiscount(0);
      setAppliedCoupon(null);
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text: "The coupon code is invalid or not applicable",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
    Swal.fire({
      icon: "success",
      title: "Coupon Removed",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const closeAddressDialog = () => {
    setAddressDialogOpen(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          background: "#fff",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", margin: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DiscountIcon style={{ color: "#000", marginTop: 5 }} />
                  <span style={{ color: "#535353", marginLeft: 5 }}>
                    Have a coupon/referral code?
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ color: "#2ecc71", fontWeight: "bold" }}>
                    First20 - Get 20% off on your first order
                  </span>
                  <span
                    style={{
                      color: tpay >= 3500 ? "#2ecc71" : "#ABABAB",
                      fontWeight: "bold",
                    }}
                  >
                    Get40 - Get 40% off on orders above ₹3500
                  </span>
                </div>
              </div>
            </Grid>

            <Grid item xs={8}>
              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                placeholder="Enter Code"
                size="small"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              {!appliedCoupon ? (
                <Button
                  onClick={applyCoupon}
                  style={{
                    background: "#51CBCC",
                    color: "white",
                    marginTop: "16px",
                    height: "40px",
                    fontWeight: "bold",
                  }}
                >
                  APPLY
                </Button>
              ) : (
                <Button
                  onClick={removeCoupon}
                  style={{
                    background: "#ff6b6b",
                    color: "white",
                    marginTop: "16px",
                    height: "40px",
                    fontWeight: "bold",
                  }}
                >
                  REMOVE
                </Button>
              )}
            </Grid>

            <Grid item xs={12}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>
                PRICE DETAILS ({values.length} items)
              </div>
            </Grid>
            <Grid item xs={12}>
              <hr color="#ABABAB" />
            </Grid>

            <Grid item xs={6}>
              <div>Total MRP (Inc. of Taxes)</div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: "right" }}>₹{aamt}</div>
            </Grid>

            <Grid item xs={6}>
              <div>Discount:</div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: "right" }}>
                -₹{aamt - tpay + discount}
              </div>
            </Grid>

            {appliedCoupon && (
              <>
                <Grid item xs={6}>
                  <div>Coupon Discount ({appliedCoupon}):</div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right", color: "#2ecc71" }}>
                    -₹{discount.toFixed(2)}
                  </div>
                </Grid>
              </>
            )}

            <Grid item xs={6}>
              <div>Shipping</div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: "right", color: "#2ecc71" }}>Free</div>
            </Grid>

            <Grid item xs={12}>
              <hr color="#ABABAB" />
            </Grid>

            <Grid item xs={6}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Total Amount</div>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{ textAlign: "right", fontWeight: 700, fontSize: 18 }}
              >
                ₹{finalAmount.toFixed(2)}
              </div>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  textAlign: "center",
                  background: "#2ecc71",
                  color: "#fff",
                  padding: 7,
                }}
              >
                You Saved ₹{(aamt - tpay + discount).toFixed(2)} on this order
              </div>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  onClick={values.length > 0 ? handleCheckout : null}
                  style={{
                    boxShadow: "0px 0px 4px 0px grey",
                    background: values.length > 0 ? "#51CBCC" : "#cccccc",
                    fontSize: 20,
                    fontWeight: 600,
                    width: "70%",
                    padding: 10,
                    borderRadius: 5,
                    color: "#000000",
                    cursor: values.length > 0 ? "pointer" : "not-allowed",
                    textAlign: "center",
                    opacity: values.length > 0 ? 1 : 0.6,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} style={{ color: "#fff" }} />
                  ) : (
                    "CHECKOUT NOW"
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <Signup open={open} setOpen={setOpen} />
      <CheckoutWithAddress
        open={addressDialogOpen}
        onClose={closeAddressDialog}
        totalAmount={finalAmount}
      />
    </div>
  );
}
