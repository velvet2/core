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
    }, {    tableName: "security_token",
            updatedAt: false,
            classMethods :  {
                associate: function(models) {
                    // console.log(models, token)
                    token.belongsTo(models.User, { foreignKey: 'user_id'})
                    // User.hasMany(models.Task)
                }
            }
        });

    // token.belongsTo
    // console.log(db);

    return token;
};
