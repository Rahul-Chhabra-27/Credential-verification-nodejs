const router = require('express').Router();
const { registerHanlder, loginHandler } = require('../../controllers/user-controller/user-controller');

router.post('/', registerHanlder);
router.post('/login',loginHandler)

module.exports = router;