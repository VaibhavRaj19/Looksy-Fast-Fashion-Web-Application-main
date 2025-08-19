// DisplayAllColor.js
import { Button, Grid, TextField } from "@material-ui/core";
import { useStyles } from "./DisplayAllColorCss";
import MaterialTable from "@material-table/core";
import { getData, postData } from "../Services/NodeServices";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function DisplayAllColor() {
  const classes = useStyles();
  const navigate = useNavigate();

  // State
  const [colors, setColors] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState("");
  const [dimensionList, setDimensionList] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [colorId, setColorId] = useState("");
  const [color, setColor] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    try {
      const result = await getData("category/display_all_category");
      setCategoryList(result.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAllSubCategory = async (cid) => {
    try {
      const result = await getData(`subcategory/by-category/${cid}`);
      setSubCategoryList(result || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchAllProduct = async (cid, sid) => {
    try {
      const body = { categoryid: cid, subcategoryid: sid };
      const result = await postData("api/products/fetch_all_product", body);
      setProductList(result.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchAllSize = async (cid, sid, pid) => {
    try {
      setLoading(true);
      const body = { categoryid: cid, subcategoryid: sid, productid: pid };
      const result = await postData(
        "api/dimensions/fetch_all_dimensions",
        body
      );

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

  const handleCategoryChange = async (event) => {
    const value = event.target.value;
    setCategoryId(value);
    await fetchAllSubCategory(value);
    setSubCategoryId("");
    setProductId("");
    setSelectedDimension(null);
    setSelectedSize("");
    setProductList([]);
    setDimensionList([]);
  };

  const handleSubCategoryChange = async (event) => {
    const value = event.target.value;
    setSubCategoryId(value);
    await fetchAllProduct(categoryId, value);
    setProductId("");
    setSelectedDimension(null);
    setSelectedSize("");
    setDimensionList([]);
  };

  const handleProductChange = async (event) => {
    const value = event.target.value;
    setProductId(value);
    await fetchAllSize(categoryId, subCategoryId, value);
    setSelectedDimension(null);
    setSelectedSize("");
  };

  const handleSizeChange = (event) => {
    const sizeValue = event.target.value;
    setSelectedSize(sizeValue);

    const dimension = dimensionList.find(
      (dim) => dim.dimension && dim.dimension.includes(sizeValue)
    );
    setSelectedDimension(dimension);
  };

  const handleEditColor = async () => {
    if (
      !categoryId ||
      !subCategoryId ||
      !productId ||
      !selectedSize ||
      !color
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields",
      });
      return;
    }

    try {
      const body = {
        productid: productId,
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        size: selectedSize,
        sizeid: selectedDimension ? selectedDimension.dimensionid : null,
        color: color,
        colorCode: colorCode,
        colorid: colorId,
      };

      const result = await postData("api/colors/edit_color_data", body);

      if (result.status || result.colorid) {
        Swal.fire({
          icon: "success",
          title: "Record Updated Successfully",
        });
        setOpen(false);
        fetchAllColor();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error updating color:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update color",
      });
    }
  };

  const handleDeleteColor = async () => {
    setOpen(false);

    Swal.fire({
      title: "Do you want to delete the Color?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const body = { colorid: colorId };
          const result = await postData("api/colors/delete_color_data", body);

          if (
            result.status ||
            result.message === "Color deleted successfully."
          ) {
            Swal.fire("Deleted!", "", "success");
            fetchAllColor();
          } else {
            Swal.fire("Server Error!", result.message || "", "error");
          }
        } catch (error) {
          console.error("Error deleting color:", error);
          Swal.fire("Error!", "Failed to delete color", "error");
        }
      } else if (res.isDenied) {
        Swal.fire("Color is not deleted", "", "info");
      }
    });
  };

  const handleOpen = async (rowData) => {
    setColorId(rowData.colorid);
    setCategoryId(rowData.categoryid);
    setSubCategoryId(rowData.subcategoryid);
    setProductId(rowData.productid);
    setSelectedSize(rowData.size);
    setColor(rowData.color);
    setColorCode(rowData.colorCode || "");

    // Fetch related data
    await fetchAllSubCategory(rowData.categoryid);
    await fetchAllProduct(rowData.categoryid, rowData.subcategoryid);
    await fetchAllSize(
      rowData.categoryid,
      rowData.subcategoryid,
      rowData.productid
    );

    // Set the dimension if available
    if (rowData.sizeid) {
      const dimension = dimensionList.find(
        (dim) => dim.dimensionid === rowData.sizeid
      );
      setSelectedDimension(dimension);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryId("");
    setSubCategoryId("");
    setProductId("");
    setSelectedSize("");
    setSelectedDimension(null);
    setColor("");
    setColorCode("");
    setColorId("");
  };

  const fetchAllColor = async () => {
    try {
      const result = await getData("api/colors/display_all_color");

      const processedColors = await Promise.all(
        (result || []).map(async (colorItem) => {
          const category = categoryList.find(
            (cat) => cat.categoryid === colorItem.categoryid
          );

          const allSubCategories = await getData("subcategory/all");
          const subcategory = allSubCategories.find(
            (sub) => sub.subcategoryid === colorItem.subcategoryid
          );

          let productName = "Unknown Product";
          if (colorItem.categoryid && colorItem.subcategoryid) {
            try {
              const productResult = await postData(
                "api/products/fetch_all_product",
                {
                  categoryid: colorItem.categoryid,
                  subcategoryid: colorItem.subcategoryid,
                }
              );
              const product = productResult.data?.find(
                (prod) => prod.id === colorItem.productid
              );
              if (product) {
                productName = product.productname;
              }
            } catch (error) {
              console.error("Error fetching product name:", error);
            }
          }

          return {
            ...colorItem,
            categoryName: category?.categoryname || "Unknown Category",
            subcategoryName:
              subcategory?.subcategoryname || "Unknown Subcategory",
            productName: productName,
          };
        })
      );

      setColors(processedColors);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  useEffect(() => {
    fetchAllColor();
  }, [categoryList]);

  const fillCategories = () => {
    return categoryList.map((item) => (
      <MenuItem key={item.categoryid} value={item.categoryid}>
        {item.categoryname}
      </MenuItem>
    ));
  };

  const fillSubCategories = () => {
    return subCategoryList.map((item) => (
      <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
        {item.subcategoryname}
      </MenuItem>
    ));
  };

  const fillProducts = () => {
    return productList.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        {item.productname}
      </MenuItem>
    ));
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

  const showColor = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Grid container className={classes.gridStyle} spacing={2}>
            <Grid item xs={12} className={classes.headingText}>
              Edit Color
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
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
                <InputLabel id="subcategory-select-label">
                  SubCategory
                </InputLabel>
                <Select
                  labelId="subcategory-select-label"
                  id="subcategory-select"
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
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product-select"
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
                <InputLabel id="size-select-label">Size</InputLabel>
                <Select
                  labelId="size-select-label"
                  id="size-select"
                  value={selectedSize}
                  label="Size"
                  onChange={handleSizeChange}
                  disabled={!productId || loading || dimensionList.length === 0}
                >
                  <MenuItem value="">Choose Size</MenuItem>
                  {fillSizes()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Color Name"
                fullWidth
                value={color}
                onChange={(event) => setColor(event.target.value)}
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
                onClick={handleEditColor}
                fullWidth
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={handleDeleteColor}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  function displayAllColor() {
    return (
      <MaterialTable
        title="List Of Colors"
        columns={[
          { title: "Category", field: "categoryName", width: "15%" },
          { title: "Subcategory", field: "subcategoryName", width: "15%" },
          { title: "Product", field: "productName", width: "20%" },
          { title: "Size", field: "size", width: "10%" },
          { title: "Color", field: "color", width: "15%" },
          {
            title: "Color Code",
            field: "colorCode",
            width: "15%",
            render: (rowData) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                {rowData.colorCode && (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: rowData.colorCode,
                      marginRight: 8,
                      border: "1px solid #ccc",
                      borderRadius: 3,
                    }}
                  />
                )}
                {rowData.colorCode || "N/A"}
              </div>
            ),
          },
        ]}
        data={colors}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Color",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Color",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/color"),
          },
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [5, 10, 20],
          search: true,
          sorting: true,
        }}
      />
    );
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>{displayAllColor()}</div>
      {showColor()}
    </div>
  );
}
