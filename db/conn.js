const mongoose = require("mongoose");

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})








// import React from "react";
// import { Menu } from "antd";
// import { useNavigate } from "react-router-dom";
// import {
//   HomeOutlined,
//   DashboardOutlined,
//   UnorderedListOutlined,
//   UserOutlined,
//   PoweroffOutlined,
// } from "@ant-design/icons";
// // import Header from "./Header";

// function Dash() {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh" }}>
//       <Header />
//       <div style={{ display: "flex", flexDirection: "row", flex: 1 }} >
//         <SideMenu />
//         <Content />
//       </div>
//       ,
//       <Footer />
//     </div>
//   );
// }

// function Header() {
//   return <div style={{height: 60, backgroundColor:"lightskyblue", display:'flex', justifyContent:'center', alignItems:'center', color:'white', fontWeight:"bold"}}>Header</div>;
// }

// function Footer() {
//   return <div style={{height: 60, backgroundColor:"gray", display:'flex', justifyContent:'center', alignItems:'center', color:'white', fontWeight:"bold"}}>Footer</div>;
// }

// function SideMenu() {
//     const history = useNavigate();
//   return (
//     <div style={{ display: "flex", flexDirection: " row" }}>
//       <Menu
//         onClick={({ key }) => {
//           if (key === "logout") {
//             //todo, sign out feature here
//           } else {
//               history(key);
//           }
//         }}
//         defaultSelectedKeys={[window.location.pathname]}
//         items={[
//           { label: "Home", key: "/", icon: <HomeOutlined /> },
//           {
//             label: "Dashboard",
//             key: "/dashboard",
//             icon: <DashboardOutlined />,
//           },
//           {
//             label: "Users List",
//             key: "/userList",
//             icon: <UnorderedListOutlined />,
//             children:[
//                 {label:'Active Users', key: "/activeUsers"},
//                 {label:'Disable Users', key: "/disabledUsers"}
//             ]
//           },
//           { label: "Profile", key: "/profile", icon: <UserOutlined /> },
//           {
//             label: "Logout",
//             key: "/logout",
//             icon: <PoweroffOutlined />,
//             danger: true,
//           },
//         ]}
//       ></Menu>
//     </div>
//   );
// }

// function Home (){
//     return ( 
//         <div>Home</div>
//     )
// }

// function Content() {
//   return <div>Content</div>;
// }

// export default Dash;
