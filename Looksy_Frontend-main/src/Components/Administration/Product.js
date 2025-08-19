import { Grid, Avatar, TextField, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useStyles } from "./ProductCss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getData, postData } from "../Services/NodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("");
  const [saleStatus, setSaleStatus] = useState("");
  const [icon, setIcon] = useState({ url: "/icon.png", bytes: "" });
  const [pictures, setPictures] = useState([]); // New state for multiple images

  const fetchAllCategory = async () => {
    try {
      const result = await getData("category/display_all_category");
      if (result?.categories) {
        setCategoryList(result.categories);
      } else {
        setCategoryList([]);
        Swal.fire({
          icon: "warning",
          title: "No Categories Found",
          text: "Please add categories first before creating products",
        });
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
      Swal.fire({
        icon: "error",
        title: "Error Loading Categories",
        text: `Failed to load categories: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const handleCategoryChange = async (event) => {
    const cid = event.target.value;
    setCategoryId(cid);
    setSubCategoryId(""); // Reset subcategory selection
    setSubCategoryList([]); // Clear previous subcategories

    if (cid) {
      // Only fetch if a category is selected
      await fetchAllSubCategory(cid);
    }
  };

  const fetchAllSubCategory = async (cid) => {
    try {
      const result = await getData(`subcategory/by-category/${cid}`);
      console.log("Subcategory response:", result);

      // Since API returns direct array
      setSubCategoryList(result || []);
    } catch (error) {
      console.error("Fetch subcategories error:", error);
      setSubCategoryList([]);
      Swal.fire({
        icon: "error",
        title: "Error Loading Subcategories",
        text: `Failed to load subcategories: ${error.message}`,
      });
    }
  };

  const handleIcon = (event) => {
    setIcon({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  // New function to handle multiple picture uploads
  const handlePictures = (event) => {
    const files = Array.from(event.target.files);
    const pictureData = files.map((file) => ({
      url: URL.createObjectURL(file),
      bytes: file,
    }));
    setPictures(pictureData);
  };

  // Remove a picture from the list
  const removePicture = (index) => {
    setPictures(pictures.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Create the product data object
    const productData = {
      categoryid: categoryId,
      subcategoryid: subCategoryId,
      productname: productName,
      price: price,
      offerprice: offerPrice,
      stock: stock,
      description: description,
      rating: rating,
      status: status,
      salestatus: saleStatus,
    };

    // Create FormData
    const formData = new FormData();

    // Add product data as JSON string
    formData.append("data", JSON.stringify(productData));

    // Add icon file
    if (icon.bytes) {
      formData.append("icon", icon.bytes);
    }

    // Add multiple picture files
    pictures.forEach((picture, index) => {
      if (picture.bytes) {
        formData.append("picture", picture.bytes);
      }
    });

    try {
      const result = await postData(
        "api/products/add_new_product",
        formData,
        true
      );
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Product Added Successfully",
        });
        handleReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.error || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting the product.",
      });
    }
  };

  const handleReset = () => {
    setCategoryId("");
    setSubCategoryId("");
    setProductName("");
    setPrice("");
    setOfferPrice("");
    setStock("");
    setDescription("");
    setRating("");
    setStatus("");
    setSaleStatus("");
    setIcon({ url: "/icon.png", bytes: "" });
    setPictures([]); // Reset pictures
    setSubCategoryList([]);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: "flex" }}>
            <div className={classes.headingText}>Product Interface</div>
            <div style={{ marginLeft: "auto" }}>
              <Avatar
                src={"/report.png"}
                variant="square"
                style={{ width: 39 }}
                onClick={() => navigate("/dashboard/displayallproduct")}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={categoryId} onChange={handleCategoryChange}>
                <MenuItem value="">
                  <em>Choose Category</em>
                </MenuItem>
                {categoryList.map((item) => (
                  <MenuItem key={item.categoryid} value={item.categoryid}>
                    {item.categoryname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>SubCategory</InputLabel>
              <Select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Choose SubCategory</em>
                </MenuItem>
                {subCategoryList.map((item) => (
                  <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
                    {item.subcategoryname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Product Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Offer Price"
              variant="outlined"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Stock"
              variant="outlined"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Rating"
              variant="outlined"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Continue">Continue</MenuItem>
                <MenuItem value="Discontinue">Discontinue</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Sale Status</InputLabel>
              <Select
                value={saleStatus}
                onChange={(e) => setSaleStatus(e.target.value)}
              >
                <MenuItem value="Trending">Trending</MenuItem>
                <MenuItem value="Popular">Popular</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Icon Upload */}
          <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
              Upload Icon
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleIcon}
              />
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.center}>
            <Avatar
              alt="Product Icon"
              src={icon.url}
              style={{ width: 80, height: 50 }}
              variant="square"
            />
          </Grid>

          {/* Multiple Pictures Upload */}
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Upload Product Pictures (Multiple)
              <input
                hidden
                accept="image/*"
                type="file"
                multiple
                onChange={handlePictures}
              />
            </Button>
          </Grid>

          {/* Display uploaded pictures with remove option */}
          {pictures.length > 0 && (
            <Grid item xs={12}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {pictures.map((picture, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <Avatar
                      src={picture.url}
                      style={{ width: 80, height: 80 }}
                      variant="square"
                    />
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => removePicture(index)}
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        minWidth: "20px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </Grid>
          )}

          <Grid item xs={6}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={handleReset}
              fullWidth
              variant="contained"
              color="primary"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
