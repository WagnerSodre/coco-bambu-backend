const http = require('http'); 
const express = require('express'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const auth = require('./auth/auth');

dotenv.config();

const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose
  .connect('mongodb://database:27017/', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });
 
app.get('/', (req, res, next) => {
    res.json({message: "API is working"});
})

app.get('/recipe', auth.verifyJWT, (req, res, next) => { 
    let recipe = {
        "ingredients": {
          "cebola": 1,
          "dentes de alho": 2,
          "colheres de sopa de azeite": 3,
          "tomates": 4,
          "pitadas de sal": 2,
          "embalagem de marisco (mistura)": 1,
          "embalagem de camarão inteiro congelado": 1,
          "chávena arroz": 1,
          "porção de coentros": 1
        },
        "steps": [
          `Faça um refogado com o azeite a cebola e os dentes de alho bem picados. Esmague os tomates maduros sem pele e junte ao refogado. Tempere com sal. Deixe "namorar" durante alguns minutos.`,
          `Deixe a descongelar a embalagem de cocktail de marisco e delícias do mar, retire-as também do congelador e ponha-as de parte.`,
          `Junte os mariscos (as delícias ficam para mais tarde) ao refogado e mexa. Com o lume brando, tape o tacho e deixe "namorar" durante 15 minutos.`,
          `Junte água a tapar esta mistura e assim que ferver deite o arroz e mexa. \n
          Quando retomar a fervura, deixe cozer tapado durante 10 minutos, vá mexendo para não pegar.`,
          `Apague o lume, junte as delícias cortadas em cubinhos e polvilhe com coentros picados. Sirva de seguida.`,
          `Depois temos o Arroz de Marisco Tradicional que leva todo o tipo marisco, desde sapateira, lagosta, mexilhões e etc.`
        ]
    }
    res.json(recipe);
}) 
 
app.post('/auth/login', (req, res, next) => { 
    auth.login(req, res);
}) 
 
app.post('/auth/logout', function(req, res) {
    auth.logout(req, res);
})

const server = http.createServer(app); 

server.listen(process.env.PORT);
console.log(`Server is listening port ${process.env.PORT}`);