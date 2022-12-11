const express = require('express');
const router = express.Router();
const { viewSignin, actionSignin, actionsLogout } = require('./controller')

/* GET home page. */
router.get('/', viewSignin);
router.post('/', actionSignin);
router.get('/logout', actionsLogout);

module.exports = router;
