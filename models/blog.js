const mongoose = require('mongoose')
const Schema = mongoose.Schema

// um schema define a estrutura do documento
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, {timestamps: true})

// modelo que procura na coleção 'blogs'
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog