var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("this will be landing page")
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The Yelpcamp Server has started");
    console.log("Port no. : "+server.port);
});