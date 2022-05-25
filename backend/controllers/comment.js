const db = require("../models");
const User = db.users;
const Comment = db.comments;

// All post //
exports.getAllComment = (req, res, next) => {
    /*** on récupère tous les Commentaires ***/
    Comment.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }],
        })
        /*** si tout est ok ***/
        .then(comment => res.status(200).json({
            comment
        }))
        /*** sinon on envoie une erreur ***/
        .catch(error => res.status(400).json({
            error,
        }))

};

// Create Post //
exports.createComment = (req, res, next) => {
    const comment = {
        userId: req.body.userId,
        title: req.body.title
    }; 
    
    Comment.create(comment)
        .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
        .catch(error => res.status(400).json({ error }));
};

// Delete Comment //

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ 
        where: { 
            id: req.params.id 
        }}) // On trouve l'objet dans la base de données //
        .then((comment) => {
            comment.destroy({ where: { id: req.params.id } }) // Méthode //
                .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};