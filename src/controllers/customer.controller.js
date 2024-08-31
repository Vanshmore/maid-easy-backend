import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req, res) => {
     // return res.status(201).json(
     //      new ApiResponse(200, createdUser, "User registered Successfully")
     //  )

     res.status(200).json({
          message:"ok"
     })
  
  } )

export {registerUser}