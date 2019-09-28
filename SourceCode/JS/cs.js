var express = require('Express');
var app = express();

var ase = require('./ase.js');

//both ase.js and cs.js should be in same directory
app.use('/ase', ase);

//dynamic routing
app.get('/ase/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});
app.listen(3000);