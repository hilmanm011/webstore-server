const express = require('express');
const router = express.Router();
const {index, viewCreate, actionsCreate, viewEdit, actionsEdit, actionsDelete, actionsStatus } = require('./controller')
const multer = require('multer')
const os = require('os')
const upload = multer({ dest: os.tmpdir() })

const { isLoginAdmin } = require('../middleware/auth');
router.use(isLoginAdmin)
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', upload.single('image'), actionsCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id',upload.single('image'), actionsEdit);
router.delete('/delete/:id', actionsDelete);
router.put('/status/:id', actionsStatus);

module.exports = router;
