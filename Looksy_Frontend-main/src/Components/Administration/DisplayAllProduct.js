import { TextField, Button, Grid, Avatar } from "@material-ui/core";
import { useStyles } from "./DisplayAllProductCss";
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

export default function DisplayAllProduct() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
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
  const [open, setOpen] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false);
  const [uploadBtn, setUploadBtn] = useState(false);
  const [oldIcon, setOldIcon] = useState("");
  const [oldPic, setOldPic] = useState("");

  const fetchAllCategory = async () => {
    try {
      const result = await getData("category/display_all_category");
      setCategoryList(result.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAllSubCategories = async () => {
    try {
      const result = await getData("subcategory/all");
      setSubCategoryList(result || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchAllProduct = async () => {
    try {
      const result = await getData("api/products/display_all_product");
      if (result && result.data) {
        setProducts(result.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllSubCategories();
    fetchAllProduct();
  }, []);

  const extractObjectId = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    if (obj.$oid) return obj.$oid;
    if (obj.timestamp) {
      return obj.timestamp.toString(16).padEnd(24, "0");
    }
    return "";
  };

  const getCategoryName = (categoryIdObj) => {
    if (!categoryIdObj) return "N/A";

    const categoryIdStr = extractObjectId(categoryIdObj);
    const category = categoryList.find(
      (cat) => extractObjectId(cat.categoryid) === categoryIdStr
    );

    return category ? category.categoryname : "N/A";
  };

  const getSubCategoryName = (subCategoryIdObj) => {
    if (!subCategoryIdObj) return "N/A";

    const subCategoryIdStr = extractObjectId(subCategoryIdObj);
    const subCategory = subCategoryList.find(
      (subCat) => extractObjectId(subCat.subcategoryid) === subCategoryIdStr
    );

    return subCategory ? subCategory.subcategoryname : "N/A";
  };

  const handleCategoryChange = async (event) => {
    setCategoryId(event.target.value);
  };

  const fillCategories = () => {
    return categoryList.map((item) => (
      <MenuItem key={item.categoryid} value={item.categoryid}>
        {item.categoryname}
      </MenuItem>
    ));
  };

  const handleSubCategoryChange = (event) => {
    setSubCategoryId(event.target.value);
  };

  const fillSubCategories = () => {
    const filteredSubCategories = subCategoryList.filter(
      (subCat) =>
        extractObjectId(subCat.categoryid) === extractObjectId(categoryId)
    );

    return filteredSubCategories.map((item) => (
      <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
        {item.subcategoryname}
      </MenuItem>
    ));
  };

  const handleIcon = (event) => {
    setBtnStatus(true);
    setUploadBtn(true);
    setIcon({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleOpen = (rowData) => {
    const extractedProductId = extractObjectId(rowData.id);
    const extractedCategoryId = extractObjectId(rowData.categoryid);
    const extractedSubCategoryId = extractObjectId(rowData.subcategoryid);

    setProductId(extractedProductId);
    setCategoryId(extractedCategoryId);
    setSubCategoryId(extractedSubCategoryId);
    setProductName(rowData.productname || "");
    setPrice(rowData.price || "");
    setOfferPrice(rowData.offerprice || "");
    setStock(rowData.stock || "");
    setDescription(rowData.description || "");
    setRating(rowData.rating || "");
    setStatus(rowData.status || "");
    setSaleStatus(rowData.salestatus || "");

    setIcon({
      url: rowData.icon || "/icon.png",
      bytes: "",
    });
    setOldIcon(rowData.icon || "");
    setOldPic(rowData.icon || "");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBtnStatus(false);
    setUploadBtn(false);
  };

  const handleCancel = () => {
    setIcon({ url: oldIcon || "/icon.png", bytes: "" });
    setUploadBtn(false);
    setBtnStatus(false);
  };

  const handleEditProduct = async () => {
    setOpen(false);

    const formData = new FormData();
    const productData = {
      id: productId, // Changed from productid to id to match backend
      categoryid: extractObjectId(categoryId),
      subcategoryid: extractObjectId(subCategoryId),
      productname: productName,
      price: price,
      offerprice: offerPrice,
      stock: stock,
      description: description,
      rating: rating,
      status: status,
      salestatus: saleStatus,
    };

    formData.append("data", JSON.stringify(productData));

    // Add icon if user uploaded a new one
    if (icon.bytes) {
      formData.append("icon", icon.bytes);
    }

    try {
      const result = await postData(
        "api/products/edit_product_data",
        formData,
        true
      );
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Record Updated Successfully",
        });
        fetchAllProduct();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product",
      });
    }
  };

  const handleDeleteProduct = async () => {
    setOpen(false);
    Swal.fire({
      title: "Do you want to delete the Product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const body = { productid: productId };
        try {
          const result = await postData(
            "api/products/delete_product_data",
            body
          );
          if (result.status) {
            Swal.fire("Deleted!", "", "success");
            fetchAllProduct();
          } else {
            Swal.fire(
              "Server Error!",
              result.error || "Something went wrong!",
              "error"
            );
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error!", "Failed to delete product", "error");
        }
      } else if (res.isDenied) {
        Swal.fire("Product was not deleted", "", "info");
      }
    });
  };

  const handleSavePicture = async () => {
    setOpen(false);
    const formData = new FormData();
    formData.append("productid", productId);
    formData.append("icon", icon.bytes);

    try {
      const result = await postData("api/products/update_icon", formData, true);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Picture Updated Successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error updating picture:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update picture",
      });
    }
    setUploadBtn(false);
    setBtnStatus(false);
    setOldIcon("");
    fetchAllProduct();
  };

  const saveAndCancelButton = () => {
    if (!btnStatus) return null;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "110%",
        }}
      >
        <Button color="primary" onClick={handleSavePicture} variant="contained">
          Save
        </Button>
        <Button onClick={handleCancel} color="secondary" variant="contained">
          Cancel
        </Button>
      </div>
    );
  };

  const showProduct = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Grid container spacing={2} className={classes.gridStyle}>
          <Grid item xs={12} className={classes.headingText}>
            Edit Product
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
              >
                <MenuItem value="">Choose SubCategory</MenuItem>
                {fillSubCategories()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={productName}
              label="Product Name"
              onChange={(event) => setProductName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={price}
              type="number"
              label="Price"
              onChange={(event) => setPrice(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={offerPrice}
              type="number"
              label="Offer Price"
              onChange={(event) => setOfferPrice(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={stock}
              type="number"
              label="Stock"
              onChange={(event) => setStock(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={rating}
              type="number"
              label="Rating"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              onChange={(event) => setRating(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={description}
              label="Description"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(event) => setStatus(event.target.value)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Sale Status</InputLabel>
              <Select
                value={saleStatus}
                label="Sale Status"
                onChange={(event) => setSaleStatus(event.target.value)}
              >
                <MenuItem value="On Sale">On Sale</MenuItem>
                <MenuItem value="Not On Sale">Not On Sale</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
              Upload Icon
              <input
                type="file"
                hidden
                onChange={handleIcon}
                accept="image/*"
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Avatar src={icon.url} style={{ width: 50, height: 50 }} />
            {saveAndCancelButton()}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditProduct} color="primary" variant="contained">
          Update Product
        </Button>
        <Button
          onClick={handleDeleteProduct}
          color="secondary"
          variant="contained"
        >
          Delete Product
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  const displayAllProduct = () => (
    <MaterialTable
      title="List Of Product"
      columns={[
        {
          title: "Category/SubCategory",
          render: (rowData) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <strong>Category:</strong> {getCategoryName(rowData.categoryid)}
              </div>
              <div>
                <strong>SubCategory:</strong>{" "}
                {getSubCategoryName(rowData.subcategoryid)}
              </div>
            </div>
          ),
        },
        { title: "Name", field: "productname" },
        {
          title: "Price",
          render: (rowData) => (
            <div>
              {rowData.offerprice && rowData.offerprice > 0 ? (
                <>
                  <div>
                    <b>Price:</b> <s>₹{rowData.price}</s>
                  </div>
                  <div>
                    <b>Offer:</b> ₹{rowData.offerprice}
                  </div>
                </>
              ) : (
                <div>₹{rowData.price}</div>
              )}
            </div>
          ),
        },
        { title: "Stock", field: "stock" },
        {
          title: "Description",
          field: "description",
          render: (rowData) => (
            <div style={{ maxWidth: "200px", wordWrap: "break-word" }}>
              {rowData.description}
            </div>
          ),
        },
        { title: "Rating", field: "rating" },
        {
          title: "Status",
          render: (rowData) => (
            <div>
              <div>
                <strong>Status:</strong> {rowData.status}
              </div>
              <div>
                <strong>Sale:</strong> {rowData.salestatus}
              </div>
            </div>
          ),
        },
        {
          title: "Icon",
          render: (rowData) => (
            <img
              src={rowData.icon || "/icon.png"}
              width="50"
              height="50"
              style={{ borderRadius: 5 }}
              alt="icon"
              onError={(e) => {
                e.target.src = "/icon.png";
              }}
            />
          ),
        },
      ]}
      data={products}
      actions={[
        {
          icon: "edit",
          tooltip: "Edit",
          onClick: (event, rowData) => handleOpen(rowData),
        },
        {
          icon: "add",
          tooltip: "Add Product",
          isFreeAction: true,
          onClick: () => navigate("/dashboard/product"),
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

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>{displayAllProduct()}</div>
      {showProduct()}
    </div>
  );
}
