module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
      "post", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING(40)
        },
        date: {
          type: Sequelize.DATE
        },
      },     
    );
    return Post;
  };