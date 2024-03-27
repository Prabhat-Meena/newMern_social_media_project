const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");
const multer = require("multer");
const moment = require("moment")


const keysecret = process.env.SECRET



// email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}) 


// for user registration

router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });

            // here password hasing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});




// user Login

router.post("/login", async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }else{
            res.status(401).json({status:401,message:"invalid details"});
        }

    } catch (error) {
        res.status(401).json({status:401,error});
        console.log("catch block");
    }
});



// user valid
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        const usersData = await userdb.find()
        // console.log("validuserData", usersData);
        res.status(201).json({status:201,ValidUserOne, usersData});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


// user logout

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});



// send email Link For reset Password
router.post("/sendpasswordlink",async(req,res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await userdb.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        
        const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:process.env.EMAIL,
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Succsfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }

});


// verify user for forgot password time
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        // console.log(validuser)
        
        const verifyToken = jwt.verify(token,keysecret);

        console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// change password

router.post("/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await userdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


///////////update Profile image

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
})


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});
router.post("/Updateprofile",upload.single("photo"),async(req,res)=>{
    console.log("request.bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",req.body)
    const {filename} = req.file;
    console.log("filename: ",filename)
    // const {fname} = req.body;
    // // const {email} = req.body;
    // console.log("fname: ", fname)
    const { eid }= req.body
    console.log("lid hellllllllllllllllllllllllllllllllllllllo", eid)


    if(!eid || !filename){
        res.status(401).json({status:401,message:"fill all the data"})
    }

    try {

        // const date = moment(new Date()).format("YYYY-MM-DD");

        // const userdata = new users({
        //     fname:fname,
        //     imgpath:filename,
        //     date:date
        // });
        const userdata = await userdb.findOneAndUpdate({email:eid}, {imgpath:filename})
        // const userdata = await userdb.findOneAndUpdate({id:eid}, {imgpath:filename})

        // const finaldata = userdata.save();
        // res.status(201).json({status:201,setnewuserpass})
        console.log("userData", userdata)

        const finaldata = await userdata.save();
        console.log("finaldata: ", finaldata)

        res.status(201).json({status:201,finaldata});

    } catch (error) {
        res.status(401).json({status:401,message:"Please Enter Your Correct Email"})
    }
});


// user data get
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await userdb.find();
        // console.log("getdata: ", getUser)
        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

// router.post("/Updateprofile/:id",upload.single("photo"),async(req,res)=>{

//     try {
//         const {id} = req.params
//         console.log("i : ",id)
//         const {filename} = req.file
//         console.log("filename: ",filename)
//         if(!filename){
//             res.status(401).json({status:401,message:"fill all the data"})
//         }
//         const userdata = await userdb.findOneAndUpdate({_id:id}, {imgpath:filename})
//         console.log("userdata: ", userdata) 
//         const finaldata = await userdata.save();
//         console.log("finaldata: ", finaldata)
//         res.status(201).json({status:201,finaldata});

//     } catch (error) {
//         res.status(401).json({status:401,message:"Please Enter Your Correct Email"})
//     }

    // const {filename} = req.file;
    // console.log("filename: ",filename)
    // const {fname} = req.body;
    // // const {email} = req.body;
    // console.log("fname: ", fname)

    // if(!filename){
    //     res.status(401).json({status:401,message:"fill all the data"})
    // }
    

    // try {
    //     const userdata = await userdb.findOneAndUpdate({email:fname}, {imgpath:filename})
    //     // const finaldata = userdata.save();
    //     // res.status(201).json({status:201,setnewuserpass})
    //     console.log("userData", userdata)

    //     const finaldata = await userdata.save();
    //     console.log("finaldata: ", finaldata)

    //     res.status(201).json({status:201,finaldata});

    // } catch (error) {
    //     res.status(401).json({status:401,message:"Please Enter Your Correct Email"})
    // }
// });


// delete user data
// router.delete("/:id", upload.single("photo"), async(req,res)=>{

//     const {id} = req.params;

//     console.log("id from router",id)
//     const {filename} = req.file;
//     console.log("filename: ",filename)

//     if(!filename){
//         res.status(401).json({status:401,message:"fill all the data"})
//     }

//     try {
        
//         const userdata = await userdb.findOneAndUpdate({_id:id}, {imgpath:filename})
//         // const dltUser = await userdb.findByIdAndDelete({_id:id}, {imgpath:filename});
//         console.log("userData", userdata)

//         const finaldata = await userdata.save();
//         console.log("finaldata: ", finaldata)

//         res.status(201).json({status:201,finaldata});
        

//         // res.status(201).json({status:201,dltUser});

//     } catch (error) {
//         // res.status(401).json({status:401,error})
//         res.status(401).json({status:401,message:"Please Enter Your Correct id"})

//     }

// })


router.delete("/:id",async(req,res)=>{

    try {
        const {id} = req.params;

        const dltUser = await userdb.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }

})



module.exports = router;



// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true



