module.exports = app => {

    const postCtrl = require('../controllers/post');
    const router = require("express").Router();

    router.get("/", postCtrl.getAllPost);
    router.get("/:id", postCtrl.getOnePost);
    router.post('/', postCtrl.createPost);
    router.delete("/:id", postCtrl.deletePost);
    router.put('/:postId', postCtrl.modifyPost);
    app.use('/api/posts', router);
  };