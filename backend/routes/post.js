module.exports = app => {

    const userCtrl = require('../controllers/post');
    const router = require("express").Router();

    router.get("/", userCtrl.getAllPost);
    router.get("/:id", userCtrl.getOnePost);
    app.use('/api/posts', router);
  };