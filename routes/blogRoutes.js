const express = require('express')
const blogController = require('../controllers/blogController')
const auth = require('../middlewares/authMiddleware')

const router = express.Router();

router.use(auth)
    .get('/', blogController.index)
    .get('/create', blogController.create)
    .post('/', blogController.store)
    .get('/:id', blogController.show)
    .get('/:id/edit', blogController.edit)
    .put('/:id', blogController.update)
    .delete('/:id', blogController.destroy)

module.exports = router;
