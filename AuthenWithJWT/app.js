const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    // make user
    const user = {
            id: 1,
            username: 'votuan',
            email: 'votuanbk232@gmail.com',
        }
        // jwt: payload, secret, callback
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token: token,
        })
    })
})

// Format Token: 
// Authentication: Bearer <access_token>
//verifyToken middleware
function verifyToken(req, res, next) {
    // Get auth header value: authorization có value: 
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InZvdHVhbiIsImVtYWlsIjoidm90dWFuYmsyMzJAZ21haWwuY29tIn0sImlhdCI6MTU2MTM3MTg5Nn0.OTPqgZGHVLpimONvfdqI8uG59devLTG5jaULsXVnU6U
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(3000);