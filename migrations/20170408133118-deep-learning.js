'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.createTable('dataset', {
        id: {   type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        name: Sequelize.STRING,
        path: Sequelize.STRING
    });

    queryInterface.createTable('label', {
        id: {   type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        dataset_id: Sequelize.INTEGER,
        name: Sequelize.STRING
    });

    queryInterface.createTable('data', {
        id: {   type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        dataset_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        path: Sequelize.STRING
    });

    queryInterface.createTable('data_label', {
        label_id: Sequelize.INTEGER,
        data_id: Sequelize.INTEGER,
        data: Sequelize.STRING,
    });

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropTable('dataset', callback);
    queryInterface.dropTable('label', callback);
    queryInterface.dropTable('data', callback);
    queryInterface.dropTable('data_label', callback);

  }
};
