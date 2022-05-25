const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

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
                id: req.params.id,
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(post => res.status(200).json({
            post
        }))
        .catch(error => res.status(404).json({
            error,
            message: 'impossible de récupèrer un post'
        }))
};

// Create Post //
exports.createPost = (req, res, next) => {
    const post = {
        userId: req.body.userId,
        title: req.body.title
    }; 
    
    Post.create(post)
        .then(() => res.status(201).json({ message: "Message envoyé!" }))
        .catch(error => res.status(400).json({ error }));
};

// Delete Post //

exports.deletePost = (req, res, next) => {
    Post.findOne({ 
        where: { 
            id: req.params.id 
        }}) // On trouve l'objet dans la base de données //
        .then((post) => {
            post.destroy({ where: { id: req.params.id } }) // Méthode //
                .then(() => res.status(200).json({ message: 'Post supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Permet de modifier un message
exports.modifyPost = (req, res, next) => {
    
    console.log('title', req.body.title);
    const postObject = { title: req.body.title }
    console.log('body', req.body)

    Post.findOne({
        where: { id: req.params.id },
    })
    .then(postFound => {
        if(postFound) {
            Post.update(postObject, {
                where: { id: req.params.id }
            })
            .then(post => res.status(200).json({ message: 'Votre message a bien été modifié !' }))
            .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite !' }))
        }
        else {
            res.status(404).json({ error: 'Message non trouvé' });
        }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
}

exports.modifyPost = (req, res) => {
    const id = req.params.id;
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Post with id=" + id
        });
      });
};

