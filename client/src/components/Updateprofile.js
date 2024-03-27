import React, { useState } from 'react'
// import Button from 'react-bootstrap/Button';
import "./mix.css"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"

// import Form from 'react-bootstrap/Form';
import Dash from './Dash';
import "./Updateprofile.css"
import SideMenu from './SideMenu';
import Navbar from './Navbar';
import "../App.css"
const Updateprofile = ({id}) => {
  // console.log("id from update",id)
  const uid = id;
  console.log("uid",id)

  const [fname, setFName] = useState("");

  const [file, setFile] = useState("");

  const history = useNavigate();

  //update
  const dltUser = async (e, id) => {
    console.log("id inside", id)

    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    const res = await axios.delete(`/${id}`, formData, config);

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      // getUserData();
      // setShow(true);
      setTimeout(() => {
        history("/dash")
      }, 1000);

    }
  };

  // {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }


  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  }

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  // adduser data

  const addUserData = async (e) => {
    console.log("target",e.target.value)
    e.preventDefault();
    var eid = uid;
    console.log("eid",eid)
    var formData = new FormData();
    formData.append("photo", file);
    // formData.append("fname", fname);
    formData.append("eid", eid)


    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    const res = await axios.post(`/Updateprofile`, formData, eid, config);

    if (res.data.status === 401 || !res.data) {
      console.log("errror")
    }
     else {
      setTimeout(() => {
        history("/dash")
      }, 1000);
    }
  }
  

  <Dash addUserData={addUserData}/>

  return (
    <>
    <Navbar />
    <SideMenu />
    {/* <div className=''>
      <div className="updateproform">
          <h1 style={{margin:"300px 5px 5px 10px",}}>Upload Your Img Here</h1>

          <Form className='mt-3 ' style={{height: "200px"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>your email</Form.Label>
              <Form.Control type="text" name='fname' onChange={setdata} placeholder="Enter your email first"  style={{}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Select Your Image</Form.Label>
              <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addUserData} style={{fontWeight:"50", padding:"0"}}>
              Update Profile
            </Button>
          </Form>
        </div>
    </div> */}
    <section className="theme" style={{height:"100vh", paddingTop:"100px"}}>
                <div className="form_data theme">
                    <div className="form_heading">
                        <h1>Upload Your Img Here</h1>
                    </div>

                    <form>
                        {/* <div className="form_input">
                            <label>Email</label>
                            <input type="text" name='fname' onChange={setdata} placeholder="Enter your email first" />
                        </div> */}
                        <div className="form_input">
                            <label>Image</label>
                            <div className="two">
                                <input type="file" onChange={setimgfile} name='photo' placeholder="" />
                            </div>
                        </div>
                        <button  className='btn' type="submit" onClick={addUserData}>Update Profile</button>
                        {/* <button  className='btn' type="submit" onClick={() => dltUser('65fd9676b3243ada2218d1a9')}>Update Profile</button> */}
                        <p><NavLink to="/dash">Go Back</NavLink> </p>
                    </form>
                </div>
            </section>
    </>
  )
}




export default Updateprofile;