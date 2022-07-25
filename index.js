const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const greetings= require('./greetings.js');

const app = express();
 
 const greeting = greetings();

 app.engine('handlebars',exphbs.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/",function(req,res){
  res.render("index",{
     GreetAll: greeting.getLanguage() +" "+ greeting.getName()
  })
});

app.post("/greetings",function(req,res){
  var names = req.body.name;
  var radio = req.body.language;
  greeting.setName(names);
  greeting.setLanguage(radio);
  // greeting.getN();

res.redirect('/')
});

app.get("/actions",function(req,res){
    
 res.render('actions');
});

const  PORT = process.env.PORT || 3033;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});