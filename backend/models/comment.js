module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
      "comment", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: Sequelize.INTEGER
        },
        postId: {
            type: Sequelize.INTEGER
          },
        date: {
          type: Sequelize.DATE
        },
      },     
    );
      
    return Comment;
  };