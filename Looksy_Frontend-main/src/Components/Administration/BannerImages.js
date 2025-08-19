// Styles
import { useStyles } from "./BannerImagesCss";
// Components
import { Button, Grid } from "@mui/material";
// UseState
import { useState } from "react";
// PostData
import { postData } from "../Services/NodeServices";
// Sweet Alert
import Swal from "sweetalert2";
// Drop Zone
import { DropzoneArea } from "material-ui-dropzone";

export default function BannerImages(props) {
  const classes = useStyles();
  const [getFiles, setFiles] = useState([]);
  const [resetKey, setResetKey] = useState(Date.now()); // 👈 Used to force Dropzone reset

  const handleSubmit = async () => {
    if (getFiles.length === 0) {
      Swal.fire("Error", "Please upload at least one banner image", "error");
      return;
    }

    const formData = new FormData();
    getFiles.forEach((item) => {
      formData.append("pictures", item); // ✅ Correct key
    });

    try {
      const result = await postData("api/banners/upload", formData, true); // ✅ Correct endpoint

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Banners Uploaded Successfully",
          html: result.data.bannerPictures
            .map((url) => `<img src="${url}" width="100" style="margin:5px"/>`)
            .join(""),
        });

        setFiles([]);
        setResetKey(Date.now()); // 👈 Force DropzoneArea to re-render and clear
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      Swal.fire("Upload Failed", error.message, "error");
    }
  };

  const handleSave = (files) => {
    setFiles(files);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container className={classes.gridStyle} spacing={2}>
          <Grid item xs={12}>
            <div className={classes.headingText}>Banner Images Interface</div>
          </Grid>
          <Grid item xs={12}>
            <DropzoneArea
              key={resetKey} // 👈 Add key to reset component
              onChange={handleSave}
              acceptedFiles={["image/*"]}
              filesLimit={5}
              maxFileSize={5000000}
              showPreviewsInDropzone={true}
              showFileNamesInPreview={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
