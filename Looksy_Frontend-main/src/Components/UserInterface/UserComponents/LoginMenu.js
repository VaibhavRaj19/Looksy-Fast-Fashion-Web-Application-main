import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { ServerURL } from "../../Services/NodeServices";
import hello from "../../../Assets/hello.png"

export default function LoginMenu(props) {
  var user = useSelector((state) => state.user);
  var userData = Object.values(user)[0];
  var dispatch = useDispatch();

  // Menu Anchor............
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  //........................

  const handleLogout = () => {
    dispatch({ type: "DELETE_USER", payload: [] });
    props.onClick(false);
  };

  return (
    <div>
      <AccountCircleIcon
        style={{ width: 42, height: 40, marginTop: 5 }}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem style={{ fontWeight: 600, fontFamily: "cursive" }}>
          <img src={hello} alt="hello" style={{ width: 23, height: 22 }} />
          Hello {userData.firstname}
        </MenuItem>
        <MenuItem
          style={{ fontWeight: 600, fontFamily: "cursive" }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
