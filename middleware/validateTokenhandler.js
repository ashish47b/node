const asyncHandler = require('express-async-handler'); 
const jwt = require('jsonwebtoken');
const validateToken =asyncHandler( async (req, res, next) => { 
     let token;
     let autheader = req.headers.Authentication || req.headers.authentication;
     if(autheader && autheader.startsWith("Bearer")){
          token = autheader.split(" ")[1];
          jwt.verify(token,process.env.ASSESS_TOKEN_SECERT,(err,decoded) =>{
            if(err){
                  responce.status(401);
                  throw new Error("User Is Not Authorized")
            }else{
               req.userInfo = decoded.userInfo;
               next();
              //  console.log(decoded)
            }
          })
          if(!token){
               responce.status(401);
               throw new Error("User Is Not Authorized or token is missing")
          }
     }
      
})
module.exports = validateToken;