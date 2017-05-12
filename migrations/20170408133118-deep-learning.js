'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.createTable('datasets', {
        id: {   type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        name: Sequelize.STRING,
        path: Sequelize.STRING
    });

    queryInterface.createTable('datas', {
        id: {   type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        dataset_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        path: Sequelize.STRING
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropTable('datasets', callback);
    queryInterface.dropTable('datas', callback);
  }
};
