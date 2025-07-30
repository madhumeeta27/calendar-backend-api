const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const eventRoutes = require('./routes/eventRoutes');
const eventDetailRoutes = require('./routes/eventDetailRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const eventFilterRoutes = require('./routes/eventFilterRoutes');


const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/calendars', calendarRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-details', eventDetailRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api', eventFilterRoutes);


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
