import { Button, Grid } from "@material-ui/core";
import { useStyles } from "./DisplayAllSizeCss";
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
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

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

const sizeOptions = ["S", "M", "L", "XS", "XL", "XXL"];

export default function DisplayAllSize() {
  const classes = useStyles();
  const [dimensions, setDimensions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [dimensionId, setDimensionId] = useState("");
  const [dimensionValue, setDimensionValue] = useState([]);
  const [open, setOpen] = useState(false);

  const getIdString = (id) => {
    if (!id) return null;
    if (typeof id === "object" && id.timestamp) {
      return id.timestamp.toString();
    }
    return id.toString();
  };

  const handleSizeChange = (event) => {
    const { value } = event.target;
    setDimensionValue(typeof value === "string" ? value.split(",") : value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategoryId(selectedCategoryId);
    setSubCategoryId("");
    setProductId("");
  };

  const fetchAllProducts = async (subcategories) => {
    try {
      const allProductsPromises = subcategories.map(async (subcat) => {
        const body = { subcategoryid: getIdString(subcat.subcategoryid) };
        const result = await getData("api/products/display_all_product", body);
        return result?.data || [];
      });

      const allProductsArrays = await Promise.all(allProductsPromises);
      const flattenedProducts = allProductsArrays.flat();

      const uniqueProducts = flattenedProducts.filter(
        (product, index, self) =>
          index ===
          self.findIndex((p) => getIdString(p.id) === getIdString(product.id))
      );

      setAllProducts(uniqueProducts);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const fetchData = async () => {
    try {
      const categories = await getData("category/display_all_category");
      setCategoryList(categories?.categories || []);

      const subcategories = await getData("subcategory/all");
      setSubCategoryList(subcategories || []);

      const dimensions = await getData("api/dimensions/display_all_dimensions");
      setDimensions(dimensions || []);

      if (subcategories?.length > 0) {
        await fetchAllProducts(subcategories);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to load data", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFilteredSubCategories = () => {
    if (!categoryId) return [];
    return subCategoryList.filter(
      (sub) => getIdString(sub.categoryid) === getIdString(categoryId)
    );
  };

  const fetchProducts = async (subCatId, categoryId) => {
    try {
      const body = {
        subcategoryid: subCatId,
        categoryid: categoryId,
      };

      console.log("Fetching products with:", body); // Debug log

      const result = await postData("api/products/fetch_all_product", body);
      console.log("Products fetched:", result?.data); // Debug log

      setProductList(result?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductList([]);
    }
  };

  useEffect(() => {
    if (subCategoryId) fetchProducts(subCategoryId, categoryId);
  }, [subCategoryId]);

  const fillCategories = () =>
    categoryList.map((item) => (
      <MenuItem
        key={getIdString(item.categoryid)}
        value={getIdString(item.categoryid)}
      >
        {item.categoryname}
      </MenuItem>
    ));

  const fillSubCategories = () =>
    getFilteredSubCategories().map((item) => (
      <MenuItem
        key={getIdString(item.subcategoryid)}
        value={getIdString(item.subcategoryid)}
      >
        {item.subcategoryname}
      </MenuItem>
    ));

  const fillProducts = () =>
    productList.map((item) => (
      <MenuItem key={getIdString(item.id)} value={getIdString(item.id)}>
        {item.productname}
      </MenuItem>
    ));

  const handleOpen = async (rowData) => {
    const catId = getIdString(rowData.categoryid);
    const subCatId = getIdString(rowData.subcategoryid);
    const prodId = getIdString(rowData.productid);

    setDimensionId(getIdString(rowData.dimensionid));
    setCategoryId(catId);
    setSubCategoryId(subCatId);
    setProductId(prodId);
    setDimensionValue(rowData.dimension);

    // Fetch products based on the selected subcategory and category
    await fetchProducts(subCatId, catId);
    setOpen(true);
  };

  const handleEdit = async () => {
    const body = {
      dimensionid: dimensionId,
      categoryid: categoryId,
      subcategoryid: subCategoryId,
      productid: productId,
      dimension: dimensionValue, // Send as an array
    };

    console.log("Updating dimension with:", body); // Debug log

    try {
      const result = await postData("api/dimensions/edit_dimension_data", body);
      console.log("Update response:", result); // Debug log

      if (result?.dimensionid) {
        Swal.fire("Success", "Dimension updated successfully", "success");
        setOpen(false);
        fetchData(); // Refresh the data after updating
      } else {
        Swal.fire(
          "Error",
          result?.message || "Failed to update dimension",
          "error"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "An error occurred while updating", "error");
    }
  };

  const handleDelete = async (rowData) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this dimension!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const dimensionId = getIdString(rowData.dimensionid);
        const response = await fetch(
          `http://localhost:8080/api/dimensions/delete_dimension_data/${dimensionId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Important for cookies/sessions
          }
        );

        const result = await response.json();

        if (response.ok) {
          Swal.fire("Deleted!", result.message, "success");
          fetchData();
        } else {
          Swal.fire("Error", result.message || "Failed to delete", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "An error occurred while deleting", "error");
      }
    }
  };

  const displayTable = () => {
    const findName = (list, id, idField = "id", nameField = "name") => {
      if (!id) return "N/A";
      const item = list.find(
        (item) => getIdString(item[idField]) === getIdString(id)
      );
      return item ? item[nameField] : "N/A";
    };

    return (
      <MaterialTable
        title="Size Management"
        columns={[
          {
            title: "Category",
            render: (rowData) =>
              findName(
                categoryList,
                rowData.categoryid,
                "categoryid",
                "categoryname"
              ),
          },
          {
            title: "Sub Category",
            render: (rowData) =>
              findName(
                subCategoryList,
                rowData.subcategoryid,
                "subcategoryid",
                "subcategoryname"
              ),
          },
          {
            title: "Product",
            render: (rowData) => {
              const product = allProducts.find(
                (p) => getIdString(p.id) === getIdString(rowData.productid)
              );
              return product?.productname || "N/A";
            },
          },
          {
            title: "Size",
            render: (rowData) =>
              Array.isArray(rowData.dimension)
                ? rowData.dimension.join(", ")
                : rowData.dimension || "N/A",
          },
        ]}
        data={dimensions}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Size",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Size",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
        }}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {displayTable()}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryId}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput label="Category" />}
                  >
                    {fillCategories()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Sub Category</InputLabel>
                  <Select
                    value={subCategoryId}
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    input={<OutlinedInput label="Sub Category" />}
                    disabled={!categoryId}
                  >
                    {fillSubCategories()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    input={<OutlinedInput label="Product" />}
                    disabled={!subCategoryId}
                  >
                    {fillProducts()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select
                    multiple
                    value={dimensionValue}
                    onChange={handleSizeChange}
                    input={<OutlinedInput label="Size" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {sizeOptions.map((size) => (
                      <MenuItem key={size} value={size}>
                        <Checkbox checked={dimensionValue.indexOf(size) > -1} />
                        <ListItemText primary={size} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
