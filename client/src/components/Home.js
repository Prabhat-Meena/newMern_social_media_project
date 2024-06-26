import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import "./Home.css";
import "../App.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaRegComment } from "react-icons/fa";
import { LiaTelegram } from "react-icons/lia";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';


const Home = () => {

  const history = useNavigate();
  const [data, setData] = useState([]);
  // console.log(data);

  const [show, setShow] = useState(false);

  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      setData(res.data.getUser);
    }
  };

  const dltUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    }
     else {
      // getUserData();
      // setShow(true);
      history("/")
    }
  };

  useEffect(() => {
    setTimeout(()=>{
      getUserData()
      setShow(true);
      // this.forceUpdate();
    }, 100)
    // getUserData();
  }, []);


  return (
    <>
      <div className="container mt-2 theme">
        <div className="row d-flex justify-content-between align-iteams-center mt-5">
          {data.length > 0
            ? data.map((el, i) => {
                {
                  {/* console.log("el", el.imgpath); */}
                }
                return (
                  <div key={el._id}>
                    <h5 className="smallimg" >
                      <img
                        src={`/uploads/${el.imgpath}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          border: "1px solid black"
                        }}
                      />
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "18px",
                          marginLeft: "10px",
                        }}
                      >
                        {el.fname} <MoreHorizOutlinedIcon style={{margin:"0 0 12px 279px"}}/>
                      </p>
                    </h5>
                    <Card className="mb-3 card">
                      <Card.Img 
                        variant="top"

                        src={`/uploads/${el.imgpath}`}
                        className="mt-2 mainimg"
                      />
                      <Card.Body className="text-center">
                      <FavoriteBorderIcon style={{fontSize:"32", marginRight:"16px", marginTop:"5px", cursor:"pointer"}}/> <FaRegComment style={{fontSize:"28", marginRight:"16px", cursor:"pointer"}}/> <LiaTelegram  style={{fontSize:"32", cursor:"pointer"}}/><BookmarkBorderOutlinedIcon  style={{fontSize:"32", margin:"5px 0 0 302px", cursor:"pointer", padding:"0"}}/>
                        <Card.Title className="cardtittle">
                          User Name : {el.fname}
                        </Card.Title>
                        <Card.Text className="cardtittle">
                          Date Added : {moment(el.date).format("L")}
                        </Card.Text>

                        {/* <Button
                          variant="danger"
                          className="col-lg-6 text-center cardbutton btn btn-primary"
                          // onClick={() => dltUser(el._id)}
                          onClick={() => history("/dash")}

                         style={{cursor:"pointer"}}>
                          View Profile
                        </Button> */}
                        <input type="text" name="comment" placeholder="Add a comment                                                                                                 ☺" disabled style={{width:"468px", margin:"10px 0 0 0px", border:"none", borderBottom:"0.1px solid rgb(179, 179, 179)", padding:"0 0 10px 2px"}}/>
                      </Card.Body>
                    </Card>
                  </div>
                  
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;
