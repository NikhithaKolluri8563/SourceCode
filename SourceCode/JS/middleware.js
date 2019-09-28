var express = require('express')
var app = express()

var myLogger = function (req, res, next) {
    console.log('2. LOGGED')
    next()
}

var requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    console.log('1. time requested')
    next()
}

app.use(requestTime);
app.use(myLogger);


app.get('/', function (req, res, next) {
    var responseText = 'Hello World!<br>'
    responseText += '<small>Requested at: ' + req.requestTime + '</small>'
    res.send(responseText)
})


app.listen(3000)