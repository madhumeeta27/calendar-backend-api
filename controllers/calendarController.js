const { Calendar } = require('../models');

exports.listCalendars = async (req, res) => {
  const calendars = await Calendar.findAll();
  res.json(calendars);
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