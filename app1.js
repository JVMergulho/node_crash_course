const express = require('express')

// cria app express
const app = express()

// escuta na porta 3000
// retorna uma instância do server
app.listen(3000)

// função chamada quando chega um GET request
app.get('/', (req, res) => {

    // infere o tipo de conteúdo enviado e seta o header automaticamente
    //res.send('<p>home page</p>')

    res.sendFile('./views/index.html', {root: __dirname})
})
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname})
})

// redirects
app.get('/about-me', (req,res) => {
    res.redirects('/about')
})

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/notFound.html', {root: __dirname})
})