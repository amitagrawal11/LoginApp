//Step 1 - defnning dependencies 
var express  = require("express");

//Step 2 - Getting instance of express
var app = express();

//Step 3 - Starting service and listening it
app.listen(3000, function(err) {
	if(err){
		console.log("Getting Error" + err);
	} else {
		console.log("Listening Port 3000");
	}
});