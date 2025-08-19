import { Grid, Button, Avatar, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useStyles } from "./ColorCss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getData, postData } from "../Services/NodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function Color() {
  const classes = useStyles();
  const navigate = useNavigate();

  // State
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState("");
  const [dimensionList, setDimensionList] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [colorCode, setColorCode] = useState("#000000");
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    try {
      setLoading(true);
      const result = await getData("category/display_all_category");
      setCategoryList(result.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load categories",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSubCategory = async (cid) => {
    try {
      setLoading(true);
      const result = await getData(`subcategory/by-category/${cid}`);
      setSubCategoryList(result || []);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    } finally {
      setLoading(false);
    }
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

  const fetchAllSize = async (cid, sid, pid) => {
    try {
      setLoading(true);
      const body = { categoryid: cid, subcategoryid: sid, productid: pid };
      console.log("Request body:", body); // Debug log

      const result = await postData(
        "api/dimensions/fetch_all_dimensions",
        body
      );
      console.log("Response received:", result); // Debug log

      if (Array.isArray(result)) {
        setDimensionList(result);
      } else if (result?.data && Array.isArray(result.data)) {
        setDimensionList(result.data);
      } else {
        console.error("Unexpected dimension response format:", result);
        setDimensionList([]);
      }
    } catch (error) {
      console.error("Failed to fetch dimensions:", error);
      setDimensionList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategoryId(value);
    fetchAllSubCategory(value);
    setSubCategoryId("");
    setProductId("");
    setSelectedDimension(null);
    setSelectedSize("");
    setProductList([]);
    setDimensionList([]);
  };

  const handleSubCategoryChange = (event) => {
    const value = event.target.value;
    setSubCategoryId(value);
    fetchAllProduct(categoryId, value);
    setProductId("");
    setSelectedDimension(null);
    setSelectedSize("");
    setDimensionList([]);
  };

  const handleProductChange = (event) => {
    const value = event.target.value;
    setProductId(value);
    fetchAllSize(categoryId, subCategoryId, value);
    setSelectedDimension(null);
    setSelectedSize("");
  };

  const handleSizeChange = (event) => {
    const sizeValue = event.target.value;
    setSelectedSize(sizeValue);

    const dimension = dimensionList.find((dim) =>
      dim.dimension.includes(sizeValue)
    );
    setSelectedDimension(dimension);
  };

  

  const handleSubmit = async () => {
    try {
      if (
        !categoryId ||
        !subCategoryId ||
        !productId ||
        !selectedSize ||
        !selectedDimension ||
        !color ||
        !colorCode
      ) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Please fill all required fields",
        });
        return;
      }

      const body = {
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        productid: productId,
        dimensionid: selectedDimension.dimensionid,
        size: selectedSize,
        sizeid: selectedDimension.dimensionid,
        color: color,
        colorCode: colorCode,
      };

      console.log("Submitting color with body:", body); // Debug log
      const result = await postData("api/colors/add_new_color", body);

      if (result.colorid) {
        Swal.fire({
          icon: "success",
          title: "Color Added Successfully",
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
      console.error("Error during submission:", error); // Debug log
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add color. Please try again.",
      });
    }
  };

  const handleReset = () => {
    setCategoryId("");
    setSubCategoryId("");
    setProductId("");
    setSelectedSize("");
    setSelectedDimension(null);
    setColor("");
    setColorCode("#000000");
    setSubCategoryList([]);
    setProductList([]);
    setDimensionList([]);
  };

  const fillCategories = () => {
    return categoryList.map((item) => (
      <MenuItem
        key={item._id || item.categoryid}
        value={item._id || item.categoryid}
      >
        {item.categoryname}
      </MenuItem>
    ));
  };

  const fillSubCategories = () => {
    return subCategoryList.map((item) => (
      <MenuItem
        key={item._id || item.subcategoryid}
        value={item._id || item.subcategoryid}
      >
        {item.subcategoryname}
      </MenuItem>
    ));
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

  const fillSizes = () => {
    const allSizes = new Set();

    dimensionList.forEach((dimension) => {
      if (dimension.dimension && Array.isArray(dimension.dimension)) {
        dimension.dimension.forEach((size) => {
          allSizes.add(size);
        });
      }
    });

    return Array.from(allSizes).map((size) => (
      <MenuItem key={size} value={size}>
        {size}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container className={classes.gridStyle} spacing={2}>
          <Grid item xs={12} style={{ display: "flex" }}>
            <div className={classes.headingText}>Color Interface</div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "70%",
              }}
            >
              <Avatar
                src={"/report.png"}
                variant="square"
                style={{ width: 39 }}
                onClick={() => navigate("/dashboard/displayallcolor")}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                onChange={handleCategoryChange}
                disabled={loading}
              >
                <MenuItem disabled value="">
                  Choose Category
                </MenuItem>
                {fillCategories()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>SubCategory</InputLabel>
              <Select
                value={subCategoryId}
                onChange={handleSubCategoryChange}
                disabled={!categoryId || loading}
              >
                <MenuItem disabled value="">
                  Choose SubCategory
                </MenuItem>
                {fillSubCategories()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={productId}
                onChange={handleProductChange}
                disabled={!subCategoryId || loading}
              >
                <MenuItem disabled value="">
                  Choose Product
                </MenuItem>
                {fillProducts()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                onChange={handleSizeChange}
                disabled={!productId || loading || dimensionList.length === 0}
              >
                <MenuItem disabled value="">
                  Choose Size
                </MenuItem>
                {fillSizes()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={color}
              variant="outlined"
              label="Color Name"
              fullWidth
              onChange={(e) => setColor(e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Color Code"
              variant="outlined"
              fullWidth
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <input
                    type="color"
                    value={colorCode}
                    onChange={(e) => setColorCode(e.target.value)}
                    style={{
                      width: 40,
                      height: 40,
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      marginLeft: 8,
                    }}
                    disabled={loading}
                  />
                ),
              }}
              placeholder="#000000"
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleReset}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
