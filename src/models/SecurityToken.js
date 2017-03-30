"use strict";

export default (Sequelize, DataTypes) => {
    let token = Sequelize.define("SecurityToken", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
        info: DataTypes.TEXT
    }, { tableName: "security_token", updatedAt: false});

    return token;
};
