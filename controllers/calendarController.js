const { Calendar, User, Subscription } = require('../models');
const { Op } = require('sequelize');

// Get all calendars (existing)
exports.listCalendars = async (req, res) => {
  const calendars = await Calendar.findAll();
  res.json(calendars);
};

// Create a new calendar (existing)
exports.createCalendar = async (req, res) => {
  try {
    const { name, type, created_by, source } = req.body;
    const calendar = await Calendar.create({ name, type, created_by, source });
    res.status(201).json(calendar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get calendar by ID (existing)
exports.getCalendar = async (req, res) => {
  const calendar = await Calendar.findByPk(req.params.id);
  if (!calendar) return res.status(404).json({ error: 'Not found' });
  res.json(calendar);
};

// NEW: Get "My Calendars" - combines user's own calendars + subscribed calendars
exports.getMyCalendars = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Get user's own calendars
    const ownCalendars = await Calendar.findAll({
      where: { created_by: user_id },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    // Get subscribed calendars
    const subscribedCalendars = await Calendar.findAll({
      include: [
        {
          model: Subscription,
          where: { user_id: user_id },
          required: true
        },
        {
          model: User,
          as: 'User',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    // Combine and format the response
    const myCalendars = [
      ...ownCalendars.map(cal => ({ ...cal.toJSON(), isOwned: true, isSubscribed: false })),
      ...subscribedCalendars.map(cal => ({ ...cal.toJSON(), isOwned: false, isSubscribed: true }))
    ];

    res.json(myCalendars);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// NEW: Browse Calendars - shows all public calendars available for subscription
exports.browseCalendars = async (req, res) => {
  try {
    const { user_id } = req.query;
    
    // Get all public calendars (not created by the current user)
    const publicCalendars = await Calendar.findAll({
      where: {
        [Op.or]: [
          { source: 'public' },
          { type: 'holiday' },
          { type: 'event' }
        ],
        created_by: {
          [Op.ne]: user_id // Not created by current user
        }
      },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    // If user_id is provided, check which ones they're already subscribed to
    if (user_id) {
      const subscribedIds = await Subscription.findAll({
        where: { user_id },
        attributes: ['calendar_id']
      });
      
      const subscribedCalendarIds = subscribedIds.map(sub => sub.calendar_id);
      
      const calendarsWithSubscriptionStatus = publicCalendars.map(calendar => ({
        ...calendar.toJSON(),
        isSubscribed: subscribedCalendarIds.includes(calendar.id)
      }));
      
      res.json(calendarsWithSubscriptionStatus);
    } else {
      res.json(publicCalendars);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// NEW: Create user's default calendars (My Calendar, Events, Holidays)
exports.createUserDefaultCalendars = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Check if user already has default calendars
    const existingCalendars = await Calendar.findAll({
      where: { 
        created_by: user_id,
        type: { [Op.in]: ['my', 'event', 'holiday'] }
      }
    });

    if (existingCalendars.length > 0) {
      return res.status(400).json({ 
        error: 'User already has default calendars',
        existingCalendars: existingCalendars.map(cal => ({ id: cal.id, name: cal.name, type: cal.type }))
      });
    }

    // Create default calendars
    const defaultCalendars = [
      { name: 'My Calendar', type: 'my', created_by: user_id },
      { name: 'Events', type: 'event', created_by: user_id },
      { name: 'Holidays', type: 'holiday', created_by: user_id }
    ];

    const createdCalendars = await Calendar.bulkCreate(defaultCalendars);
    
    res.status(201).json({
      message: 'Default calendars created successfully',
      calendars: createdCalendars
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// NEW: Update calendar
exports.updateCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, source } = req.body;
    
    const calendar = await Calendar.findByPk(id);
    if (!calendar) {
      return res.status(404).json({ error: 'Calendar not found' });
    }
    
    await calendar.update({ name, type, source });
    res.json(calendar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// NEW: Delete calendar
exports.deleteCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    
    const calendar = await Calendar.findByPk(id);
    if (!calendar) {
      return res.status(404).json({ error: 'Calendar not found' });
    }
    
    await calendar.destroy();
    res.json({ message: 'Calendar deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 