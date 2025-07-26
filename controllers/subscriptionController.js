const { Subscription } = require('../models');

exports.subscribe = async (req, res) => {
  try {
    const { user_id, calendar_id } = req.body;
    const sub = await Subscription.create({ user_id, calendar_id });
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unsubscribe = async (req, res) => {
  const sub = await Subscription.findByPk(req.params.id);
  if (!sub) return res.status(404).json({ error: 'Not found' });
  await sub.destroy();
  res.json({ message: 'Unsubscribed' });
};

exports.listSubscriptions = async (req, res) => {
  const where = {};
  if (req.query.user_id) where.user_id = req.query.user_id;
  const subs = await Subscription.findAll({ where });
  res.json(subs);
}; 