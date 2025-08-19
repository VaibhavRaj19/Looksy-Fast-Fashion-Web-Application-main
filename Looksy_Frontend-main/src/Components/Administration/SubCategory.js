import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useStyles } from "./SubCategoryCss"; // Your CSS styles
import { getData, postData } from "../Services/NodeServices"; // Your API service
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function SubCategory(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryIcon, setSubCategoryIcon] = useState({
    url: "/icon.png",
    bytes: "",
  });
  const [bannerPriority, setBannerPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle file upload for icon
  const handleIcon = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select an image smaller than 5MB",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select an image file",
        });
        return;
      }

      setSubCategoryIcon({
        url: URL.createObjectURL(file),
        bytes: file,
      });
      setErrors((prev) => ({ ...prev, icon: "" }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    if (!subCategoryName.trim()) {
      newErrors.subCategoryName = "SubCategory name is required";
    } else if (subCategoryName.trim().length < 2) {
      newErrors.subCategoryName =
        "SubCategory name must be at least 2 characters";
    }

    if (!bannerPriority) {
      newErrors.bannerPriority = "Please select a priority";
    }

    if (!subCategoryIcon.bytes) {
      newErrors.icon = "Please upload an icon";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix all errors before submitting",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      const subcategoryData = {
        categoryid: categoryId,
        subcategoryname: subCategoryName.trim(),
        bannerpriority: bannerPriority,
      };

      formData.append("subcategoryData", JSON.stringify(subcategoryData));
      formData.append("icon", subCategoryIcon.bytes);

      console.log("Submitting subcategory with data:", {
        categoryid: categoryId,
        subcategoryname: subCategoryName.trim(),
        bannerpriority: bannerPriority,
        hasIcon: !!subCategoryIcon.bytes,
      });

      const result = await postData("subcategory/add", formData, true);
      console.log("Submission result:", result);

      if (result && result.status === true) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "SubCategory added successfully",
        });
        handleReset();
      } else {
        console.error("Submission failed:", result);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result.error || result.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setCategoryId("");
    setSubCategoryName("");
    setSubCategoryIcon({ url: "/icon.png", bytes: "" });
    setBannerPriority("");
    setErrors({});
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    setErrors((prev) => ({ ...prev, categoryId: "" }));
  };

  // Handle subcategory name change
  const handleSubCategoryNameChange = (event) => {
    setSubCategoryName(event.target.value);
    setErrors((prev) => ({ ...prev, subCategoryName: "" }));
  };

  // Handle priority change
  const handlePriorityChange = (event) => {
    setBannerPriority(event.target.value);
    setErrors((prev) => ({ ...prev, bannerPriority: "" }));
  };

  // Fetch all categories
  const fetchAllCategory = async () => {
    try {
      const result = await getData("category/display_all_category");
      if (result && Array.isArray(result)) {
        setCategoryList(result);
      } else if (result && result.status && result.categories) {
        setCategoryList(result.categories);
      } else {
        setCategoryList([]);
        Swal.fire({
          icon: "warning",
          title: "No Categories Found",
          text: "Please add categories first before creating subcategories",
        });
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
      setCategoryList([]);
      Swal.fire({
        icon: "error",
        title: "Error Loading Categories",
        text: `Failed to load categories: ${error.message || error}`,
      });
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  // Render category options
  const fillCategories = () => {
    if (!categoryList || categoryList.length === 0) {
      return (
        <MenuItem disabled>
          <em>No categories available</em>
        </MenuItem>
      );
    }

    return categoryList.map((item) => (
      <MenuItem key={item.categoryid} value={item.categoryid}>
        {item.categoryname}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.maincontainer}>
      <Paper className={classes.box} elevation={3}>
        <Grid container spacing={3} className={classes.gridStyle}>
          {/* Header */}
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" className={classes.headingText}>
              SubCategory Interface
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Avatar
              src={"/report.png"}
              style={{
                width: 40,
                height: 40,
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
              onClick={() => navigate("/dashboard/displayallsubcategory")}
              variant="square"
            />
          </Grid>

          {/* Category Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.categoryId}>
              <InputLabel id="category-select-label">Category *</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={categoryId}
                label="Category *"
                onChange={handleCategoryChange}
                disabled={categoryList.length === 0}
              >
                {fillCategories()}
              </Select>
              {errors.categoryId && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors.categoryId}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* SubCategory Name */}
          <Grid item xs={12} md={6}>
            <TextField
              value={subCategoryName}
              onChange={handleSubCategoryNameChange}
              variant="outlined"
              fullWidth
              label="SubCategory Name *"
              error={!!errors.subCategoryName}
              helperText={errors.subCategoryName}
              placeholder="Enter subcategory name"
            />
          </Grid>

          {/* Priority Selection */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.bannerPriority}>
              <InputLabel id="priority-select-label">Priority *</InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={bannerPriority}
                label="Priority *"
                onChange={handlePriorityChange}
              >
                {[1, 2, 3, 4, 5].map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
              {errors.bannerPriority && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors.bannerPriority}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* File Upload */}
          <Grid item xs={12} md={6} className={classes.center}>
            <Button
              variant="contained"
              component="label"
              color="primary"
              fullWidth
              sx={{ height: 56 }}
            >
              Upload Icon *
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleIcon}
              />
            </Button>
            {errors.icon && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, display: "block" }}
              >
                {errors.icon}
              </Typography>
            )}
          </Grid>

          {/* Icon Preview */}
          <Grid item xs={12} md={6} className={classes.center}>
            <Avatar
              alt="SubCategory Icon"
              src={subCategoryIcon.url}
              sx={{
                width: 80,
                height: 80,
                border: errors.icon ? "2px solid red" : "2px solid #e0e0e0",
              }}
              variant="square"
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} md={6}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ height: 48 }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={handleReset}
              fullWidth
              variant="outlined"
              color="secondary"
              disabled={loading}
              sx={{ height: 48 }}
            >
              Reset
            </Button>
          </Grid>

          {/* Debug Info (Remove in production) */}
          {process.env.NODE_ENV === "development" && (
            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">
                Debug: Categories loaded: {categoryList.length} | Selected
                Category: {categoryId} | SubCategory: {subCategoryName}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
}
