"use strict";

export default (Sequelize, DataTypes) => {
    let user = Sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return user;
};
