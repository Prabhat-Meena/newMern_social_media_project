import React, { useContext } from "react";
import { LoginContext } from './ContextProvider/Context';
/////css
import "../App.css"
import { useNavigate , NavLink } from "react-router-dom"
import "./sidebar.css"
// export default Sidebar;
import { Menu } from "antd";
// import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

function SideMenu(theme) {
  const bg = theme == "light" ? "#fff" : "#222";
  const cl = theme == "light" ? "#222" : "#222";
  // console.log("bg", bg)
  // console.log("cl", cl)
  // const history = useNavigate();

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //     setAnchorEl(null);
  // };


  const logoutuser = async () => {
      let token = localStorage.getItem("usersdatatoken");

      const res = await fetch("/logout", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token,
              Accept: "application/json"
          },
          credentials: "include"
      });

      const data = await res.json();
      console.log(data);

      if (data.status == 201) {
          console.log("use logout");
          localStorage.removeItem("usersdatatoken");
          setLoginData(false)
          history("/");
      } else {
          console.log("error");
      }
  }

  const goDash = () => {
      history("/dash")
  }

  const goError = () => {
      history("*")
  }




  return (
    // <div style={{ isplay: "flex", flexDirection: "row"}}>
    //   <Menu style={{color:"#fff", backgroundColor: `${bg}`}}
    <div className="menudiv theme"
      // style={{
      //   height: "100vh",
      //   border: "2px solid red",
      //   position: "fixed",
      //   marginTop: "80px",
      // }}
    >
      <img src="/uploads/newlogo-removebg-preview.png" style={{width: "150px", 
    cursor: "pointer", marginLeft:"40px"}}/>
      <Menu
        className="sidebar theme"
        style={{ width: "270px", margin: "0" , padding:"0px"}}
        onClick={({ key }) => {
          if (key === "logout") {
            //todo, sign out feature here
          } else {
            history(key);
          }
        }}
        defaultSelectedKeys={[window.location.pathname]}
        items={[
          {
            label: "Home",
            key: "/dash",
            icon: <HomeOutlined style={{fontSize: "20px" }} />,
          },
          // {
          //   label: "Dashboard",
          //   key: "/dashboard",
          //   icon: <DashboardOutlined />,
          // },
          // {
          //   label: "Users List",
          //   key: "/userList",
          //   icon: <UnorderedListOutlined />,
          //   children:[
          //       {label:'Active Users', key: "/activeUsers"},
          //       {label:'Disable Users', key: "/disabledUsers"}
          //   ]
          // },
          {
            label: "Profile",
            key: "/Updateprofile",
            icon: <UserOutlined  style={{fontSize: "20px"}} />,
          },
          {
            label: "Logout",
            key: "/",
            icon: (
              <PoweroffOutlined
                style={{ fontSize: "20px" }}
                onClick={() => {
                  logoutuser();
                }}
              />
            ),
            danger: true,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
