module.exports = app => {

    const commentCtrl = require('../controllers/comment');
    const router = require("express").Router();

    router.get("/", commentCtrl.getAllComment);
    router.post('/', commentCtrl.createComment);
    router.delete("/:id", commentCtrl.deleteComment);
    app.use('/api/comments', router);
  };