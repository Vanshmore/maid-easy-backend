import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js";
import { Customer } from "../models/customer.model.js";
import { Service } from "../models/serviceCategory.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { getAvailableMaids } from "../middlewares/avalaibleMaids.js"; 

// Create Job
export const createJob = asyncHandler(async (req, res) => {
  const { customerId } = req.params; // Get customerId from the request params
  const { serviceId, from, to, time, note } = req.body; // Using from and to for date range

  // Fetch customer details to get location
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new ApiError(404, 'Customer not found');
  }

  // Fetch service details
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  // Fetch available maids based on the customer's location (using 'area' instead of 'location')
  // const availableMaids = await getAvailableMaids(customer.area); 

  // // Check if there are available maids for the customer's area
  // if (availableMaids.length === 0) {
  //   throw new ApiError(404, 'No maids available for the selected location');
  // }

  // Create a new job with the date range and all relevant information
  const job = new Job({
    customerId: customer._id,
    serviceId: service._id, // Save the service ID
    dates: { from, to },   // To date for working days
    time,
    note,
    createdAt: new Date(),
    status: 'Pending', // Default status
  });

  // Save the new job
  await job.save();

  // Respond with the created job and available maids
  res.status(201).json(new ApiResponse(201, 'Job created successfully', { job }));
});
