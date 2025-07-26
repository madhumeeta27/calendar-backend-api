const { EventDetail } = require('../models');

exports.createEventDetail = async (req, res) => {
  try {
    const detail = await EventDetail.create(req.body);
    res.status(201).json(detail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEventDetail = async (req, res) => {
  try {
    const detail = await EventDetail.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: 'Not found' });
    await detail.update(req.body);
    res.json(detail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 