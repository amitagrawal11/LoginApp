
var express  = require("express");

var app = express();

// hosting static contents of your site using app.use e.g.
//app.use(express.static('<folderName>'));

// routing 
app.get('/', function (req, res) {
    res.send("Hello World");
});

app.listen(5000, function(err){
    console.log('listening server over port no 5000'); 
});



// it is just to test what is inside express
//console.log('express object contains :', app);


