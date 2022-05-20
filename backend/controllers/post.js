const db = require("../models");
const Post = db.posts;
const User = db.users;

// All post //
exports.getAllPost = (req, res, next) => {
    /*** on récupère tous les posts ***/
    Post.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }],
        })
        /*** si tout est ok ***/
        .then(post => res.status(200).json({
            post
        }))
        /*** sinon on envoie une erreur ***/
        .catch(error => res.status(400).json({
            error,
        }))

};

// One post //

exports.getOnePost = (req, res, next) => {
    /*** on récupére id du post depuis la base de données ***/
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => res.status(200).json({
            post
        }))
        .catch(error => res.status(404).json({
            error,
            message: 'impossible de récupèrer un post'
        }))
};

