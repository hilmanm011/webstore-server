const express = require('express');
const router = express.Router();
const { 
    landingPage, 
    detailPage, 
    category, 
    checkout, 
    history, 
    historyDetail, 
    dashboard, 
    profile, 
    editProfile 
} = require('./controller')
const { isLoginPlayer } = require('../middleware/auth')

const multer = require('multer')
const os = require('os')
const upload = multer({ dest: os.tmpdir() })

router.get('/landingpage', landingPage);
router.get('/detail/:id', detailPage);
router.get('/category', category);
router.post('/checkout',isLoginPlayer, checkout);
router.get('/history',isLoginPlayer, history);
router.get('/history/detail/:id',isLoginPlayer, historyDetail);
router.get('/dashboard',isLoginPlayer, dashboard);
router.get('/profile',isLoginPlayer, profile);
router.put('/profile', 
    isLoginPlayer, 
    upload.single('image'), 
    editProfile
);

module.exports = router;
