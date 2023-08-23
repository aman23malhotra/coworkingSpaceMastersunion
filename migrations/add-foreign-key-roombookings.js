module.exports = {
    up(queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn(
          'roomBookings', // table name
          'userId', // new field name
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        ),
        queryInterface.addColumn(
          'roomBookings',
          'roomId',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        ),
      ]);
    },
  
    down(queryInterface, Sequelize) {
      // logic for reverting the changes
      return Promise.all([
        queryInterface.removeColumn('roomBookings', 'userId'),
        queryInterface.removeColumn('roomBookings', 'roomId'),
      ]);
    },
  };