import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js"; // Assuming you have a Job model
import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAvailableMaids } from "../middlewares/avalaibleMaids.js"; // Import the function

// Create Job
export const createJob = asyncHandler(async (req, res) => {
  const { customerId } = req.params; // Get customerId from the request params
  const { serviceId, dates, time, note } = req.body;

  // Fetch customer details to get location
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new ApiError(404, 'User not found');
  }

  // Fetch available maids based on the customer's location
  const availableMaids = await getAvailableMaids(customer.location);

  // Check if there are available maids
  if (availableMaids.length === 0) {
    throw new ApiError(404, 'No maids available for the selected location');
  }

  // Create a new job
  const job = new Job({
    customerId: customer._id,
    serviceId,
    dates,
    time,
    note,
    createdAt: new Date(),
    status: 'Pending', // Default status
  });

  await job.save();

  res.status(201).json(new ApiResponse(201, 'Job created successfully', { job, availableMaids }));
});
