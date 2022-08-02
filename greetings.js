module.exports = function Greet() {
  let name = ''
  let language = ''
  let greeted = {}

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

    if (greeted[name] === undefined) {
      greeted[name] = 1;
    }
    else {
      greeted[name]++
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
    greeted = {}
  }

  function countNames() {
    return Object.keys(greeted).length

  }
  function listofNames() {
    return greeted
  }

  function resetButton() {
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
