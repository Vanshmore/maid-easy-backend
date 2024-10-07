// src/services/maidService.js

import { Maid } from "../models/maid.model.js";

/**
 * Fetch available maids based on the given location.
 * @param {String} location - The location to search for maids.
 * @returns {Promise<Array>} - A promise that resolves to an array of available maids.
 */
export const getAvailableMaids = async (location) => {
  try {
    // Fetch maids from the database based on location
    const maids = await Maid.find({ location });
    return maids; // Return the list of available maids
  } catch (error) {
    throw new Error('Error fetching available maids: ' + error.message);
  }
};
