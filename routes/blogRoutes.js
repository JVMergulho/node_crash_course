const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

// MVC approach
// Model -> Controller -> View
// Controler: use Models to get data and pass it to Views

router.get('/blogs', blogController.blog_index)
router.get('/blogs/search', blogController.blog_index)
router.post('/blogs', blogController.blog_create_post)

// '/blogs/create' tem que vir antes de '/blogs/:id'
// as rotas são checadas na ordem em que aparecem no código
router.get('/blogs/create', blogController.blog_create_get)

router.get('/blogs/:id', blogController.blog_details)
router.delete('/blogs/:id', blogController.blog_delete)

module.exports = router