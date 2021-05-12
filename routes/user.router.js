const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const isUser = require('../middleware/isUser');

router.get('/',auth(),user_controller.user_list);
router.get('/:id',auth(),user_controller.user_detail);
router.post('/addUser',user_controller.user_add);
router.post('/login',user_controller.user_login);
router.put('/:id',auth(),isUser(),user_controller.user_edit);
router.delete('/:id',auth(),isUser(),user_controller.user_delete);

module.exports = router;