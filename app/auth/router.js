const express = require('express');
const router = express.Router();
const { signup, signin } = require('./controller')
const multer = require('multer')
const os = require('os')
const upload = multer({ dest: os.tmpdir() })

router.post('/signup',upload.single('image'), signup);
router.post('/signin', signin);
module.exports = router;
