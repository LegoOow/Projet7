module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
      "comment", {
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