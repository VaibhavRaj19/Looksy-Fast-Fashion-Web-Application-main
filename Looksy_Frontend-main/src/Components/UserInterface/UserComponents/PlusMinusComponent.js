import React, { useState, useEffect } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Button, Avatar } from "@mui/material";

export default function PlusMinusComponent(props) {
  const [value, setValue] = useState(props.value || 0);

  useEffect(() => {
    setValue(props.value || 0);
  }, [props.value]);

  const handleAddToCart = () => {
    const newValue = 1;
    setValue(newValue);
    props.onChange(newValue);
  };

  const handlePlus = () => {
    if (value < 5) {
      const newValue = value + 1;
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  const handleMinus = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  return (
    <>
      {value === 0 ? (
        <Button
          onClick={handleAddToCart}
          fullWidth
          variant="contained"
          style={{ height: "100%", background: "#51cccc", color: "#000" }}
          startIcon={<ShoppingCart />}
        >
          Add To Cart
        </Button>
      ) : (
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            fontWeight: 600,
            width: 120,
          }}
        >
          <Avatar
            onClick={handleMinus}
            style={{ background: "#51cccc", color: "black", cursor: "pointer" }}
            variant="circular"
          >
            -
          </Avatar>
          <span>{value}</span>
          <Avatar
            onClick={handlePlus}
            style={{ background: "#51cccc", color: "black", cursor: "pointer" }}
            variant="circular"
          >
            +
          </Avatar>
        </span>
      )}
    </>
  );
}
