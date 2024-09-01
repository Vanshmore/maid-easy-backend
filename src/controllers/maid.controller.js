// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { Maid } from "../models/maid.model.js";
// import puppeteer from 'puppeteer';

// const registerMaid = asyncHandler(async (req, res) => {
//     const { name, phone, password, address } = req.body;

//     if ([name, password, phone, address].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const existedUser = await Maid.findOne({ phone });

//     if (existedUser) {
//         throw new ApiError(409, "User with this phone number already exists");
//     }

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//         await page.goto('https://pcs.mahaonline.gov.in/Forms/CitizenVerification.aspx');
//         await page.type('#ContentPlaceHolder1_Label1', phone);
//         await page.click('#ContentPlaceHolder1_btnVerify');

//         await page.waitForSelector('.msgBoxContent');

//         const verificationResult = await page.evaluate(() => {
//             const contentDiv = document.getElementsByClassName('msgBoxContent')[0];
//             const listItem = contentDiv.getElementsByTagName('li')[0];
//             return listItem.innerText;
//         });

//         await browser.close();

//         if (!verificationResult.includes('Verified')) {
//             throw new ApiError(400, "Phone number verification failed");
//         }

//     } catch (error) {
//         await browser.close();
//         throw new ApiError(500, "Phone verification process encountered an error");
//     }

//     const user = await Maid.create({
//         name,
//         phone,
//         password,
//         address
//     });

//     const createdUser = await Maid.findById(user._id).select(
//         "-password -refreshToken"
//     );

//     if (!createdUser) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "User registered successfully")
//     );
// });

// export { registerMaid };






import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Maid} from "../models/maid.model.js";

const registerMaid = asyncHandler(async (req, res) => {
    const { name, phone, password, address } = req.body;

    if ([name, password, phone, address].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await Maid.findOne({ phone });

    if (existedUser) {
        throw new ApiError(409, "User with this phone number already exists");
    }

    const user = await Maid.create({
        name,
        phone,
        password,
        address
    });

    const createdUser = await Maid.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

export { registerMaid };
