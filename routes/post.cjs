const express = require("express");
const postController = require("../controllers/post.cjs");
const router = express.Router();

//post routes
router.post("/", postController.createPost); //works
router.delete("/:id", postController.deletePost); //works
router.put("/:id", postController.updatePost); //works
//like/dislike
router.put("/like/:id", postController.incrementLikes); //works
router.put("/unlike/:id", postController.decrementLikes); //works
router.put("/dislike/:id", postController.incrementDislikes); //works
router.put("/undislike/:id", postController.decrementDislikes); //works
router.put("/comment/:id", postController.commentToPost); //works

router.get("/:id", postController.getPost); //works
router.get("/", postController.getAllPosts); //works
router.get("/byuser/:userId", postController.getAllUserPosts); //works

module.exports = router;
