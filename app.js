//jshint esversion6

const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname + "/date.js"); 

console.log(date());
const { redirect } = require("express/lib/response");

const app= express();
let items =[];
let workItems=[];
let studyItems=[];
// SHould be below line 6 because if declared above will result in error app used before declaration 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res){
    let day=date();
    res.render("list", {listItems: day, newListItems: items});
}); 

// HOME PAGE
app.post("/", function(req, res){
    // console.log(req.body);
    let item= req.body.newItem;
    if(req.body.list =="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else if(req.body.list=="Study"){
        studyItems.push(item);
        res.redirect("/study");
    }
    else{
        items.push(item);
        res.redirect("/");
    }


});

// WORK PAGE
app.get("/work", function(req,res){
    res.render("list",{listItems: "Work List", newListItems:workItems})
});

app.post("/work", function(req,res){
    let item=req.body.newItem;
    workItems.push(item);

    res.redirect("/work");
});


// STUDY PAGE
app.get("/study", function(req,res){
    res.render("list",{listItems: "Study List",newListItems:studyItems})
});
app.post("/study", function(req,res){
    let item=req.body.newItem;
    studyItems.push(item);

    res.redirect("/study");
});


//ABOUT PAGE
app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000,function(){
    console.log("Server started at port 3000");
});