import React, { useEffect } from "react";
import { Grid, TextField, Button, DialogActions } from "@mui/material";

export default function AddAddress({
  form,
  setForm,
  onCancel,
  onSave,
  editMode,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Verify and sync user data on mount
  useEffect(() => {
    console.log("AddAddress mounted with initial form:", form);

    const syncUserData = () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user")) || {};

        if (
          (!form.email || !form.userid) &&
          (localUser.email || localUser.userid)
        ) {
          console.log("Syncing missing user data from localStorage");
          setForm((prev) => ({
            ...prev,
            email: localUser.email || prev.email,
            userid: localUser.userid || prev.userid,
          }));
        }
      } catch (error) {
        console.error("Error syncing user data:", error);
      }
    };

    syncUserData();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <TextField
            label="Street"
            name="street"
            fullWidth
            value={form.street}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Town"
            name="town"
            fullWidth
            value={form.town}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="City"
            name="city"
            fullWidth
            value={form.city}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            name="state"
            fullWidth
            value={form.state}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Pin Code"
            name="pinCode"
            fullWidth
            value={form.pinCode}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Country"
            name="country"
            fullWidth
            value={form.country}
            onChange={handleInputChange}
            required
          />
        </Grid>
      </Grid>

      <DialogActions sx={{ mt: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={!form.userid || !form.email}
        >
          {editMode ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </>
  );
}
