module.exports = (sequelize, DataTypes) => {
  const EventDetail = sequelize.define('EventDetail', {
    event_id: { type: DataTypes.BIGINT, allowNull: false },
    entry_type: { type: DataTypes.ENUM('licensing', 'doi reporting'), allowNull: true },
    reminder_minutes: { type: DataTypes.INTEGER, allowNull: true },
    reminder_emails: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'event_details',
    timestamps: false
  });

  EventDetail.associate = function(models) {
    EventDetail.belongsTo(models.Event, { foreignKey: 'event_id', onDelete: 'CASCADE' });
  };

  return EventDetail;
}; 