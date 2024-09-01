import { asyncHandler } from "../utils/asyncHandler.js";
import { Customer } from "../models/customer.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) => {
 
     const {fullName, email, password, phone, address } = req.body
     //console.log("email: ", email);

     if (
         [fullName, email, password, phone, address].some((field) => field?.trim() === "")
     ) {
         throw new ApiError(400, "All fields are required")
     }
 
     const existedUser = await Customer.findOne({
         $or: [{ email }]
     })
 
     if (existedUser) {
         throw new ApiError(409, "User with email or username already exists")
     }
     
 
     const user = await Customer.create({
         fullName,
         email, 
         password,
         phone,
         address
     })
     
     const createdUser = await Customer.findById(user._id).select(
         "-password -refreshToken"
     )
 
     if (!createdUser) {
         throw new ApiError(500, "Something went wrong while registering the user")
     }
 
     return res.status(201).json(
         new ApiResponse(200, createdUser, "User registered Successfully")
     )
 
 } )
 

export {registerUser}