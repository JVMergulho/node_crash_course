const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// conectar com mongodb
const db_URI = 'mongodb+srv://jvm_localhost:240124test@cluster0.vqoimuf.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_URI)
.then((result) => {
    console.log('connected to db')

    // escuta na porta 3000
    // retorna uma instância do server
    app.listen(3000)
})
.catch((err) => console.log(err))

// cria app express
const app = express()

// view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))

// decode to url into an object
app.use(express.urlencoded())

// printa um log com informações sobre o request 
app.use(morgan('dev'))

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'second blog',
        snippet: 'about my blog',
        body: 'even mooooore about my blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About' })
})

//blogs routes

// função chamada quando chega um GET request para o root
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: "All Blogs", blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            console.log("Blog added")
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    console.log('Redirect to create')
    res.render('create',{title: 'New Blog' })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then(result => {
            res.render('details', {title: 'Blog Details', blog: result})
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err)
        })
})

// 404 page
app.use((req, res) => {
    res.render('notFound', {title: '404' })
})