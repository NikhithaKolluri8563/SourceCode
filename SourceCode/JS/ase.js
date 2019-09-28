var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('GET route on ASE.');
});
router.post('/', function(req, res){
    res.send('POST route on ASE.');
});


//export this router to use in our cs.js
module.exports = router;