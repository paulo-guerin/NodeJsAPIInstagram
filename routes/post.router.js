const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const isUserPost = require('../middleware/isUserPost');
const multer = require('../middleware/multer-config');

router.get('/',auth(),post_controller.post_list);
router.get('/:id',auth(),post_controller.post_detail);
router.post('/addPost',auth(),multer,post_controller.post_add);
router.put('/:id',auth(),isUserPost(),multer,post_controller.post_edit);
router.delete('/:id',auth(),isUserPost(),post_controller.post_delete);

module.exports = router;