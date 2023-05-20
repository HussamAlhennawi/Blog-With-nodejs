const express = require('express')
const blogController = require('../controllers/blogController')
const auth = require('../middlewares/authMiddleware')
const modifyBlog = require('../middlewares/modifyBlogMiddleware')

const router = express.Router();

router.use(auth)
    .get('/', blogController.index)
    .get('/create', blogController.create)
    .post('/', blogController.store)
    .get('/:id', blogController.show)
    .get('/:id/edit', modifyBlog, blogController.edit)
    .put('/:id', modifyBlog, blogController.update)
    .delete('/:id', modifyBlog, blogController.destroy)

module.exports = router;
