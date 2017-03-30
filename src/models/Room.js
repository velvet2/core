"use strict";

export default (Sequelize, DataTypes) => {
    let room = Sequelize.define("Room", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING
    });

    return room;
};
