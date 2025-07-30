const { Calendar } = require('../models');


const { Op } = require('sequelize');

exports.listCalendars = async (req, res) => {
  const userId = parseInt(req.query.user_id);  // 👈 Change #1

  if (!userId) {
    return res.status(400).json({ error: 'Missing user_id in query params' });  // 👈 Change #2: Error handling
  }

  try {
    const calendars = await Calendar.findAll({
      where: {
        [Op.or]: [
          { visibility: 'public' },
          { visibility: 'private', created_by: userId }
        ]
      }
    });

    res.status(200).json(calendars);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching calendars' });
  }
};


exports.createCalendar = async (req, res) => {
  try {
    const { name, type, created_by, source } = req.body;
    const calendar = await Calendar.create({ name, type, created_by, source });
    res.status(201).json(calendar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCalendar = async (req, res) => {
  const calendar = await Calendar.findByPk(req.params.id);
  if (!calendar) return res.status(404).json({ error: 'Not found' });
  res.json(calendar);
}; 