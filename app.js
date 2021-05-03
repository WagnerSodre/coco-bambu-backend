const http = require('http'); 
const express = require('express'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
app.get('/', (req, res, next) => {
    res.json({message: "API is working"});
})

const server = http.createServer(app); 

server.listen(process.env.PORT);
console.log(`Server is listening port ${process.env.PORT}`);