module.exports = app => {
    const user = require('../controllers/user');
    const router = require("express").Router();
    router.post('/signup', user.signup);
    router.post('/login', user.login);
    router.get('/profile/:id', user.getUserProfile);
    app.use('/api/user', router);
  };