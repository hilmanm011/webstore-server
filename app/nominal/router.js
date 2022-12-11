const express = require('express');
const router = express.Router();
const {index, viewCreate, actionsCreate, viewEdit, actionsEdit, actionsDelete } = require('./controller')

const { isLoginAdmin } = require('../middleware/auth');
router.use(isLoginAdmin)
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionsCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionsEdit);
router.delete('/delete/:id', actionsDelete);

module.exports = router;
