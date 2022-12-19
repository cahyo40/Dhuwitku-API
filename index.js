var express = require('express');
// var cors = require('cors');
var bodyParser = require('body-parser');
var routes = require('./route/routes')
var app = express();
var dotenv = require('dotenv');
const port = 3001;

// app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

routes(app);
app.route('/', () => {
    console.log("h");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})