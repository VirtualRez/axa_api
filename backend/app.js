//IMPORTS
var express = require('express');
var cors = require('cors'); //cors problems
var bodyParser = require('body-parser');
var fs = require('fs');
//var process = require('process');
var bcrypt = require('bcrypt'); //crypt passwords
var jsonwebtoken = require('jsonwebtoken'); //make tokens
var expressjwt = require('express-jwt'); //headers tokens
//REQUEST
const request = require('request');

//ARCHIVO SECRETS
// var secretsRaw = fs.readFileSync('secrets.json');
// var secrets = JSON.parse(secretsRaw);
// var miClave = secrets.jwt_clave;

//CREATE SERVER
var app = express();

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
//app.use(expressjwt({
//   secret: miClave
// }).unless({
//   path: ["/login", "/register"]
// })); //comrpueba que el token esté en nuestros path escepto en login y register

//API AXA
var client = "http://www.mocky.io/v2/5808862710000087232b75ac"
var policies = "http://www.mocky.io/v2/580891a4100000e8242b75c5"

app.get('/gClient', (req, response) => {//json Client
    request.get(client, (err, res, body) => { response.send(body) })
});

app.get('/gPolicies', (req, response) => {//json Policies
    request.get(policies, (err, res, body) => { response.send(body) })
});

app.post('/login', (req, response) => {//login
    request.get(client, (err, res, body) => {
        var data = JSON.parse(body);
        var resultado = data.clients.filter(element => element.email === req.body.msg);
        console.log(resultado);

        if (resultado.length == 0) {



            response.send("No existe usuario");
        } else {
            response.send("Bienvenido");
        }
    });
});



















//SERVER LISTENING
console.log("Escuchando en puerto 3000!");
app.listen(3000);
