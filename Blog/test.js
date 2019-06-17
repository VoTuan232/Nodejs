const mongoose = require('mongoose');

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node', { useNewUrlParser: true })

Post.create({
    title: 'My First Blog',
    description: 'Blog post discription',
    content: 'Lorem ipsum content'
}, (error, post) => {
    console.log(error, post);
})