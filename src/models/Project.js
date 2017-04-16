"use strict";

export default (Sequelize, DataTypes) => {
    let project = Sequelize.define("Project", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        dataset: DataTypes.INTEGER,
        label: DataTypes.STRING
    });

    return project;
};
