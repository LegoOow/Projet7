const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
require('dotenv').config();

//Inscription
exports.signup= (req, res, next) => {
    User.findAll({ where: { email: req.body.email }},
            (err, results, rows) => {
                //Verification mail//
                if (results > 0) {
                    res.status(401).json({
                        message: 'Email non disponible.'
                    });
                    //Si email disponible
                } else {
                //Crypt password//
                bcrypt.hash(req.body.password, 10)
                .then(cryptedPassword => {
                    //Add to BDD//
                    User.create({
                        nom : req.body.nom,
                        prenom : req.body.prenom,
                        email : req.body.email,
                        password : cryptedPassword,
                        admin : 0
                    },
                        (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).json("erreur");
                            }
                            return res.status(201).json({
                                message: 'Votre compte a bien été crée !'
                            });
                        }
                    );
                })
                .catch(error => res.status(500).json({ error })
                
                );
            }
    });
};

exports.login = (req, res, next) => {
    User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                res.status(200).json({
                    userId: user.id,
                    admin: user.admin,
                    username: user.username,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.JWT_SECRET_TOKEN,
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
        } else {
            return res.status(404).json({ error: 'Cet utilisateur n\'existe pas, veuillez créer un compte' })
        }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
}

exports.getUserProfile = (req, res, next) => {
    User.findAll({ where: { id: req.params.id }},
        (error, result, rows) => {
            if (error) {
                return res.status(400).json({ error });
            }
            return res.status(200).json(result);
        }
    );
}