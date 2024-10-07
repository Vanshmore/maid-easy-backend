import { Router } from "express";
// import { registerUser, verifyOtp, fetchLocation } from "../controllers/customer.controller.js";
import { registerUser, fetchLocation, getCustomerHome, exploreServices} from "../controllers/customer.controller.js";
import { createJob } from "../controllers/job.controller.js"; // Import the job controller

const router = Router()


router.route("/register").post(registerUser);


router.route("/register").post(registerUser);


// Route for fetching user location after registration and OTP verification
router.route("/:customerId/location").get(fetchLocation);

router.route("/:customerId/home").get(getCustomerHome);

// Explore services (fetch all available services)
// router.route("/explore-services").get(exploreServices);
router.route("/:customerId/explore-services").get(exploreServices);

// Route for creating a job
router.route("/:customerId/create-job").post(createJob);


export default router;
