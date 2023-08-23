'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rooms.hasMany(models.roomBookings, {
        foreignKey:'roomId',
      });
    }
  }
  rooms.init({
    room_name: DataTypes.STRING,
    room_thumbnail: DataTypes.STRING,
    size: DataTypes.INTEGER,
    availability: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rooms',
  });
  return rooms;
};