const { Subscription, Event, Calendar } = require('../models');

exports.listSubscribedEvents = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    // Step 1: Get all calendar IDs the user is subscribed to
    const subscriptions = await Subscription.findAll({
      where: { user_id },
      attributes: ['calendar_id']
    });

    const calendarIds = subscriptions.map(sub => sub.calendar_id);

    if (calendarIds.length === 0) {
      return res.json([]); // No subscriptions → no events
    }

    // Step 2: Fetch events from subscribed calendars
    const events = await Event.findAll({
      where: {
        calendar_id: calendarIds
      },
      include: [
        {
          model: Calendar,
          attributes: ['id', 'name', 'type', 'source']
        }
      ],
      attributes: [
        'id',
        'calendar_id',
        'user_id',
        'type',
        'priority',
        'heading',
        'description',
        'event_date',
        'event_time',
        'attachment_urls',
        'created_at'
      ]
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

