module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
      "comment", {
        id: {
          type: DataTypes.INT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        UserId: {
          type: Sequelize.INT
        },
        PostId: {
            type: Sequelize.INT
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
        Post.belongsTo(models.post, {
            foreignKey : 'id',
            targetKey: 'postId'
          });
      };
      
    return Comment;
  };