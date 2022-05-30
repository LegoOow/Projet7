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

// Create Comment //
exports.createComment = (req, res, next) => {
    db.Post.findOne({
        where: { id: req.params.postId }
    })
    .then(postFound => {
        if(postFound) {
            const comment = db.Comment.build({
                content: req.body.content,
                postId: postFound.id,
                userId: userId
            })
            comment.save()
                .then(() => res.status(201).json({ message: 'Votre commentaire a bien été créé !' }))
                .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
}

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