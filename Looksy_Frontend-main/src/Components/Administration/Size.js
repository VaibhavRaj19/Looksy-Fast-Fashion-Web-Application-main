import { Grid, Button, Avatar } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useStyles } from "./SizeCss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getData, postData } from "../Services/NodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["S", "M", "L", "XS", "XL", "XXL"];

export default function Size(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState("");
  const [size, setSize] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSize(typeof value === "string" ? value.split(",") : value);
  };

  const handleCategoryChange = async (event) => {
    const selectedCategoryId = event.target.value;
    setCategoryId(selectedCategoryId);
    setSubCategoryId("");
    setProductId("");
    setSubCategoryList([]);
    setProductList([]);

    if (selectedCategoryId) {
      fetchSubCategoriesByCategory(selectedCategoryId);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const result = await getData("category/display_all_category");
      if (Array.isArray(result)) {
        setCategoryList(result);
      } else if (result?.categories) {
        setCategoryList(result.categories);
      } else if (result?.data) {
        setCategoryList(result.data);
      } else {
        console.error("Unexpected category response format:", result);
        setCategoryList([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryList([]);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchSubCategoriesByCategory = async (categoryId) => {
    try {
      const result = await getData(`subcategory/by-category/${categoryId}`);
      if (Array.isArray(result)) {
        setSubCategoryList(result);
      } else if (result?.status && result?.subcategory) {
        setSubCategoryList([result.subcategory]);
      } else if (result?.data) {
        setSubCategoryList(result.data);
      } else {
        console.error("Unexpected subcategory response format:", result);
        setSubCategoryList([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategoryList([]);
    }
  };

  const fillCategories = () => {
    return categoryList.map((item) => (
      <MenuItem key={item.categoryid} value={item.categoryid}>
        {item.categoryname}
      </MenuItem>
    ));
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategoryId = event.target.value;
    setSubCategoryId(selectedSubCategoryId);
    setProductId("");
    setProductList([]);

    if (selectedSubCategoryId) {
      fetchAllProduct(categoryId, selectedSubCategoryId);
    }
  };

  const fillSubCategories = () => {
    return subCategoryList.map((item) => (
      <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
        {item.subcategoryname}
      </MenuItem>
    ));
  };

  const handleProductChange = (event) => {
    setProductId(event.target.value);
  };

  const fetchAllProduct = async (cid, sid) => {
    try {
      const body = { categoryid: cid, subcategoryid: sid };
      const result = await postData("api/products/fetch_all_product", body);
      if (Array.isArray(result?.data)) {
        setProductList(result.data);
      } else if (Array.isArray(result)) {
        setProductList(result);
      } else {
        console.error("Unexpected product response format:", result);
        setProductList([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductList([]);
    }
  };

  const fillProducts = () => {
    return productList.map((item) => {
      const productId = item.id || item.productid;
      return (
        <MenuItem key={productId} value={productId}>
          {item.productname}
        </MenuItem>
      );
    });
  };

  const handleSubmit = async () => {
    if (!categoryId || !subCategoryId || !productId || size.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all fields",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const body = {
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        productid: productId,
        dimension: size, // Now sending the array directly
      };

      const result = await postData("api/dimensions/add_new_dimension", body);

      if (result?.status) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: result.message || "Sizes added successfully",
        });
        handleReset();
      } else {
        throw new Error(result?.error || "Failed to add sizes");
      }
    } catch (error) {
      console.error("Error adding dimensions:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to add sizes",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCategoryId("");
    setSubCategoryId("");
    setProductId("");
    setSize([]);
    setSubCategoryList([]);
    setProductList([]);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container className={classes.gridStyle} spacing={2}>
          <Grid item xs={12} style={{ display: "flex" }}>
            <div className={classes.headingText}>Size Interface</div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "71%",
              }}
            >
              <Avatar
                src={"/report.png"}
                variant="square"
                style={{ width: 39, cursor: "pointer" }}
                onClick={() => navigate("/dashboard/displayallsize")}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">Choose Category</MenuItem>
                {fillCategories()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>SubCategory</InputLabel>
              <Select
                value={subCategoryId}
                label="SubCategory"
                onChange={handleSubCategoryChange}
                disabled={!categoryId}
              >
                <MenuItem value="">Choose SubCategory</MenuItem>
                {fillSubCategories()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={productId}
                label="Product"
                onChange={handleProductChange}
                disabled={!subCategoryId}
              >
                <MenuItem value="">Choose Product</MenuItem>
                {fillProducts()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                multiple
                value={size}
                onChange={handleChange}
                input={<OutlinedInput label="Size" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={size.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              disabled={
                !categoryId ||
                !subCategoryId ||
                !productId ||
                size.length === 0 ||
                isSubmitting
              }
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={handleReset}
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
