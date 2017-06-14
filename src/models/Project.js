export default (Sequelize, DataTypes) => {
    let project = Sequelize.define("Project", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        dataset_id: DataTypes.INTEGER,
        label: DataTypes.STRING,
        config: DataTypes.STRING
    });

    return project;
};
