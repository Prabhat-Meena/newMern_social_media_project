import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import moment from "moment"
import Alert from 'react-bootstrap/Alert';
const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);

    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

    return (
        <>
            
            {
                data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                    <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
                </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
            

        </>

    )
}

export default Dashboard





////////////////////////////////////////////dash

// function Header() {
//   return <div style={{height: 60, backgroundColor:"cream", display:'flex', justifyContent:'space-evenly', alignItems:'center', fontWeight:"bold", border: "0.01px solid #d4d3d2",}}>
//     <div>logo</div>,
//     <div style={{display:"flex", justifyContent:"space-bitween"}}><div>Home</div> <div>about</div></div>
//   </div>;
// }

// function Footer() {
//   return <div style={{height: 60, backgroundColor:"gray", display:'flex', justifyContent:'center', alignItems:'center', color:'white', fontWeight:"bold"}}>Footer</div>;
// }

// function SideMenu() {
//     const history = useNavigate();
//   return (
//     <div style={{ display: "flex", flexDirection: "row"}}>
//       <Menu style={{marginLeft:"10px"}}
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




    /////////////////////////////////////////
    // <div className={`container ${theme}` } style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", backgroundColor: "#ced8ff"}}>
    //   <Navbar theme={theme} setTheme={setTheme}/>
    //   <div style={{ display: "flex", flexDirection: "row", flex: 1, margin:"15px"}} >
    //     <SideMenu />
    //     <Content />
    //   </div>
    //   ,
    //   <Footer />
    // </div>










            {/* <hr /> */}
        {/* <div className="container mt-2">
          <div className="row d-flex justify-content-between align-iteams-center mt-5">
            {uData.length > 0
              ? uData.map((el, i) => {
                  return (
                    <>
                      <Card
                        style={{
                          width: "22rem",
                          height: "18rem",
                          backgroundColor: "#f7eeed",
                        }}
                        className="mb-3 p-2"
                      >
                        <Card.Img
                          variant="top"
                          style={{
                            width: "100px",
                            textAlign: "center",
                            margin: "auto",
                          }}
                          src={"./man.png"}
                          className="mt-5"
                        />
                        <Card.Body className="text-center mt-3">
                          <Card.Title>Name : {el.fname}</Card.Title>
                          <Card.Text>
                            Date Added :{moment(el.date).format("L")}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })
              : ""}
          </div>
        </div> */}










        // function Header() {
//   return <div style={{height: 60, backgroundColor:"cream", display:'flex', justifyContent:'space-evenly', alignItems:'center', fontWeight:"bold", border: "0.01px solid #d4d3d2",}}>
//     <div>logo</div>,
//     <div style={{display:"flex", justifyContent:"space-bitween"}}><div>Home</div> <div>about</div></div>
//   </div>;
// }

// function Footer() {
//   return <div style={{height: 60, backgroundColor:"gray", display:'flex', justifyContent:'center', alignItems:'center', color:'white', fontWeight:"bold"}}>Footer</div>;
// }

// function SideMenu() {
//     const history = useNavigate();
//   return (
//     <div style={{ display: "flex", flexDirection: "row"}}>
//       <Menu style={{marginLeft:"10px"}}
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




    /////////////////////////////////////////
    // <div className={`container ${theme}` } style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", backgroundColor: "#ced8ff"}}>
    //   <Navbar theme={theme} setTheme={setTheme}/>
    //   <div style={{ display: "flex", flexDirection: "row", flex: 1, margin:"15px"}} >
    //     <SideMenu />
    //     <Content />
    //   </div>
    //   ,
    //   <Footer />
    // </div>



    {/* <Card
                  style={{
                    width: "22rem",
                    height: "18rem",
                    backgroundColor: "#f7eeed",
                  }}
                  className="mb-3 p-2"
                >
                  <Card.Img
                    variant="top"
                    style={{
                      width: "100px",
                      textAlign: "center",
                      margin: "auto",
                    }}
                    src={"./man.png"}
                    className="mt-5"
                  />
                  <Card.Body className="text-center mt-3">
                    <Card.Title>Name : {el.fname}</Card.Title>
                    <Card.Text>
                      Date Added :{moment(el.date).format("L")}
                    </Card.Text>
                  </Card.Body>
                </Card> */}