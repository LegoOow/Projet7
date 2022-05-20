module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post", {
      userId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(40)
      },
    },     
  );
  return Post;
};