module.exports = function Greet() {
  let name = ''
  let language = ''
  let Greeted = {}

  function setLanguage(lang) {
    language = lang
  }
  function setName(username) {
    name = username
  }

  function getName() {
    return name
  }
  function getLanguage() {
    return language
  }


  function getLanguage(name, language) {

    if (Greeted[name] === undefined) {
      Greeted[name] = 1;
    }
    else {
      Greeted[name]++
    }

    if (language === 'english') {
      return 'Hello, ' + name
    }
    if (language === 'isixhosa') {
      return 'Mholo, ' + name
    }

    if (language === 'sesotho') {
      return 'Dumela, ' + name
    }



  }

  function errorMessage(name, language) {

    if (!language && !name) {

      return "Please enter your name and language"
    }

    else if (!name) {
      return "Please enter your name"

    }

    else if (!language) {
      return "Please select a language"
    }

  }

  function clearNames() {
    Greeted = {}
  }

  function countNames() {
    return Object.keys(Greeted).length

  }
  function listofNames() {
    return Greeted
  }

  function resetButton(){
    return "Your Data has been cleared!"

  }

  return {
    resetButton,
    listofNames,
    clearNames,
    errorMessage,
    getName,
    setLanguage,
    getLanguage,
    setName,
    getName,
    countNames,


  }
}
