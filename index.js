const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.get("/", function(req, res){
//     res.sendFile("/html/other2.html",  {root: __dirname + '/public/'});
// });
//
// app.use("/", function(req, res){
//     res.sendFile("/html/other2.html",  {root: __dirname + '/public/'});
// });

// app.use("/", require('./routes/indexRoutes.js'));
// app.use("/orders", require('./routes/orderRoutes.js'));


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else
    {
        next(err);
    }
});

const hostname = 'localhost';
const port = 3003;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
