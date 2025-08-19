import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// Components
import SizeChart from "./SizeChart";
import PlusMinusComponent from "./PlusMinusComponent";
import ColorRadio from "./ColorRadio";
import DeliveryOptions from "./DeliveryOptions";
// Services
import { postData } from "../../Services/NodeServices";
// Redux
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetailsFilling(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Parse productInfo (string or object)
  const product =
    typeof props.productInfo === "string"
      ? JSON.parse(props.productInfo)
      : props.productInfo;

  const cart = useSelector((state) => state.cart);
  const selectedProduct = cart[product.id];

  // States
  const [sizes, setSizes] = useState([]); // sizes is array of strings like ["S", "L"]
  const [colors, setColors] = useState([]); // array of colors
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct?.size || null
  );
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct?.color || null
  );
  const [qty, setQty] = useState(selectedProduct?.qty || 0);
  const [heart, setHeart] = useState(false);

  const matches = useMediaQuery("(max-width:720px)");

  // Fetch sizes from POST API fetch_all_dimensions
  const fetchSizes = async () => {
    if (!product.categoryid || !product.subcategoryid || !product.id) {
      console.error("Missing categoryid, subcategoryid or productid");
      return;
    }

    const body = {
      categoryid: product.categoryid,
      subcategoryid: product.subcategoryid,
      productid: product.id,
    };

    const result = await postData("api/dimensions/fetch_all_dimensions", body);

    if (result.status === false) {
      Swal.fire("Error", result.error || "Failed to fetch sizes", "error");
      return;
    }

    // Find the matching dimension object
    const matchedDimension = result.find(
      (dim) =>
        dim.categoryid === product.categoryid &&
        dim.productid === product.id &&
        dim.subcategoryid === product.subcategoryid
    );

    const sizesList = matchedDimension ? matchedDimension.dimension : [];

    setSizes(sizesList);

    // Automatically select the first size if none is selected
    if (!selectedSize && sizesList.length > 0) {
      const firstSize = sizesList[0];
      setSelectedSize(firstSize);
      fetchColors(product.id, firstSize);
    } else if (selectedSize) {
      fetchColors(product.id, selectedSize);
    }
  };

  // Fetch colors from GET API using productId query param
  const fetchColors = async (productId, size) => {
    if (!productId) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/colors/product-by-id?productId=${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch colors");
      }
      let colorsData = await response.json();

      // Filter colors by selected size if provided
      if (size) {
        colorsData = colorsData.filter((c) => c.size === size);
      }

      setColors(colorsData);

      // Always select the first color if colors are available
      if (colorsData.length > 0) {
        const firstColor = colorsData[0];
        setSelectedColor(firstColor);
        setQty(0); // Set quantity to 1 when a color is auto-selected
      } else {
        setSelectedColor(null);
        setQty(0);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  useEffect(() => {
    fetchSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedSize && selectedColor && qty === 0 && !selectedProduct) {
      const updatedProduct = {
        ...product,
        size: selectedSize,
        color: selectedColor,
        qty: qty,
      };
      dispatch({ type: "ADD_CART", payload: [product.id, updatedProduct] });
      if (props.updateCart) props.updateCart();
    }
  }, [
    selectedSize,
    selectedColor,
    qty,
    product,
    dispatch,
    props,
    selectedProduct,
  ]);

  // Handle selecting a size
  const handleSize = (index) => {
    const newSize = sizes[index];
    setSelectedSize(newSize);
    setSelectedColor(null); // Reset selected color
    setQty(0); // Reset quantity
    fetchColors(product.id, newSize); // Fetch colors for the new size
  };

  // Handle selecting a color
  const handleColor = (colorValue) => {
    setSelectedColor(colorValue);
    setQty(0);
  };

  // Handle quantity change
  const handleQtyChange = (value) => {
    if (!product || !product.id) {
      console.error("Product data is not available yet.");
      return;
    }

    if (value === 0) {
      dispatch({ type: "DELETE_CART", payload: [product.id] });
      setQty(0);
    } else {
      const updatedProduct = {
        ...product,
        size: selectedSize,
        color: selectedColor,
        qty: value,
      };
      dispatch({ type: "ADD_CART", payload: [product.id, updatedProduct] });
      setQty(value);
    }

    if (props.updateCart) props.updateCart();
  };

  const toggleHeart = () => setHeart((prev) => !prev);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {matches ? (
            <span style={{ fontSize: 25, fontWeight: 700 }}>
              {product.productname}
            </span>
          ) : (
            <>
              <span style={{ fontSize: 25, fontWeight: 700 }}>
                {product.productname}
              </span>
              <span
                onClick={toggleHeart}
                style={{ marginLeft: 70, cursor: "pointer" }}
              >
                {heart ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </span>
            </>
          )}
        </Grid>

        <Grid item xs={12}>
          {product.offerprice ? (
            <>
              <span style={{ fontSize: 20, fontWeight: 700 }}>
                PRICE: ₹{product.offerprice}
              </span>
              &nbsp;&nbsp;
              <span
                style={{
                  color: "#a7a7a7",
                  fontSize: 17,
                  textDecoration: "line-through",
                }}
              >
                ₹{product.price}
              </span>
              &nbsp;&nbsp;
              <span style={{ fontSize: 18, fontWeight: 700, color: "#4d9d0b" }}>
                (₹{product.price - product.offerprice} off)
              </span>
            </>
          ) : (
            <span style={{ fontSize: 20, fontWeight: 700 }}>
              PRICE: ₹{product.price}
            </span>
          )}
          <div>
            <span style={{ fontSize: 15 }}>Inclusive of All Taxes +</span>
            &nbsp;&nbsp;
            <span style={{ color: "#efb30b", fontWeight: 600 }}>
              Free Shipping
            </span>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>SIZE</span>
            <SizeChart />
          </div>
          <div
            style={{
              marginTop: 15,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {sizes.map((sizeVal, i) => (
              <span
                key={i}
                onClick={() => handleSize(i)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 47,
                  width: 47,
                  textAlign: "center",
                  fontSize: 13,
                  cursor: "pointer",
                  borderRadius: "50%",
                  border:
                    sizeVal === selectedSize
                      ? "2px solid #51cccc"
                      : "1px solid #ddd",
                }}
              >
                {sizeVal}
              </span>
            ))}
          </div>
        </Grid>

        <Grid item xs={12}>
          <ColorRadio
            colorlist={colors}
            onClick={handleColor}
            colorName={selectedColor}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <PlusMinusComponent value={qty} onChange={handleQtyChange} />
        </Grid>

        <Grid item xs={6} sm={3}>
          <Button
            fullWidth
            onClick={() => {
              const updatedProduct = {
                ...product,
                size: selectedSize,
                color: selectedColor,
                qty: qty,
              };
              dispatch({
                type: "ADD_CART",
                payload: [product.id, updatedProduct],
              });
              if (props.updateCart) props.updateCart();
              navigate("/mycart");
            }}
            variant="contained"
            style={{
              height: "100%",
              background: "#ffb8b8",
              color: "#000",
              cursor: "pointer",
            }}
            startIcon={<ArrowCircleRightOutlinedIcon />}
          >
            Buy Now
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            style={{
              width: "83.3%",
              background: "#1e90ff",
              height: 40,
              color: "#fff",
            }}
            startIcon={<ArrowCircleRightOutlinedIcon />}
          >
            Continue Shopping
          </Button>
        </Grid>

        <Grid item xs={12}>
          <DeliveryOptions />
        </Grid>
      </Grid>
    </div>
  );
}
