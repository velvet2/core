"use strict";

export default (Sequelize, DataTypes) => {
    let data = Sequelize.define("Data", {
        id: {   type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        dataset_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        path: DataTypes.STRING
    }, {
      tableName: "datas",
      createdAt: false,
      updatedAt: false
    });

    return data;
};
