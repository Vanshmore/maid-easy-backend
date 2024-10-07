import { asyncHandler } from "../utils/asyncHandler.js";
import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/serviceCategory.model.js";  

// Register/Save User after Firebase Authentication
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, googleId } = req.body; // Remove phone and add googleId

  let customer = await Customer.findOne({ googleId });
  if (customer) {
    return res.status(200).json(new ApiResponse(200, 'User already exists', { customerId: customer._id }));
  }

  customer = new Customer({ fullName, email, googleId }); // Updated to use googleId
  await customer.save();

  res.status(201).json(new ApiResponse(201, 'User registered successfully', { customerId: customer._id }));
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

// Customer Home - Display services and highly-rated maids based on location
export const getCustomerHome = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  // Fetch the customer based on customerId
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new ApiError(404, 'User not found');
  }

  // Ensure customer has a location before fetching services/maids
  if (!customer.location) {
    throw new ApiError(400, 'Location not set for user');
  }

  // Fetch services from the database
  const services = await Service.find({}).limit(3); // Assuming you have the Service model now

  // Fetch maids based on location (for now, all maids are displayed)
  const maids = [
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
  // const maids = await Maid.find({ location: customer.location });

  res.status(200).json(new ApiResponse(200, 'Customer home data fetched successfully', { services, maids }));
});

// Fetch All Services (for Explore Services page)
export const exploreServices = asyncHandler(async (req, res) => {
  // Fetch all services from the database
  const services = await Service.find({}); 

  // Check if any services exist
  if (!services || services.length === 0) {
    throw new ApiError(404, 'No services found');
  }

  // Return the services in the response
  res.status(200).json(new ApiResponse(200, 'Services fetched successfully', { services }));
});
