const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

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

// decode url into an object
app.use(express.urlencoded())

// printa um log com informações sobre o request 
app.use(morgan('dev'))

// routes

app.get('/about', (req, res) => {
    res.render('about', {title: 'About' })
})

// função chamada quando chega um GET request para o root
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

//blog routes
app.use(blogRoutes)

// 404 page
app.use((req, res) => {
    res.render('notFound', {title: '404' })
})