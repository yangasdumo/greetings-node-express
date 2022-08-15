const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');


//database
const pgp = require('pg-promise')({});

const local_database_url = 'postgres://codex:codex123@localhost:5432/my_greet';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config ={
  connectionString 
}

if(process.env.NODE_ENV == "production"){
  config.ssl = {
      rejectUnauthorized: false
  }
}
const db = pgp(config);
//
const greetings = require('./greetings.js')(db);

const app = express();

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

  });
});


app.post("/greet",async function (req, res) {
  let name = req.body.name
  let language = req.body.language

  if (!name || !language) {
    let error = greetings.errorMessage(name, language)

    res.render("index", {
      error
    })

  } else {

    let GreetAll =await greetings.getLanguage(name, language)
    let counter = await greetings.countNames()

    res.render("index", {
      GreetAll, counter
    })

  }
});


app.get("/clear", async function (req, res) {
  let GreetAll = await greetings.resetButton()
  await greetings.clearNames()
  res.render('index', {
    GreetAll
  });
});



app.get('/greeted',async function (req, res) {
  res.render('names', {
    keynames: await greetings.listofNames()
  })
});


app.get("/counter/:name", async function (req, res) {
  let words = req.params.name
  let person =  await greetings.userCounter(words)
  var Text = ""
  Text = `Hi ${words} Your Name Has Been Greeted!! ${person.counter}`
  // for (let name of person) {
  //   console.log(name)
  //   if (name[greeted_names] == words) {
  //     let greetedTimes = person[name]
  //     Text = `Hi ${words} Your Name Has Been Greeted!! ${greetedTimes}`
  //   }
  // }
  // console.log("234567",person)
  res.render('counter', {
    Text
  });

});

const PORT = process.env.PORT || 3074;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});