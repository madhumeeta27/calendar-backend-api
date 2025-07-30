module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    calendar_id: { type: DataTypes.BIGINT, allowNull: false },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    type: { type: DataTypes.ENUM('event', 'task'), allowNull: false },
    priority: {
  type: DataTypes.ENUM('low', 'medium', 'high'),allowNull:true

},
    heading: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    event_date: { type: DataTypes.DATEONLY, allowNull: false },
    event_time: { type: DataTypes.TIME, allowNull: true },
    attachment_urls: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'events',
    timestamps: false
  });

  Event.associate = function(models) {
    Event.belongsTo(models.Calendar, { foreignKey: 'calendar_id' });
    Event.belongsTo(models.User, { foreignKey: 'user_id' });
    Event.hasOne(models.EventDetail, { foreignKey: 'event_id' });
  };

  return Event;
}; 