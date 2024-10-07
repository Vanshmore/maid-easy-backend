import { Customer } from "../models/customer.model.js";
import { Maid } from "../models/maid.model.js";
import { Job } from "../models/job.model.js";
import fs from 'fs';
export const fetchData = async () => {
  const customers = await Customer.find({});
  const maids = await Maid.find({});
  const jobs = await Job.find({});

  return { customers, maids, jobs };
};
const { customers, maids, jobs } = await fetchData();

const dataToSave = {
  customers,
  maids,
  jobs
};

fs.writeFileSync('data.json', JSON.stringify(dataToSave));