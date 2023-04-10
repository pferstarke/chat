const express = require('express');
const userController = require('../controllers/userControllers');
const auth = require('../auth');

const router = express.Router();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

// router.get('/findUser', auth.verify, userController.getProfile);
router.get('/find/:userId', userController.findUser);

router.get('/getUsers', userController.getUsers);




module.exports = router;