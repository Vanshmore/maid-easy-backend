// import { asyncHandler } from "../utils/asyncHandler.js";
// import { Customer } from "../models/customer.model.js"
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// // Generate OTP (4-digit random number)
// const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// // Register User (with Name and Phone)
// export const registerUser = asyncHandler(async (req, res) => {
//   const { fullName, phone } = req.body;

//   let customer = await Customer.findOne({ phone });
//   if (customer) {
//     throw new ApiError(400, 'User already exists with this phone number');
//   }

//   const otp = generateOtp(); // Generate OTP
//   customer = new Customer({ fullName, phone, otp });

//   await customer.save();

//   // TODO: Send OTP via SMS (integrate with SMS service)
//   res.status(201).json(new ApiResponse(201, 'OTP sent successfully', { otp })); // Return OTP for now
// });

// // Verify OTP
// export const verifyOtp = asyncHandler(async (req, res) => {
//   const { phone, otp } = req.body;

//   const customer = await Customer.findOne({ phone });
//   if (!customer) {
//     throw new ApiError(404, 'User not found');
//   }

//   if (customer.otp !== otp) {
//     throw new ApiError(400, 'Invalid OTP');
//   }

//   customer.isVerified = true;
//   customer.otp = null; // Clear OTP after verification
//   await customer.save();

//   res.status(200).json(new ApiResponse(200, 'User verified successfully', { customerId: customer._id }));
// });

// // Example for fetching location after registration (can use some third-party service)
// export const fetchLocation = asyncHandler(async (req, res) => {
//   const { customerId } = req.params;

//   const customer = await Customer.findById(customerId);
//   if (!customer) {
//     throw new ApiError(404, 'User not found');
//   }

//   // TODO: Implement location fetching logic (use service to auto-fetch location)
//   customer.location = "Sample Location"; // Simulate location
//   await customer.save();

//   res.status(200).json(new ApiResponse(200, 'Location fetched successfully', { location: customer.location }));
// });


import { asyncHandler } from "../utils/asyncHandler.js";
import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Generate OTP (4-digit random number)
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Register User (with Name and Phone)
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, phone } = req.body;

  let customer = await Customer.findOne({ phone });
  if (customer) {
    throw new ApiError(400, 'User already exists with this phone number');
  }

  const otp = generateOtp(); // Generate OTP
  customer = new Customer({ fullName, phone, otp });

  await customer.save();

  // TODO: Send OTP via SMS (integrate with SMS service)
  res.status(201).json(new ApiResponse(201, 'OTP sent successfully', { otp })); // Return OTP for now
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  const customer = await Customer.findOne({ phone });
  if (!customer) {
    throw new ApiError(404, 'User not found');
  }

  if (customer.otp !== otp) {
    throw new ApiError(400, 'Invalid OTP');
  }

  customer.isVerified = true;
  customer.otp = null; // Clear OTP after verification
  await customer.save();

  res.status(200).json(new ApiResponse(200, 'User verified successfully', { customerId: customer._id }));
});

// Fetch User Location after registration (simulate location fetching for now)
export const fetchLocation = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new ApiError(404, 'User not found');
  }

  // TODO: Implement actual location fetching (using a location service)
  customer.location = "Sample Location"; // Simulate location for now
  await customer.save();

  res.status(200).json(new ApiResponse(200, 'Location fetched successfully', { location: customer.location }));
});

// Mock Data for services and maids
const mockServices = [
  { name: "Cooking" },
  { name: "Cleaning" },
  { name: "Babysitting" },
  { name: "Caretaking" }
];

const mockMaids = [
  {
    name: "Alice",
    rating: 4.9,
    services: ["Cooking", "Cleaning"]
  },
  {
    name: "Maria",
    rating: 4.8,
    services: ["Babysitting"]
  },
  {
    name: "Emma",
    rating: 4.7,
    services: ["Caretaking", "Cooking"]
  }
];

// Customer Home - Display services and highly-rated maids based on location
export const getCustomerHome = asyncHandler(async (req, res) => {
  const { customerId } = req.params;


// Explore more


  // Fetch the customer based on customerId
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new ApiError(404, 'User not found');
  }

  // Ensure customer has a location before fetching services/maids
  if (!customer.location) {
    throw new ApiError(400, 'Location not set for user');
  }

  // Use mock services and maids data
  const services = mockServices.slice(0, 3); // Limiting to 3 services for the homepage
  const maids = mockMaids; // All maids are displayed for now

  res.status(200).json(new ApiResponse(200, 'Customer home data fetched successfully', { services, maids }));
});
// Explore More Services - Display all services with detailed tasks
export const exploreServices = asyncHandler(async (req, res) => {
  const services = [
    {
      category: "Cooking Services",
      details: [
        {
          service: "Meal Preparation",
          tasks: ["Breakfast preparation", "Lunch preparation", "Dinner preparation"]
        },
        {
          service: "Grocery Shopping",
          tasks: ["Assist in purchasing groceries and ingredients"]
        }
      ]
    },
    {
      category: "Cleaning Services",
      details: [
        {
          service: "General House Cleaning",
          tasks: ["Sweeping", "Mopping", "Dusting"]
        },
        {
          service: "Deep Cleaning",
          tasks: ["Carpet cleaning", "Curtain cleaning", "Upholstery cleaning"]
        },
        {
          service: "Bathroom and Kitchen Cleaning",
          tasks: ["Bathroom cleaning", "Kitchen cleaning"]
        },
        {
          service: "Window Cleaning",
          tasks: ["Cleaning of windows (inside and outside)"]
        },
        {
          service: "Laundry and Ironing",
          tasks: ["Washing clothes", "Ironing clothes"]
        }
      ]
    },
    {
      category: "Babysitting/Nanny Services",
      details: [
        {
          service: "Childcare for Different Age Groups",
          tasks: ["Infants", "Toddlers", "School-age children"]
        },
        {
          service: "Basic Childcare Duties",
          tasks: ["Bathing children", "Feeding children", "Dressing children"]
        }
      ]
    },
    {
      category: "Caretaking/Elder Care Services",
      details: [
        {
          service: "Assistance with Daily Living",
          tasks: ["Bathing", "Dressing", "Eating assistance"]
        },
        {
          service: "Medication Management",
          tasks: ["Assisting with administering medications"]
        },
        {
          service: "Mobility Support",
          tasks: ["Helping elderly people move around"]
        }
      ]
    },
    {
      category: "Pet Care Services",
      details: [
        {
          service: "Walking Pets",
          tasks: ["Dog walking and exercising"]
        },
        {
          service: "Feeding Pets",
          tasks: ["Regular feeding of pets"]
        },
        {
          service: "Grooming Pets",
          tasks: ["Basic pet grooming (brushing, bathing)"]
        }
      ]
    },
    {
      category: "Gardening Services",
      details: [
        {
          service: "Lawn Mowing",
          tasks: ["Mowing lawns and grass trimming"]
        },
        {
          service: "Plant Care",
          tasks: ["Watering and caring for plants"]
        },
        {
          service: "Garden Maintenance",
          tasks: ["General upkeep of garden areas"]
        }
      ]
    }
  ];

  res.status(200).json(new ApiResponse(200, 'Explore Services data fetched successfully', { services }));
});
