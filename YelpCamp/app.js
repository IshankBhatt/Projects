var express         = require("express"),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    Campground      = require("./models/campground")


mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



/*Campground.create({
        name:"tehri",
        image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"kings live here"
    },function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("New created");
            console.log(campground);
        }
});*/

/*var campgrounds=[
    {name:"tehri",image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"mussorie",image:"https://images.pexels.com/photos/221436/pexels-photo-221436.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"chopta",image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"tehri",image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"mussorie",image:"https://images.pexels.com/photos/221436/pexels-photo-221436.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"chopta",image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"tehri",image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"mussorie",image:"https://images.pexels.com/photos/221436/pexels-photo-221436.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"chopta",image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"}
];*/


app.get("/",function(req,res){
    res.render("landing");
});

//INDEX -show all campgrounds
app.get("/campgrounds",function(req,res){
    //get campgrounds from db
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampgrounds})
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});
});

//NEW- show form to create new campground
app.get("/campgrounds/new",function(req,res){
    res.render("new")
});


//CREATE - add a new campground to DB
app.post("/campgrounds",function(req,res){
    //get data from form and add to campgraound array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name:name,image:image,description:desc};
    //create a new camp and save to database
    Campground.create(newCamp,function(err,newly){ 
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    })
    //campgrounds.push(newCamp);
    //redirect back to campground page
});
 
//SHOW-  shows infor about 1 camp
app.get("/campgrounds/:id",function(req,res){
    //find campground with provided id
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //render show template with that campground
            res.render("show",{campground: foundCampground});
        }
    });
    //render show template with that campground
    //res.render("show");
});


app.listen(8000,function(){
    console.log("The Yelpcamp Server has started");
});
