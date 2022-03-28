module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
      "post", {
        id: {
          type: DataTypes.INT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: Sequelize.INT
        },
        title: {
          type: Sequelize.STRING(40)
        },
        date: {
          type: Sequelize.DATE
        },
      },     
    );
    Post.associate = function(models) {
      Post.belongsTo(models.user, {
        foreignKey : 'id',
        targetKey: 'userId'
      });
    };
    return Post;
  };