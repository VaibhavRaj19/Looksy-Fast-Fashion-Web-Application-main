// Styles
import { useStyles } from "./CategoryCss";
// Components
import { TextField, Button, Grid } from "@mui/material";
// Avatar
import Avatar from "@mui/material/Avatar";
// Hooks
import { useState } from "react";
// Services
import { postData } from "../Services/NodeServices";
// Alerts
import Swal from "sweetalert2";
// Navigation
import { useNavigate } from "react-router";

export default function Category() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState({ url: "/icon.png", bytes: "" });

  const handleIcon = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIcon({
        url: URL.createObjectURL(file),
        bytes: file,
      });
    }
  };

  const handleSubmit = async () => {
    if (!categoryName || !icon.bytes) {
      Swal.fire("Validation Error", "Please fill in all fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("categoryname", categoryName);
    formData.append("icon", icon.bytes);

    const result = await postData("category/add_new_category", formData, true);

    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "Category Added Successfully",
        html: `
          <p><strong>${result.category.categoryname}</strong></p>
          <img src="${result.category.iconUrl}" width="100" style="margin-top:10px" />
        `,
      });
      setCategoryName("");
      setIcon({ url: "/icon.png", bytes: "" });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message || "Something went wrong!",
      });
    }
  };

  const handleReset = () => {
    setCategoryName("");
    setIcon({ url: "/icon.png", bytes: "" });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container className={classes.gridStyle} spacing={2}>
          <Grid item xs={12} style={{ display: "flex" }}>
            <div className={classes.headingText}>Category Interface</div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "24vw",
              }}
            >
              <Avatar
                src={"/report.png"}
                style={{ width: 39 }}
                onClick={() => navigate("/dashboard/displayallcategory")}
                variant="square"
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              fullWidth
              label="Category Name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6} className={classes.center}>
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
              alt="Category Icon"
              src={icon.url}
              sx={{ width: 70, height: 70 }}
              variant="square"
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
