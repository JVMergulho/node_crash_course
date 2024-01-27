// import Blog module by getting to 'controllers' parent dir ('..') and entering 'models' dir
const Blog = require('../models/blog')

const blog_index = (req, res) => {

    const searchTerm = req.query.searchTerm

    if (searchTerm) {
        // Se searchTerm existe, faça uma busca filtrada no banco de dados
        Blog.find({ title: new RegExp(searchTerm, 'i') })
            .then((result) => {
                res.render('blogs/index', { title: "Search Results", blogs: result});
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        Blog.find()
            .sort({createdAt: -1})
            .then((result) => {
                res.render('blogs/index', {title: "All Blogs", blogs: result})
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const blog_create_get = (req,res) => {
    res.render('blogs/create',{title: 'New Blog' })
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_details = (req, res) => { 
    const id = req.params.id
    Blog.findById(id)
            .then(result => {
                res.render('blogs/details', {title: 'Blog Details', blog: result})
            })
            .catch(err => {
                res.status(404).render('notFound', {title: '404' })
            })
}

const blog_delete = (req,res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete
}