import React, { useContext } from "react";
import "./Navbar.css";
import "../App.css"
// import logo_light from "../assets/logo-black.png";
// import logo_dark from "../assets/logo-white.png";
// import search_icon_light from "../assets/search-w.png";
// import search_icon_dark from "../assets/search-b.png";

// import toggle_light from "../assets/night.png";
// import toggle_dark from "../assets/day.png";

import Avatar from "@mui/material/Avatar";
import "./header.css";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, NavLink } from "react-router-dom";

function Navbar({ theme, setTheme }) {
  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log("use logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };

  const goDash = () => {
    history("/dash");
  };

  const goError = () => {
    history("*");
  };
  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="navbar avtar theme">
      <NavLink to="/">
        {/* <h1>
          <img
            src="https://img.freepik.com/free-vector/flat-design-ac-logo-design_23-2149482027.jpg?w=740&t=st=1710744259~exp=1710744859~hmac=94be37a9abfbf653b749a475d9963435b940fa1a4e78ff0c2629ea4d61d45e3d"
            alt="not foud"
            style={{ width: "70px", borderRadius: "50%" }}
            className="mt-1 pt-1"
          ></img>
        </h1> */}
      </NavLink>
      {/* <img
        src={theme == "light" ? logo_light : logo_dark}
        alt=""
        className="logo"
      /> */}
      <ul>
        <li style={{fontWeight:"600"}} onClick={()=>{history("/dash")}}>Home</li>
        <li style={{fontWeight:"600"}} onClick={()=>{history("/Updateprofile")}}>Profile</li>
        <li style={{fontWeight:"600"}} onClick={()=>{logoutuser()}}>Logout</li>
        <li style={{fontWeight:"600"}} onClick={()=>{history("/dash")}}>About</li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="search" />
        <img
          // src={theme == "light" ? search_icon_light : search_icon_dark}
          src={`/uploads/search-w.png`}

          alt="alt"
        />
      </div>
      {/* <img onClick={()=>{toggle_mode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className="toggle-icon" /> */}
      <div className="avtar">
        {logindata.ValidUserOne ? (
          <Avatar
            style={{
              background: "salmon",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            onClick={handleClick}
          >
            {logindata.ValidUserOne.fname[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar style={{ background: "blue" }} onClick={handleClick} />
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {logindata.ValidUserOne ? (
            <div>
              <MenuItem
                onClick={() => {
                  history("/Updateprofile");
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutuser();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            </div>
          )}
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
