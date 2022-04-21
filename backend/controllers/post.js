const db = require("../models");
const Post = db.posts;
const User = db.users;

// All post //
exports.getAllPost = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', "DESC"]] ,
        include: [{
            model: User,
            attributes: ['nom','prenom']
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
// NewPost //
exports.newPost = (req, res, next) => {
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.userId}', NOW(), '${req.body.content}')`, (error, result, field) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(201).json({
            message: 'Votre post à été publié !'
        })
        
    });
};
// OnePost //
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