//IMPORTS
var express = require('express');
var cors = require('cors'); //cors problems
var bodyParser = require('body-parser');
var fs = require('fs');
//var process = require('process');
var jwt = require('jsonwebtoken'); //make tokens
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

//API AXA
var client = "http://www.mocky.io/v2/5808862710000087232b75ac"
var policies = "http://www.mocky.io/v2/580891a4100000e8242b75c5"

app.get('/api/Client', verifyToken, (req, response) => {//json Client
    request.get(client, (err, res, body) => { response.send(body) })
});

//USER SEARCH
app.get('/api/username/:userName', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secret', function (err, decoded) {
        if (err) {
            response.send({ message: 'Token fail validation' })
        } else {
            let clientName = req.params.userName;
            request.get(client, (err, res, body) => {
                var data = JSON.parse(body);
                var dataParsed = data.clients;
                var resultInfoUser = dataParsed.find(element => { return element.name === clientName });
                if (typeof resultInfoUser != "object") {
                    response.send({ message: "Name doesn't exist." })
                } else {
                    resultInfoUser.message = "Ok";
                    response.send(resultInfoUser);
                }
            })
        }
    })
})

app.get('/api/userid/:userId', verifyToken, (req, response) => {
    jwt.verify(req.token, 'secret', function (err, decoded) {
        if (err) {
            response.send('Token fail validation')
        } else {
            let clientId = req.params.userId;
            request.get(client, (err, res, body) => {
                var data = JSON.parse(body);
                var dataParsed = data.clients;
                var resultInfoUser = dataParsed.find(element => { return element.id === clientId });
                if (typeof resultInfoUser != "object") {
                    response.send({ message: "ID doesn't match." })
                } else {
                    resultInfoUser.message = "Ok";
                    response.send(resultInfoUser);
                }
            })
        }
    })
})

//ADMIN SEARCH
app.get('/api/admin/policies/:name', verifyToken, (req, response) => {//Policies associates to user name
    jwt.verify(req.token, 'secret', function (err, decoded) {
        if (err) {
            response.send({ message: 'Token fail validation' })
        } else {
            request.get(client, (err, res, body) => {
                var data = JSON.parse(body);
                var dataParsed = data.clients;
                var resultInfoClient = dataParsed.find(element => { return element.name === req.params.name });
                if (typeof resultInfoClient != "object") {//control error
                    response.send({ message: "This user doesn't exist." })
                } else {
                    var idClient = resultInfoClient.id;
                    request.get(policies, (err, res, body) => {
                        var data = JSON.parse(body);
                        var dataParsed = data.policies;
                        var resultPoliciesByID = dataParsed.filter(element => { return element.clientId === idClient });
                        if (resultPoliciesByID.length == 0) {
                            response.send({ message: "This user doesn't have any policies." })
                        } else {
                            response.send(resultPoliciesByID)
                        }
                    })

                }
            })
        }
    })
});

app.get('/api/admin/user/:policy', verifyToken, (req, response) => {//Admin send the policy number and we return user info.
    jwt.verify(req.token, 'secret', function (err, decoded) {
        if (err) {
            response.send({message:'Token fail validation'})
        } else {
            let policyId = req.params.policy;
            request.get(policies, (err, res, body) => {
                var data = JSON.parse(body);
                var dataParsed = data.policies;
                var resultPolicies = dataParsed.find(element => { return element.id === policyId });
                if (typeof resultPolicies != "object") {//control error
                    response.send({message:"This policies doesn't exist."})
                } else {
                    var userData = resultPolicies.clientId;
                    request.get(client, (err, res, body) => {
                        var data = JSON.parse(body);
                        var dataParsed = data.clients;
                        var resultClient = dataParsed.find(element => { return element.id === userData });
                        response.send(resultClient)
                    })
                }
            })
        }
    })
});

//LOGIN
app.post('/login', (req, response) => {
    request.get(client, (err, res, body) => {
        var data = JSON.parse(body);
        var resultado = data.clients.filter(element => element.email === req.body.email);
        console.log(resultado, req.body);
        if (resultado.length == 0) {
            response.send({ message: "The user doesn't exist." });
        } else if (resultado[0].role == 'user') {
            var token = jwt.sign({ email: req.body.email }, 'secret')
            response.send({ message: "ok", token: token, role: "user" });
        } else {
            var token = jwt.sign({ email: req.body.email }, 'secret')
            response.send({ message: "ok", token: token, role: "admin" });
        }
    });
});

//TOKEN VERIFICATION
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();//jump to the next function
    } else {
        res.sendStatus(403);
    }
}


















//SERVER LISTENING
console.log("Escuchando en puerto 3000!");
app.listen(3000);
