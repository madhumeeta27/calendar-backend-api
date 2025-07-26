const { Event } = require('../models');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listEvents = async (req, res) => {
  const where = {};
  if (req.query.calendar_id) where.calendar_id = req.query.calendar_id;
  const events = await Event.findAll({ where });
  res.json(events);
};

exports.getEvent = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: 'Not found' });
  res.json(event);
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: 'Not found' });
  await event.destroy();
  res.json({ message: 'Deleted' });
}; 