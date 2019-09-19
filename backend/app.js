//IMPORTS
var express = require('express');
var cors = require('cors'); //cors problems
var bodyParser = require('body-parser');
var fs = require('fs'); 
var process = require('process'); 
var bcrypt = require('bcrypt'); //crypt passwords
var jsonwebtoken = require('jsonwebtoken'); //make tokens
var expressjwt = require('express-jwt'); //headers tokens