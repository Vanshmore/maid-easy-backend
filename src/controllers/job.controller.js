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
  const { serviceId, serviceType, date, from, to, time, note } = req.body; // Includes date for 'One day' and from/to for 'Range'

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

  // Validate serviceType and handle dates accordingly
  if (serviceType === 'One day' && !date) {
    throw new ApiError(400, 'A date is required for One day service');
  } else if (serviceType === 'Range' && (!from || !to)) {
    throw new ApiError(400, 'Both from and to dates are required for Range service');
  }

  // Create the job object with conditional date handling
  const jobData = {
    customerId: customer._id,
    serviceId: service._id,
    serviceType,
    time,
    note,
    createdAt: new Date(),
    status: 'Pending', // Default status
  };

  // Handle dates based on service type
  if (serviceType === 'One day') {
    jobData.date = date;
  } else if (serviceType === 'Range') {
    jobData.dates = { from, to };
  }
  
  // Create a new job with the relevant information
  const job = new Job(jobData);

  // Save the new job
  await job.save();

  // Respond with the created job
  res.status(201).json(new ApiResponse(201, 'Job created successfully', { job }));
});
