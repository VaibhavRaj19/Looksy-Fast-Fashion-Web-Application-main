import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl, Radio, RadioGroup } from "@mui/material"; // Fixed import
import { getData } from "../../Services/NodeServices"; // Removed postData since not needed

const AccordionStyle = {
  "&:before": {
    backgroundColor: "transparent !important",
    border: "none",
  },
};

export default function FilterComponent(props) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  // Clear all filters and show original products
  const clearFilters = () => {
    setSelectedSize("");
    setSelectedPrice("");
    if (props.onClearFilters) {
      props.onClearFilters(); // Let parent handle showing all products
    }
  };

  const fetchProductsByPrice = async (sortOrder) => {
    try {
      let result;
      if (sortOrder === "LTH") {
        // Low to High - you might need different endpoints
        result = await getData("api/products/sorted-by-price?order=asc");
      } else if (sortOrder === "HTL") {
        // High to Low
        result = await getData("api/products/sorted-by-price?order=desc");
      } else {
        // Default sorting
        result = await getData("api/products/sorted-by-price");
      }

      props.setProductList(result?.data || []);
      console.log("Products sorted by price:", result?.data);
    } catch (error) {
      console.error("Error fetching products by price:", error);
      props.setProductList([]);
    }
  };

  const handlePriceRadio = (event) => {
    const value = event.target.value;
    setSelectedPrice(value);
    fetchProductsByPrice(value);
  };

  const fetchProductsBySize = async (size) => {
    try {
      // Fixed: Use GET request with query parameter
      const result = await getData(`api/products/by-size?size=${size}`);
      props.setProductList(result?.data || []);
      console.log(`Products filtered by size ${size}:`, result?.data);
    } catch (error) {
      console.error(`Error fetching products by size ${size}:`, error);
      props.setProductList([]);
    }
  };

  const handleSizeRadio = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    fetchProductsBySize(size);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 300, // Made it more reasonable width
          height: "auto", // Let it adjust height automatically
        },
      }}
    >
      <Paper elevation={1}>
        <div
          style={{
            fontSize: "18px",
            letterSpacing: "1px",
            fontWeight: 600,
            color: "#434343",
            textTransform: "uppercase",
            marginLeft: "3%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <p style={{ margin: 0 }}>FILTER</p>
          <button
            onClick={clearFilters}
            style={{
              background: "none",
              border: "1px solid #434343",
              color: "#434343",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            CLEAR ALL
          </button>
        </div>

        <Accordion sx={AccordionStyle} elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "1px",
                color: "#434343",
                textTransform: "uppercase",
              }}
            >
              <p style={{ margin: 0 }}>SIZE</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                aria-labelledby="size-radio-buttons-group"
                name="size-radio-buttons-group"
                value={selectedSize}
                onChange={handleSizeRadio}
              >
                <FormControlLabel value="XS" control={<Radio />} label="XS" />
                <FormControlLabel value="S" control={<Radio />} label="S" />
                <FormControlLabel value="M" control={<Radio />} label="M" />
                <FormControlLabel value="L" control={<Radio />} label="L" />
                <FormControlLabel value="XL" control={<Radio />} label="XL" />
                <FormControlLabel value="XXL" control={<Radio />} label="XXL" />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={AccordionStyle} elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "1px",
                color: "#434343",
                textTransform: "uppercase",
              }}
            >
              <p style={{ margin: 0 }}>PRICE</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                aria-labelledby="price-radio-buttons-group"
                name="price-radio-buttons-group"
                value={selectedPrice}
                onChange={handlePriceRadio}
              >
                <FormControlLabel
                  value="LTH"
                  control={<Radio />}
                  label="Low to High"
                />
                <FormControlLabel
                  value="HTL"
                  control={<Radio />}
                  label="High to Low"
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
}
