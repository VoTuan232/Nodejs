// const http = require('http');
// const fs = require('fs');

// const aboutPage = fs.readFileSync('about.html');
// const contactPage = fs.readFileSync('contact.html');
// const homePage = fs.readFileSync('home.html');

// const server = http.createServer((request, response) => {
//     if (request.url === '/') {
//         return response.end(homePage);
//     } else if (request.url === '/about') {
//         return response.end(aboutPage);
//     } else if (request.url === '/contact') {
//         return response.end(contactPage);
//     } else {
//         response.writeHead(404);
//         response.end('The Page Not Found');
//     }
// })

// server.listen(3000);