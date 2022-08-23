const greeter = require("./greet-functions");
module.exports = function routes(greetings,greeter) {

  async function home(req, res) {
    res.render("index", {
    });
  }

  async function greets(req, res) {
    let name = req.body.name
    let language = req.body.language

    if (!name || !language) {
      let error = greeter.errorMessage(name, language)
      res.render("index", {
        error
      })

    } else {

      let GreetAll = await greeter.message(name, language);
      await greetings.getLanguage(name)
      let counter = await greetings.countNames()
      res.render("index", {
        GreetAll, counter
      })

    }

  };
  async function greeted(req, res) {
    const keynames = await greetings.listofNames()
    res.render('names', {
      keynames
    });
  }

  async function counter(req, res) {
    let words = req.params.name
    let person = await greetings.userCounter(words)
    Text = `Hi ${words} you have been greeted ${person.counter} time(s)`
    res.render('counter', {
      Text
    });
  }

  async function clear(req, res) {
      let GreetAll = await greetings.resetButton()
      await greetings.clearNames()
      res.render('index', {
        GreetAll
      });
    };

  return {
    greets,
    home,
    clear,
    greeted,
    counter,
  }
}



