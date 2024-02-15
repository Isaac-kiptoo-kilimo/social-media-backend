import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register user service
export const registerNewUserService=async(newUser)=>{

  try {
    const result=await poolRequest()
    .input('UserID', sql.VarChar,newUser.UserID)
    .input('Username', sql.VarChar,newUser.Username)
    .input('Email', sql.VarChar,newUser.Email)
    .input('Password', sql.VarChar,newUser.Password)
    .input('TagName', sql.VarChar,newUser.TagName)
    .input('Location', sql.VarChar,newUser.Location)
    .query(`INSERT INTO tbl_user (UserID,Username,Email,Password,TagName,Location) VALUES(@UserID,@Username,@Email,@Password,@TagName,@Location)`)

    return result;

  } catch (error) {
    return error
  }
};

// Login user and generate token which returns user details except the password

export const authenticateUserService=async(user)=>{
try {
  const userFoundResponse=await poolRequest()
  .input('Email', sql.VarChar, user.Email)
  .query('SELECT * FROM tbl_user WHERE Email=@Email')

  if(userFoundResponse.recordset[0]){
    if(await bcrypt.compare(user.Password,userFoundResponse.recordset[0].Password)){

      let token=jwt.sign({
        UserID:userFoundResponse.recordset[0].UserID,
        Password:userFoundResponse.recordset[0].Password,
        Email:userFoundResponse.recordset[0].Email
      },process.env.SECRET_KEY,{ expiresIn: "24h" })
      console.log("Token is",token);
      const {Password,...user}=userFoundResponse.recordset[0]
      return {user,token:`JWT ${token}`}

    }else{
      return { error: 'Invalid Credentials' };
    }
  }else{
    return { error: 'Invalid Credentials' };
  }
} catch (error) {
  
}
}

// Fetching all available users in the database
export const getAllUsersService=async(users)=>{
    try {
        const allUsers=poolRequest().query(`SELECT * FROM tbl_user`)
        return allUsers
    } catch (error) {
        return error
    }
}