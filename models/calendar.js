module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define('Calendar', {
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('my', 'holiday', 'event', 'subscribed'), allowNull: false },
    created_by: { type: DataTypes.BIGINT, allowNull: true },
    source: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'calendars',
    timestamps: false
  });

  Calendar.associate = function(models) {
    Calendar.belongsTo(models.User, { foreignKey: 'created_by' });
    Calendar.hasMany(models.Event, { foreignKey: 'calendar_id' });
    Calendar.hasMany(models.Subscription, { foreignKey: 'calendar_id' });
  };

  return Calendar;
}; 