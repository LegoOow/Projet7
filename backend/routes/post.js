module.exports = app => {

    const userCtrl = require('../controllers/post');
    const router = require("express").Router();

    router.get("/", userCtrl.getAllPost);
    router.get("/:id", userCtrl.getOnePost);
    router.post('/', userCtrl.createPost);
    router.delete('/:id', userCtrl.deletePost);
    app.use('/api/posts', router);
  };