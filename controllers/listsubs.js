// controllers/subscribedCalendars.js
const { Subscription, Calendar } = require('../models');

exports.listSubscribedCalendars = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    // 1. Get all calendar IDs the user has subscribed to
    const subscriptions = await Subscription.findAll({
      where: { user_id },
      attributes: ['calendar_id']
    });

    const calendarIds = subscriptions.map(sub => sub.calendar_id);

    if (calendarIds.length === 0) return res.json([]); // no subs

    // 2. Fetch calendar details for those IDs
    const calendars = await Calendar.findAll({
      where: { id: calendarIds }
    });

    res.json(calendars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
