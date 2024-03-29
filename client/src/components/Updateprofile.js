import React, { useEffect, useState } from 'react'
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


const Updateprofile = ({id, data}) => {
  // console.log("id from update",id)
  // console.log(
  //   "data from app prop", data
  // )
  const uid = id;
  console.log("uid",id)

  const [fname, setfName] = useState("");
  const [email, setEmail] = useState("")

  const [file, setFile] = useState("");
  console.log("f:", fname, "e:", email, "fi",file)

  useEffect(()=>{
    setfName(data.ValidUserOne.fname)
    setEmail(data.ValidUserOne.email)
    setFile(data.ValidUserOne.imgpath)
  }, [])
  // const params = useParams()
  // console.log("par",params)

  const history = useNavigate();

  //update
  // const dltUser = async (e, id) => {
  //   console.log("id inside", id)

  //   e.preventDefault();

  //   var formData = new FormData();
  //   formData.append("photo", file);
  //   formData.append("fname", fname);

  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     }
  //   }
  //   const res = await axios.delete(`/${id}`, formData, config);

  //   if (res.data.status === 401 || !res.data) {
  //     console.log("errror");
  //   } else {
  //     // getUserData();
  //     // setShow(true);
  //     setTimeout(() => {
  //       history("/dash")
  //     }, 1000);

  //   }
  // };

  // {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }


  // const setdata = (e) => {
  //   const { value } = e.target;
  //   // setFName(value);
  // }

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  // adduser data

  const addUserData = async (e) => {
    console.log("target",e.target.value)
    e.preventDefault();
    var eid = uid;
    console.log("eid",eid)
    // const params = useParams()
    // console.log("par",params)
    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);
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
    <section className="theme" style={{height:"100vh", paddingTop:"100px"}}>
                <div className="form_data theme">
                    <div className="form_heading">
                        <h1>Update Profile</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label>Name</label>
                            <input type="text" name='fname' onChange={(e)=> setfName(e.target.value)} placeholder="Enter your email first" defaultValue={fname} />
                        </div>
                        <div className="form_input">
                            <label>Email</label>
                            <input type="text" name='fname' placeholder="Enter your email first" defaultValue={email} disabled/>
                        </div>
                        <div className="form_input">
                            <label>Image</label>
                            <div className="two">
                                <input type="file" onChange={setimgfile} name='photo' placeholder="choice new image"/>
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