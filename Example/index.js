const express = require('express')

const path = require('path')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
        console.log(path.resolve(__dirname, 'index.html'));
        res.sendFile(path.resolve(__dirname, 'index.html'));
    })
    // app.get('/', (req, res) => {
    //     res.json({
    //         name: 'Vo Tuan'
    //     })
    // }) => json
    // app.get('/about', (req, res) => {
    //     res.send({
    //         name: 'Vo Tuan'
    //     })
    // }) => json
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})