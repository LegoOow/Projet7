module.exports = app => {
    const users = require('../controllers/user');
    const router = require("express").Router();
    router.post('/signup', users.signup);
    router.post('/login', users.login);
    router.get('/profile/:id',  users.getUserProfile);
    app.use('/api/users', router);
  };