var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 1337;
var path = require('path');
app.use(cors());
app.use('/',express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json({
    limit: 1024102420,
    type: 'application/json' 
}));
var InvoiceRoute = require('./app/routes/InvoiceRoute');
app.use('/invoice',InvoiceRoute);
var server = app.listen(port);
app.listen(function(){
    console.log('Server running at http://localhost:' + port);
});