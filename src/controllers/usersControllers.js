import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import { authenticateUserService, getAllUsersService, registerNewUserService } from "../services/userService.js"
import { RegisterUserValidator,loginUserValidator } from "../utils/Validators.js";
import { notAuthorized, sendCreated, sendServerError} from "../helpers/helperFunctions.js"


export const createNewUserController = async (req, res) => {
    try {
      const { Username, Email, Password, TagName, Location } = req.body;
      console.log(req.body);
  
      const UserID = v4();
      const { error } = RegisterUserValidator({ Username, Email, Password, TagName, Location });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const hashedPassword = await bcrypt.hash(Password, 8);
        const registeredUser = { UserID, Username, Email, Password: hashedPassword, TagName, Location };
  
        const result = await registerNewUserService(registeredUser);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'User created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const loginUserController = async (req, res) => {
    try {
      const { Email, Password } = req.body;
        const { error } = loginUserValidator({ Email, Password });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const user = await authenticateUserService({ Email, Password });
      console.log(user);
      if (user.error) {
        return notAuthorized(res, user.error);
      }
  
      // Successful login
      res.status(200).json({ user });
    } catch (error) {
      return sendServerError(res, "Internal server error");
    }
  };
  

  export const getAllUsersController = async (req, res) => {
    try {
      const results = await getAllUsersService()
        const users=results.recordset
        console.log(users);
      res.status(200).json({ Users: users });
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json("Internal server error");
    }
  };
  