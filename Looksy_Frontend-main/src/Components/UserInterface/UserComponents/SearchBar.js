import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// Signup Component
import Signup from "./Signup";
// Add To cart PopUp Component
import PopCart from "./PopCart";
// Search
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { postData } from "../../Services/NodeServices";

// Search Bar Manipulation.......
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
//..................................

export default function SearchBar(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(props.search);
  const [searchTimeout, setSearchTimeout] = useState(null); // Add debounce

  // ADD TO CART AND POPOVER MANIPULATION............
  var cart = useSelector((state) => state.cart);
  var keys = Object.keys(cart);
  console.log("Headers Key", keys);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorE1] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorE1(event.currentTarget);
    setOpen(true);
    setRefresh(!refresh);
  };

  const handlePopoverClose = (event) => {
    setAnchorE1(null);
    setOpen(false);
    setRefresh(!refresh);
  };
  // ................................................

  // SEARCH MANIPULATION.............................
  const fetchAllProduct = async (txt) => {
    try {
      let result;

      if (txt.trim() === "") {
        // Use parent's onSearchClear callback if available
        if (props.onSearchClear) {
          props.onSearchClear();
        } else {
          props.setProductList([]);
        }
        console.log("Search cleared");
        return;
      } else {
        // Only search if there's actual text
        result = await postData("api/products/search", { productname: txt });
        props.setProductList(result?.data || []);
      }

      console.log("Search Result", result?.data || "Search cleared");
    } catch (error) {
      console.error("Search error:", error);
      // Handle error gracefully
      props.setProductList([]);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Add debounce to avoid too many API calls
    const newTimeout = setTimeout(() => {
      fetchAllProduct(searchValue);
    }, 300); // Wait 300ms after user stops typing

    setSearchTimeout(newTimeout);
  };

  // Clean up timeout on component unmount
  React.useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);
  // ................................................

  return (
    <>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <AppBar
          position="static"
          style={{
            background:
              "linear-gradient(90deg, rgba(36,0,0,0.9251050762101716) 0%, rgba(224,2,208,1) 11%, rgba(121,9,43,0.8914916308320203) 96%, rgba(255,0,74,0.5777661406359419) 100%)",
          }}
        >
          <Toolbar>
            <div
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 700,
                width: "20%",
                fontFamily: "cursive",
              }}
            >
              Looksy – Fast Fashion 
            </div>

            {search ? (
              <Search style={{ width: "60%" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                />
              </Search>
            ) : null}

            <div
              style={{
                position: "absolute",
                right: "3%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Signup open={false} />
              <span
                onClick={() => navigate("/mycart")}
                style={{ marginLeft: 20 }}
              >
                <Badge badgeContent={keys.length} color="primary">
                  <ShoppingBag
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  />
                </Badge>
              </span>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <PopCart anchorEl={anchorEl} open={open} />
    </>
  );
}
