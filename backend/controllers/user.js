const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/database');
require('dotenv').config();

//Inscription
exports.register= (req, res, next) => {
    db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,
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
                    db.query(`INSERT INTO users VALUES (NULL, '${req.body.nom}', '${req.body.prenom}', '${cryptedPassword}', '${req.body.email}' , 0)`,
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
                .catch(error => res.status(500).json({error})
                
                );
            }
    });
};

exports.login = (req, res, next) => {
    //Search users in BDD//
    db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,
        (err, results, rows) => {
            //if users find// 
            if (results) {
                //Password verification//
                bcrypt.compare(req.body.password, results[0].password)
                    .then(valid => {
                        //if not valid//
                        if (!valid) {
                            res.status(401).json({ message: 'Mot de passe incorrect' });
                            //if valid, token create//
                        } else {
                            res.status(200).json({
                                userId: results[0].id,
                                nom: results[0].nom,
                                prenom: results[0].prenom,
                                admin: results[0].admin,
                                token: jwt.sign(
                                    { userId: results[0].id }, 
                                    process.env.TOKEN, 
                                    { expiresIn: '8h' }
                                )
                            });
                        }
                    });
            } else {
                res.status(404).json({ message: 'Utilisateur inconnu' });
            }
        }
    );
};

exports.getUserProfile = (req, res, next) => {
    console.log('getUserProfile', req.params.id)
    db.query(`SELECT * FROM users WHERE id='${req.params.id}'`,
        (error, result, rows) => {
            console.log('error', error)
            console.log('result', result)
            if (error) {
                return res.status(400).json({ error });
            }
            return res.status(200).json(result);
        }
    );
}