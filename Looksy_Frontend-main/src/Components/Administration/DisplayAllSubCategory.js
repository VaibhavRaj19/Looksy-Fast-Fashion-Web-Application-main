import { TextField, Button, Grid, Avatar } from "@material-ui/core";
import { useStyles } from "./DisplayAllSubCategoryCss";
import { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "@material-table/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

export default function DisplayAllSubCategory() {
  const classes = useStyles();

  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryIcon, setSubCategoryIcon] = useState({
    url: "/icon.png",
    bytes: null,
  });
  const [bannerPriority, setBannerPriority] = useState("");
  const [open, setOpen] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false);
  const [uploadBtn, setUploadBtn] = useState(false);
  const [oldIcon, setOldIcon] = useState("");
  const [oldPic, setOldPic] = useState("");

  // Handle icon upload (file input change)
  const handleIcon = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSubCategoryIcon({
        url: URL.createObjectURL(file),
        bytes: file,
      });
      setBtnStatus(true);
      setUploadBtn(true);
    }
  };

  // Fetch all subcategories
  const fetchAllSubCategory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/subcategory/all");
      if (res.data) {
        setSubCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Fetch all categories
  const fetchAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/category/display_all_category"
      );
      if (res.data.status && Array.isArray(res.data.categories)) {
        setCategoryList(res.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Edit subcategory with multipart form data
  const handleEditSubCategory = async () => {
    setOpen(false);

    try {
      const formData = new FormData();
      formData.append(
        "subcategoryData",
        JSON.stringify({
          categoryid: categoryId,
          subcategoryid: subCategoryId,
          subcategoryname: subCategoryName,
          bannerpriority: bannerPriority,
          oldIcon: oldPic,
        })
      );

      if (subCategoryIcon.bytes) {
        formData.append("icon", subCategoryIcon.bytes);
      }

      const res = await axios.post(
        "http://localhost:8080/subcategory/edit_subcategory_data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: "Record Updated Successfully",
        });
        fetchAllSubCategory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // Delete subcategory
  const handleDeleteSubCategory = async () => {
    setOpen(false);
    Swal.fire({
      title: "Do you want to delete the subcategory?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const result = await axios.post(
            `http://localhost:8080/subcategory/delete/${subCategoryId}`
          );
          if (result.data.status) {
            Swal.fire("Deleted!", "", "success");
            fetchAllSubCategory();
          } else {
            Swal.fire("Server Error!", "", "error");
          }
        } catch (error) {
          Swal.fire("Server Error!", "", "error");
        }
      } else if (res.isDenied) {
        Swal.fire("SubCategory not deleted", "", "info");
      }
    });
  };

  // Open dialog and fill values for editing
  const handleOpen = async (rowData) => {
    if (categoryList.length === 0) {
      await fetchAllCategory();
    }
    setSubCategoryId(rowData.subcategoryid);
    setCategoryId(rowData.categoryid.toString());
    setSubCategoryName(rowData.subcategoryname);
    setSubCategoryIcon({
      url: rowData.subcategoryicon,
      bytes: null,
    });
    setOldIcon(rowData.subcategoryicon);
    setOldPic(rowData.subcategoryicon);
    setBannerPriority(rowData.bannerpriority);
    setBtnStatus(false);
    setUploadBtn(false);
    setOpen(true);
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllSubCategory();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setSubCategoryIcon({ url: oldIcon, bytes: null });
    setBtnStatus(false);
    setUploadBtn(false);
  };

  const fillCategories = () =>
    categoryList.map((item) => (
      <MenuItem key={item.categoryid} value={item.categoryid.toString()}>
        {item.categoryname}
      </MenuItem>
    ));

  const showSubCategory = () => (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Grid container spacing={2} className={classes.gridStyle}>
          <Grid item xs={12} className={classes.headingText}>
            Edit SubCategory
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={categoryId || ""}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <MenuItem disabled value="">
                  <em>Select Category</em>
                </MenuItem>
                {fillCategories()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              variant="outlined"
              fullWidth
              label="SubCategory Name"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="priority-select-label">Priority</InputLabel>
              <Select
                labelId="priority-select-label"
                value={bannerPriority}
                onChange={(e) => setBannerPriority(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleEditSubCategory}
              fullWidth
              variant="contained"
              color="primary"
              disabled={btnStatus} // disable if a new file is uploaded, so user clicks Save button instead
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleDeleteSubCategory}
              fullWidth
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.center}>
            <Button
              disabled={uploadBtn}
              color="primary"
              variant="contained"
              component="label"
              fullWidth
            >
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleIcon}
              />
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.center}>
            <Avatar
              alt="SubCategory Icon"
              src={subCategoryIcon.url}
              style={{ width: 70, height: 90 }}
              variant="square"
            />
          </Grid>
          <Grid item xs={4} className={classes.center}>
            {btnStatus && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditSubCategory}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={classes.container}>
      <MaterialTable
        title="SubCategory List"
        columns={[
          // { title: "ID", field: "subcategoryid", editable: "never" },
          { title: "Category Name", field: "categoryname", editable: "never" },
          { title: "SubCategory Name", field: "subcategoryname" },
          {
            title: "SubCategory Icon",
            render: (rowData) => (
              <Avatar
                variant="square"
                style={{ width: 60, height: 70 }}
                src={rowData.subcategoryicon}
                alt={rowData.subcategoryname}
              />
            ),
          },
          { title: "Priority", field: "bannerpriority" },
        ]}
        data={subCategories}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit SubCategory",
            onClick: (event, rowData) => handleOpen(rowData),
          },
        ]}
        options={{
          search: true,
          sorting: true,
          actionsColumnIndex: -1,
          paging: true,
        }}
      />
      {showSubCategory()}
    </div>
  );
}
