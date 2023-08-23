'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roomBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roomBookings.belongsTo(models.User, {
        foreignKey:"userId",
      })

      roomBookings.belongsTo(models.rooms, {
        foreignKey:"roomId",
      })
    }
  }
  roomBookings.init({
    date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'roomBookings',
  });
  return roomBookings;
};