import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import { getData } from "../../Services/NodeServices";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function MainBar(props) {
  const navigate = useNavigate();

  // Menu state management
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Data states
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // Fetch all categories
  const fetchAllCategories = async () => {
    try {
      const result = await getData("category/display_all_category");
      setCategory(result?.categories || []);
      console.log("Categories fetched:", result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategory([]);
    }
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch subcategories by category ID
  const fetchAllSubCategories = async (categoryid) => {
    try {
      const result = await getData(`subcategory/by-category/${categoryid}`);
      setSubCategory(result?.data || result || []);
      console.log("Subcategories fetched:", result || result);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategory([]);
    }
  };

  // Menu handlers
  // Update handleCategoryClick:
  const handleCategoryClick = (event) => {
    const categoryId = event.currentTarget.value;
    setSelectedCategoryId(categoryId); // Store the selected category ID
    setAnchorEl(event.currentTarget);
    fetchAllSubCategories(categoryId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubCategoryClick = (subcategoryid) => {
    navigate(`/productlist/${selectedCategoryId}/${subcategoryid}`);
    handleClose();
  };

  // Render category buttons
  const showCategoryMenu = () => {
    return category.map((item) => (
      <Button
        key={item.categoryid}
        onClick={handleCategoryClick}
        style={{ color: "#000" }}
        value={item.categoryid}
        color="inherit"
      >
        {item.categoryname}
      </Button>
    ));
  };

  // Render subcategory menu items
  const showSubCategoryMenu = () => {
    return subCategory.map((item) => (
      <MenuItem
        key={item.subcategoryid}
        onClick={() => handleSubCategoryClick(item.subcategoryid)}
      >
        {item.subcategoryname}
      </MenuItem>
    ));
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#fff" }}>
        <Toolbar>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {showCategoryMenu()}
            <Menu
              id="subcategory-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "category-button",
              }}
            >
              {showSubCategoryMenu()}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
