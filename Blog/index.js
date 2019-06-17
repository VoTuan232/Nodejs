const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const app = express()

// static file
app.use(express.static('public'))
    // view engine
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
    // mongodb
mongoose.connect('mongodb://localhost/node')


app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    res.render('index'); // use views
})

app.listen(3000, () => {
    console.log('App listening at port 3000');
})