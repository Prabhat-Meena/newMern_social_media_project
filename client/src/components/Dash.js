import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import "./Dash.css";
import "../App.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Home from "./Home";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";



function Dash({ setId }) {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);
  // console.log("login",logindata)
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      history("*");
    } else {
      console.log("data", data);
      console.log("user verify");
      setLoginData(data);
      setId(data.ValidUserOne.email);
      // console.log(setLoginData(data))
      history("/dash");
    }
  };


  useEffect(() => {
    DashboardValid();
    setTimeout(() => {
      setData(true);
    }, 1000);
  }, [data]);

  return (
    <>
      <div className="container">
        {/* <Navbar /> */}
        {/* <Header /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            // margin: "15px",
          }}
        >
          <SideMenu />
          {/* <Content  /> */}
          <Home />
          {data ? (
            <div className="rightsidebar theme">
              <h4 className="sidecardname theme">
                <img
                  className="sideimg"
                  src={`/uploads/${logindata.ValidUserOne.imgpath}`}
                  alt="img"
                />
                {logindata ? logindata.ValidUserOne.fname : ""},{" "}
                {logindata ? logindata.ValidUserOne.email : ""}
              </h4>
            </div>
          ) : (
            <Box
              className="theme"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "50vh",
              }}
            >
              Loading... &nbsp;
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    </>
  );
}

export default Dash;
