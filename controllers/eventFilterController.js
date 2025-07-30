const { Op } = require('sequelize');
const { Event } = require('../models');

exports.filterEvents = async (req, res) => {
  try {
    // Extract query parameters
    const { month, year, priority } = req.query;

    // Validate month and year
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (
      isNaN(parsedMonth) || isNaN(parsedYear) ||
      parsedMonth < 1 || parsedMonth > 12 || parsedYear < 1000
    ) {
      return res.status(400).json({
        error: 'Invalid month or year. Month must be 1-12 and year must be 4-digit.'
      });
    }

    // Validate priority if provided
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}`
      });
    }

    // Create date range for the given month and year
    const startDate = new Date(parsedYear, parsedMonth - 1, 1);
    const endDate = new Date(parsedYear, parsedMonth, 0); // last day of that month

    // Build where clause for filtering
    const where = {
      event_date: {
        [Op.between]: [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ]
      }
    };

    if (priority) {
      where.priority = priority;
    }

    // Log the final query for debugging
    console.log('Filtering Events WHERE:', where);

    // Fetch matching events
    const events = await Event.findAll({ where });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error filtering events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
