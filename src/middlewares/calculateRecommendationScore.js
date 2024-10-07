import geopy from 'geopy.distance';

const calculate_location_similarity = (customerLocation, maidLocation) => {
  return geopy.distance.distance(customerLocation, maidLocation).km;
};

const calculate_recommendation_score = (maid, customer) => {
  const location_score = 1 / (1 + calculate_location_similarity(customer.location, maid.location));
  
  const service_score = customer.selectedService in maid.services ? 1 : 0;
  
  const days_match = customer.workingDays.some(day => maid.availability.days.includes(day));
//   const time_match = /* Implement logic to check time overlap */;
  
  const availability_score = days_match && time_match ? 1 : 0;
  
  const rating_score = maid.rating / 5;

  return (0.4 * location_score) + (0.3 * service_score) + (0.2 * availability_score) + (0.1 * rating_score);
};
