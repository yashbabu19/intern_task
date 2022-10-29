const router = require('express').Router();
const { signUp, verifyOtp, logOut } = require('../Controllers/userController');

router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verifyOtp);
router.route('/logout')
    .post(logOut)

module.exports = router;