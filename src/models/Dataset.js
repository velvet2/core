export default (Sequelize, DataTypes) => {
    let data = Sequelize.define("Dataset", {
        id: {   type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        name: DataTypes.STRING,
        path: DataTypes.STRING
    }, {
      tableName: "datasets",
      createdAt: false,
      updatedAt: false
    });

    return data;
};
