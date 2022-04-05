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
    
    return User;
  };