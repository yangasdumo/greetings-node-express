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
    // GreetAll: greetings.getLanguage() + " " + greetings.getName()
  })
});


app.post("/", function (req, res) {
  res.render("index", {
    name: greetings.setName(req.body.name),
    radio: greetings.setLanguage(req.body.language),
    // counter: greetings.getN(),
    GreetAll: greetings.getLanguage() + " " + greetings.getName()
  })
});


app.post("/greetings", function (req, res) {
  var names = req.body.name;
  var radio = req.body.language;

  greetings.setName(names);
  greetings.setLanguage(radio);
  greetings.getN();

  if (!names && !radio) {
    req.flash('info', greetings.errorMessage(names, radio));

  };
  if (!radio) {
    req.flash('info', 'Please select language!');

  };
  if (!names) {
    req.flash('info', 'Please enter your name!');
  };
  res.redirect('/')
});
app.get("/counter/:names", function (req, res) {
  let op = res.params.name
  let bob = greetings.objectname()
  for (names in bob) {
    if (names === op) {
      let Number = bob[names]
      let text = `Hello ${op} your name has been already greeted ${number} times`

    }
  }
  res.render('counter', {
    text
  });
});
app.get("/clear", function (req, res) {
  greetings.clearbutton()
  res.redirect('/');
});

const PORT = process.env.PORT || 3044;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});