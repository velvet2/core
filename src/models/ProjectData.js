"use strict";

export default (Sequelize, DataTypes) => {
    let project = Sequelize.define("ProjectData", {
        project_id: DataTypes.INTEGER,
        data_id: DataTypes.INTEGER,
        label: DataTypes.STRING,
        inference: DataTypes.STRING
    }, {
      tableName: "project_data",
      createdAt: false,
      updatedAt: false
    });

    return project;
};
