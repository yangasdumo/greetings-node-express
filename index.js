const express = require('express');
const flash = require('express-flash')
const session = require('express-session')
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const greetings = require('./greetings.js')([]);

const app = express();

// const greeting = greetings();

app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.render("index", {
    
  })
});


app.post("/greet", function (req, res) {
  let name = req.body.name
  let language = req.body.language

  if (!name || !language) {
    let GreetAll = greetings.errorMessage(name, language)

    res.render("index", {
      GreetAll
    })

  } else {

    let GreetAll = greetings.getLanguage(name, language)
    let counter = greetings.countNames()

    res.render("index", {
      GreetAll, counter
    })
  }
});


app.get("/clear", function (req, res) {
  greetings.clearNames()
  res.redirect('/');
});
 


 app.get('/greeted', function (req,res){
    console.log(greetings.listofNames())
     res.render('names',{
       keynames:greetings.listofNames()})
 });


app.get("/counter/:name", function (req, res){
  let words = req.params.name
  let person = greetings.listofNames()

  for (const name in person) {
    if (name == words) {
      let greetedTimes = person[name]
      let Text = `Hi ${words} you were greeted ${greetedTimes}`
    }
  }
  res.render('/counter',{
    Text
  })
});

const PORT = process.env.PORT || 3074;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});