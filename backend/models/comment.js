module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment", {
      userId: {
        type: Sequelize.INTEGER
      },
      postId: {
          type: Sequelize.INTEGER
        },
      content: {
        type: Sequelize.STRING(40)
      },
    },     
  );
  return Comment;
};