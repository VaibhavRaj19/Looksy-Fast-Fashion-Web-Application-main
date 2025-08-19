import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL, postData } from "../Services/NodeServices";
import { useNavigate } from "react-router";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

import { useLocation } from "react-router";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PaymentGateway = () => {
  const location = useLocation();
  const { selectedAddress, totalAmount } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart and user data from Redux
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const userData = Object.values(user)[0] || {};

  

  // Handle successful payment
  const handlePaymentSuccess = async (paymentId) => {
    try {
      setLoading(true);

      const products = Object.values(cart).map((item) => ({
        productId: item._id,
        quantity: item.qty,
        price: item.offerprice > 0 ? item.offerprice : item.price,
      }));

      const orderData = {
        userId: userData._id,
        products,
        paymentId,
        amount: totalAmount,
        email: userData.email,
        status: "COMPLETED",
        shippingAddress: selectedAddress, // Add the selected address here
      };

      const result = await postData("api/orders/create", orderData);

      if (result?.id) {
        // Reduce product quantities
        const updateQtyResult = await postData("api/products/update-quantities", { products });
        if (!updateQtyResult?.success) {
          // Handle the case where the quantity update fails
          console.error("Failed to update product quantities");
          // You might want to show an error to the user or log this for manual intervention
        }

        dispatch({ type: "EMPTY_CART", payload: [] });
        navigate("/order-confirmation", {
          state: {
            orderId: result.id,
            amount: totalAmount,
            paymentId,
          },
        });
      } else {
        throw new Error("Order not created");
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      setError("Payment successful but order failed");
      setLoading(false);
    }
  };

  // Start Razorpay checkout
  const initializePayment = () => {
    try {
      const options = {
        key: "rzp_test_t4LUM04KXw6wHc",
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        name: "Looksy.com",
        description: "Order Payment",
        image: `${ServerURL}/images/logo.png`,
        handler: (response) => {
          handlePaymentSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: `${userData.firstname} ${userData.lastname}`,
          email: userData.email,
          contact: userData.mobileno,
        },
        theme: {
          color: "#51cccc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError("Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError("Failed to initialize payment");
      setLoading(false);
    }
  };

  // Load Razorpay script and initialize payment
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setLoading(false);
        initializePayment();
      };
      script.onerror = () => {
        setError("Failed to load payment gateway");
        setLoading(false);
      };
      document.body.appendChild(script);
    } else {
      setLoading(false);
      initializePayment();
    }
  }, [initializePayment]);

  // Auto-redirect to homepage after 2 seconds (whether success or fail)
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, navigate]);

  // Error UI
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  // Loader UI
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Processing your payment...</h2>
      <p>You will be redirected to home shortly...</p>
      <SyncLoader color="#36D7B7" loading={loading} css={override} size={15} />
    </div>
  );
};

export default PaymentGateway;
