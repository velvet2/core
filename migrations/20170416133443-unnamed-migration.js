'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.createTable('projects', {
        id: {   type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        name: Sequelize.STRING,
        dataset_id: Sequelize.INTEGER,
        label: Sequelize.STRING,
        config: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    queryInterface.createTable('project_data', {
        project_id: Sequelize.INTEGER,
        data_id: Sequelize.INTEGER,
        label: Sequelize.STRING,
        inference: Sequelize.STRING
    });


  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
