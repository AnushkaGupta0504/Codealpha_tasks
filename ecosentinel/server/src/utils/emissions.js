export const emissionFactors = {
  transportation: {
    car: 0.192, // kg CO2 per km (average passenger car)
    bus: 0.089, // kg CO2 per km per passenger
    bike: 0, // kg CO2 per km
    flight_short: 0.255, // kg CO2 per km per passenger short-haul
    flight_long: 0.195, // kg CO2 per km per passenger long-haul
  },
  energy: {
    electricity: 0.475, // kg CO2 per kWh (global average; varies widely)
    natural_gas: 2.1, // kg CO2 per m3 or per therm equivalent simplified
    renewable: 0.05, // kg CO2 per kWh (lifecycle)
  },
  food: {
    meat_heavy: 7.0, // kg CO2 per day equivalent
    vegetarian: 3.8,
    vegan: 2.9,
  },
  waste: {
    landfill: 1.2, // kg CO2 per kg waste (very rough)
    recycled: -0.2, // credit for recycling
  },
};

export function computeActivityEmissions(category, type, quantity, unit, details = {}) {
  let factor = 0;
  switch (category) {
    case 'transportation': {
      if (type === 'car') factor = emissionFactors.transportation.car;
      else if (type === 'bus') factor = emissionFactors.transportation.bus;
      else if (type === 'bike') factor = emissionFactors.transportation.bike;
      else if (type === 'flight_short') factor = emissionFactors.transportation.flight_short;
      else if (type === 'flight_long') factor = emissionFactors.transportation.flight_long;
      // quantity assumed in km
      return round2(quantity * factor);
    }
    case 'energy': {
      if (type === 'electricity') factor = emissionFactors.energy.electricity;
      else if (type === 'natural_gas') factor = emissionFactors.energy.natural_gas;
      else if (type === 'renewable') factor = emissionFactors.energy.renewable;
      // quantity assumed in kWh for electricity/renewable, m3/therm for gas (rough)
      return round2(quantity * factor);
    }
    case 'food': {
      if (type === 'meat') factor = emissionFactors.food.meat_heavy;
      else if (type === 'vegetarian') factor = emissionFactors.food.vegetarian;
      else if (type === 'vegan') factor = emissionFactors.food.vegan;
      // quantity assumed in days or unit meals; we multiply factor by quantity
      return round2(quantity * factor);
    }
    case 'waste': {
      if (type === 'landfill') factor = emissionFactors.waste.landfill;
      else if (type === 'recycled') factor = emissionFactors.waste.recycled;
      return round2(quantity * factor);
    }
    default:
      return 0;
  }
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}