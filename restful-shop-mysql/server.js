const http = require("http");
const env = require("dotenv").config();
const port = process.env.SERVER_PORT || 3000;

const app = require("./app");
const server = http.createServer(app);

server.listen(port);
