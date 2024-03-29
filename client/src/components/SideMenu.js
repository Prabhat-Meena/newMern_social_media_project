import React, { useContext } from "react";
import { useState } from 'react';
import { LoginContext } from './ContextProvider/Context';
/////css
import "../App.css"
import { useNavigate , NavLink } from "react-router-dom"
import "./sidebar.css"
// export default Sidebar;
import axios from "axios";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  PoweroffOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function SideMenu() {

  const { logindata, setLoginData } = useContext(LoginContext);

  console.log("sidemenu login ", logindata)

  const history = useNavigate();


  const dltUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      // getUserData();
      // setShow(true);
      history("/");
    }
  };

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

  // const goDash = () => {
  //     history("/dash")
  // }

  // const goError = () => {
  //     history("*")
  // }


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
            danger: false,
          },
          {
            label: "Delete",
            key: "/register",
            icon: (
              <CloseCircleOutlined
                style={{ fontSize: "20px" }}
                onClick={() => {
                  dltUser(logindata.ValidUserOne._id);
                }}
              />
            ),
            danger: true,
          }
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
