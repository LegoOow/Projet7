const db = require("../models");
const Post = db.posts;
const User = db.users;

// All post //
exports.getAllPost = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', "DESC"]] ,
        include: [{
            model: User,
            attributes: ['username']
        }]
    })

    .then(postFound => {
        
        if(postFound) {
            res.status(200).json(postFound);
        } else {
            res.status(404).json({ error: 'Aucun message trouvé' });
        }
    })
    .catch(error => {
                res.status(500).send({ error: '⚠ Oops, une erreur s\'est produite !' });
    });
};

// One post //

exports.getOnePost = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Post with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Post with id=" + id
        });
      });
};

// NewPost //
exports.newPost = (req, res, next) => {   
    const content = req.body.content;
    
    // Permet de vérifier que tous les champs sont complétés
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de contrôler la longueur du titre et du contenu du message
    if (content.length <= 4) {
        return res.status(400).json({ error: 'Le contenu du message doit contenir au moins 4 caractères' });
    }
    
    User.findOne({
        where: { id: req.body.userId }
    })
    
    .then(userFound => {
        if(userFound) {
            const post = Post.build({
                content: req.body.content,
                userId: userFound.id
            })
            post.save()
            .then(() => res.status(201).json({ message: 'Votre message a bien été créé !' }))
            .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
};

// OnePost //
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where : { id: req.params.postId }
    })
};
exports.getOnePost = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};
// Delete OnePost //
exports.deleteOnePost = (req, res, next) => {
    db.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};
// Modify OnePost // 
exports.modifyOnePost = (req, res, next) => {
    db.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};
// Get User's Posts //
exports.getUserPosts = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};