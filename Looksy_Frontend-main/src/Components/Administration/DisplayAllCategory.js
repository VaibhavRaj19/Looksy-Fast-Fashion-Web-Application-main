import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import {
  Avatar,
  Dialog,
  DialogContent,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import { getData, postData } from "../Services/NodeServices";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState({
    categoryid: "",
    categoryname: "",
    iconUrl: "",
    icon: { url: "", bytes: "" },
  });

  const fetchAllCategory = async () => {
    const response = await getData("category/display_all_category");
    if (response.status) setCategoryList(response.categories);
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const handleDelete = async (rowData) => {
    const confirmation = await Swal.fire({
      title: `Delete "${rowData.categoryname}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      const body = { categoryid: rowData.categoryid };
      const result = await postData("category/delete_category_data", body);

      if (result.status) {
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        fetchAllCategory();
      } else {
        Swal.fire("Failed", result.message || "Delete failed", "error");
      }
    }
  };

  const handleEditOpen = (rowData) => {
    setEditData({
      categoryid: rowData.categoryid,
      categoryname: rowData.categoryname,
      iconUrl: rowData.iconUrl,
      icon: { url: rowData.iconUrl, bytes: "" },
    });
    setOpenDialog(true);
  };

  const handleEditIcon = (event) => {
    const file = event.target.files[0];
    setEditData((prev) => ({
      ...prev,
      icon: { url: URL.createObjectURL(file), bytes: file },
    }));
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append("categoryid", editData.categoryid);
    formData.append("categoryname", editData.categoryname);
    formData.append("oldpic", editData.iconUrl);
    if (editData.icon.bytes) {
      formData.append("icon", editData.icon.bytes);
    }

    const result = await postData(
      "category/edit_category_data",
      formData,
      true
    );
    if (result.status) {
      Swal.fire("Success", "Category updated successfully", "success");
      setOpenDialog(false);
      fetchAllCategory();
    } else {
      Swal.fire("Error", result.message || "Update failed", "error");
    }
  };

  const editDialog = () => (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Category Name"
              fullWidth
              value={editData.categoryname}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  categoryname: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" component="label">
              Upload Icon
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleEditIcon}
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              src={editData.icon.url}
              variant="rounded"
              sx={{ width: 60, height: 80 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleEditSubmit} fullWidth>
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={() => setOpenDialog(false)}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Categories</h2>
      <MaterialTable
        style={{ width: 700, padding: 20 }}
        title="Category List"
        data={categoryList}
        columns={[
          { title: "Category Name", field: "categoryname" },
          {
            title: "Icon",
            render: (rowData) => (
              <Avatar
                src={rowData.iconUrl}
                variant="rounded"
                sx={{ width: 40, height: 70 }}
              />
            ),
          },
        ]}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Category",
            onClick: (event, rowData) => handleEditOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
        }}
      />
      {editDialog()}
    </div>
  );
}
