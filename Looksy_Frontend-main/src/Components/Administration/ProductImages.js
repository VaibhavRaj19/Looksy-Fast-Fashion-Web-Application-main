import { useStyles } from "./ProductImagesCss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { DropzoneArea } from "material-ui-dropzone";
import { useState, useEffect } from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ImageSlider from "../../Components/UserInterface/UserComponents/ImageSlider";

export default function ProductImages(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState("");
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCategory = async () => {
    try {
      const result = await getData("category/display_all_category");
      setCategoryList(result.data || []);
    } catch (error) {
      console.error("Category fetch error:", error);
      Swal.fire("Error", "Failed to load categories", "error");
    }
  };

  const fetchAllSubCategory = async (cid) => {
    try {
      const result = await postData("subcategory/all", {
        categoryid: cid,
      });
      setSubCategoryList(result.data || []);
    } catch (error) {
      console.error("Subcategory fetch error:", error);
      Swal.fire("Error", "Failed to load subcategories", "error");
    }
  };

  const fetchAllProduct = async (cid, sid) => {
    if (!cid || !sid) return;

    try {
      setLoading(true);
      const result = await postData("api/products/fetch_all_product", {
        categoryid: cid,
        subcategoryid: sid,
      });

      setProductList(
        result.data.map((product) => ({
          ...product,
          categoryid: cid,
          subcategoryid: sid,
        })) || []
      );
    } catch (error) {
      console.error("Product fetch error:", error);
      Swal.fire("Error", "Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductImages = async (cid, sid, pid) => {
    if (!cid || !sid || !pid) return;

    try {
      setLoading(true);
      const result = await postData("api/products/fetchallpictures", {
        categoryid: cid,
        subcategoryid: sid,
        productid: pid,
      });

      setExistingImages(result?.data || []);
    } catch (error) {
      console.error("Image fetch error:", error);
      Swal.fire("Error", "Failed to load product images", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    const cid = event.target.value;
    setCategoryId(cid);
    setSubCategoryId("");
    setProductId("");
    setFiles([]);
    setExistingImages([]);
    if (cid) fetchAllSubCategory(cid);
  };

  const handleSubCategoryChange = (event) => {
    const sid = event.target.value;
    setSubCategoryId(sid);
    setProductId("");
    setFiles([]);
    setExistingImages([]);
    if (sid && categoryId) fetchAllProduct(categoryId, sid);
  };

  const handleProductChange = (event) => {
    const pid = event.target.value;
    setProductId(pid);
    if (pid && categoryId && subCategoryId) {
      fetchProductImages(categoryId, subCategoryId, pid);
    }
  };

  const handleSubmit = async () => {
    if (!categoryId || !subCategoryId || !productId) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Selection",
        text: "Please select category, subcategory and product",
      });
      return;
    }

    if (files.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Images Selected",
        text: "Please select at least one image to upload",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryid", subCategoryId);
      formData.append("productid", productId);

      files.forEach((file) => {
        formData.append("picture", file);
      });

      const result = await postData(
        "product/add_product_images",
        formData,
        true
      );

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Images Uploaded Successfully!",
        });
        fetchProductImages(categoryId, subCategoryId, productId);
        setFiles([]);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2} className={classes.gridStyle}>
          <Grid item xs={12}>
            <div className={classes.headingText}>Product Images Interface</div>
          </Grid>

          {/* Category Dropdown */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                onChange={handleCategoryChange}
                disabled={loading}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categoryList.map((item) => (
                  <MenuItem key={item.categoryid} value={item.categoryid}>
                    {item.categoryname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Subcategory Dropdown */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Sub Category</InputLabel>
              <Select
                value={subCategoryId}
                onChange={handleSubCategoryChange}
                disabled={!categoryId || loading}
              >
                <MenuItem value="">Select Sub Category</MenuItem>
                {subCategoryList.map((item) => (
                  <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
                    {item.subcategoryname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Product Dropdown */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={productId}
                onChange={handleProductChange}
                disabled={!subCategoryId || loading}
              >
                <MenuItem value="">Select Product</MenuItem>
                {productList.map((item) => (
                  <MenuItem key={item.productid} value={item.productid}>
                    {item.productname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Image Preview Section */}
          <Grid item xs={12}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <CircularProgress />
              </div>
            ) : productId ? (
              <ImageSlider
                productid={productId}
                categoryid={categoryId}
                subcategoryid={subCategoryId}
              />
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                Select a product to view images
              </div>
            )}
          </Grid>

          {/* Image Upload Section */}
          <Grid item xs={12}>
            <DropzoneArea
              onChange={(files) => setFiles(files)}
              acceptedFiles={["image/*"]}
              filesLimit={10}
              maxFileSize={5000000}
              showPreviews={true}
              showPreviewsInDropzone={false}
              dropzoneText="Drag and drop product images here or click"
              disabled={!productId || loading}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={files.length === 0 || loading}
            >
              {loading ? "Uploading..." : "Upload Images"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => setFiles([])}
              disabled={files.length === 0 || loading}
            >
              Clear Selection
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
