const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router();

router
    .get('/', blogController.index)
    .get('/create', blogController.create)
    .post('/', blogController.store)
    .get('/:id', blogController.show)
    .get('/edit/:id', blogController.edit)
    .put('/:id', blogController.update)
    .delete('/:id', blogController.destroy)

module.exports = router;
