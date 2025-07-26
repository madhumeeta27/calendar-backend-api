module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    calendar_id: { type: DataTypes.BIGINT, allowNull: false },
    subscribed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'subscriptions',
    timestamps: false
  });

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User, { foreignKey: 'user_id' });
    Subscription.belongsTo(models.Calendar, { foreignKey: 'calendar_id' });
  };

  return Subscription;
}; 