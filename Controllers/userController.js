const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModels = require('../models/userModel');
// @desc getall User
// @route /api/getallUser
// @access public
const getalluser = asyncHandler( async (request,responce)=>{
      const userData = await userModels.find();
      responce.status(200).json(userData)
      //responce.status(200).json({mass:`Gat All Data`})
})
// @desc getsingle User
// @route /api/getsingleUser
// @access public
const getsingleUser = asyncHandler( async (request,responce)=>{
      responce.status(200).json({mass:`Gat SingleUser Data ${request.params.id}`})
})
// @desc Create User
// @route /api/createUser
// @access public
const createUser = asyncHandler( async (request,responce)=>{
     
      const {fullname,username,email,phoneno,password}=request.body;
      if(!fullname ||!username || !email || !phoneno || !password){
            responce.status(400);
            throw new Error("All Fileds Required")
      }else{
            const checkUser = await userModels.findOne({ email,username });
            if(checkUser){
            responce.status(400);
            throw new Error("User already registered!")
            }else{
             const hashPassword = await bcrypt.hash(password,10)     
            const usercreate = await userModels.create({
                  fullname,
                  username,
                  email,
                  phoneno,
                  password : hashPassword
              });  
              if(usercreate){
                  responce.status(200).json({_id:usercreate.id,username:usercreate.username,email:usercreate.email})
              }else{
                  responce.status(400);
                  throw new Error("User Data Is Not Valied!")
              }
             
            }
           
           
          // responce.status(201).json({mass:`Create User Data SuccessFully Your Data Name ${name}`})
        }
})
// @desc Update User Data
// @route /api/updateUserData
// @access public
const loginUser = asyncHandler( async (request,responce)=>{
      const {email,password}=request.body;
      if(!email || !password){
            responce.status(400);
            throw new Error("All Fileds Required")
      }else{
            const userData = await userModels.findOne({ email });
            if(userData &&  await bcrypt.compare(password,userData.password)){
               accessToken = jwt.sign({
                 userInfo : {
                  username : userData.fullname,
                  email    : userData.email,
                  id       : userData.id,
                 },
               },process.env.ASSESS_TOKEN_SECERT,
               {expiresIn : "1d"}); 
              responce.status(201).json({accessToken:accessToken})
            }else{
             responce.status(400);
            throw new Error("Password Not Currect")
            }
           // responce.status(201).json(checkUser)
      }
})
// @desc Update User Data
// @route /api/currentData
// @access private
const currentData = asyncHandler( async (request,responce)=>{
      responce.status(201).json({mass:`Update Records SuccessFully Id = ${request.userInfo.id}`})
})
// @desc Update User Data
// @route /api/updateUserData
// @access public
const updateUserData = asyncHandler( async (request,responce)=>{
      responce.status(201).json({mass:`Update Records SuccessFully Id = ${request.params.id}`})
})
// @desc Delete User Data
// @route /api/deleteUserData
// @access public
const deleteUserData = asyncHandler( async (request,responce)=>{
      responce.status(201).json({mass:`Delete Records SuccessFully Id = ${request.params.id}`})
})
module.exports = {
                  getalluser,
                  getsingleUser,
                  createUser,
                  loginUser,
                  currentData,
                  updateUserData,
                  deleteUserData
                 };