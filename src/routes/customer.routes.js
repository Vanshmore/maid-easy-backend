import { Router } from "express";
// import { registerUser, verifyOtp, fetchLocation } from "../controllers/customer.controller.js";
import { registerUser, verifyOtp, fetchLocation, getCustomerHome, exploreServices } from "../controllers/customer.controller.js";

const router = Router()


router.route("/register").post(registerUser);


router.route("/register").post(registerUser);

// Route for OTP verification
router.route("/verify-otp").post(verifyOtp);

// Route for fetching user location after registration and OTP verification
router.route("/:customerId/location").get(fetchLocation);

router.route("/:customerId/home").get(getCustomerHome);

router.route("/:customerId/explore-services").get(exploreServices);
export default router;
