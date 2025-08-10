import Activity from '../models/Activity.js';

export async function getRecommendations(req, res, next) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const activities = await Activity.find({ userId: req.user.id, date: { $gte: since } });

    const tips = new Set();

    const hasCar = activities.some((a) => a.category === 'transportation' && a.type === 'car');
    if (hasCar) tips.add('Consider carpooling or using public transport for short trips.');

    const hasFlights = activities.some((a) => a.category === 'transportation' && a.type.startsWith('flight'));
    if (hasFlights) tips.add('Offset your flight emissions and pack lighter to reduce weight.');

    const highElectricity = sumBy(activities, (a) => (a.category === 'energy' && a.type === 'electricity' ? a.quantity : 0));
    if (highElectricity > 300) tips.add('Switch to LED bulbs and unplug devices to reduce standby power.');

    const meatDays = sumBy(activities, (a) => (a.category === 'food' && a.type === 'meat' ? a.quantity : 0));
    if (meatDays >= 3) tips.add('Try a meatless Monday to cut food-related emissions.');

    const lowRecycling = sumBy(activities, (a) => (a.category === 'waste' && a.type === 'recycled' ? a.quantity : 0));
    if (lowRecycling < 5) tips.add('Increase recycling and composting to reduce landfill waste.');

    if (tips.size === 0) tips.add('Great job! Keep logging activities to get personalized tips.');

    res.json({ tips: Array.from(tips) });
  } catch (err) {
    next(err);
  }
}

function sumBy(items, selector) {
  return items.reduce((acc, item) => acc + (selector(item) || 0), 0);
}