module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = function(models) {
    User.hasMany(models.Calendar, { foreignKey: 'created_by' });
    User.hasMany(models.Event, { foreignKey: 'user_id' });
    User.hasMany(models.Subscription, { foreignKey: 'user_id' });
  };

  return User;
}; 