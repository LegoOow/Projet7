module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
      "user", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nom: {
          type: Sequelize.STRING(40)
        },
        prenom: {
          type: Sequelize.STRING(40)
        },
        mail: {
          type: Sequelize.STRING(40)
        },
        password: {
            type: Sequelize.STRING(40),
        },
        admin: {
            type: Sequelize.TINYINT(3)
        } 
      },     
    );
    User.associate = function(models) {
      User.belongsTo(models.post, {
        foreignKey : 'id',
        targetKey: 'userId'
      });
    };
    return User;
  };