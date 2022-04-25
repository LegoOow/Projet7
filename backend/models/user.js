module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
      "user", {
        username: {
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