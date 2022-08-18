module.exports = function Greet(db) {
  let name = ''
  let language = ''

  var alphabets = /^[a-z A-Z]+$/;

  async function setLanguage(lang) {
    language = lang
  }
  async function setName(username) {
    name = username
  }

  async function getName() {
    return name
  }
  async function getLanguage() {
    return language
  }


  async function getLanguage(names, language) {

    
    let name = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();
    
    let show = await db.oneOrNone('select greeted_names from my_greet where greeted_names = $1', [name])
    
    if (show === null && alphabets.test(names) == true) {
      await db.none('insert into my_greet (greeted_names, counter) values ($1, $2)', [name, 1])
    }
    else if(alphabets.test(names) == true && !show === null) {
      await db.none('UPDATE my_greet SET counter = counter + 1 WHERE greeted_names = $1', [name])
    }
    
    if (alphabets.test(names) == true) {

      if (language === 'english') {
        return 'Hello, ' + name
      }
      if (language === 'isixhosa') {
        return 'Mholo, ' + name
      }

      if (language === 'sesotho') {
        return 'Dumela, ' + name
      }
    }else{
        return 'PLEASE DO NOT USE NUMBERS'
      }
  }


  async function errorMessage(name, language) {

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

  async function clearNames() {
    await db.none('delete from my_greet')

  }

  async function countNames(names) {
    if (alphabets.test(names) == false) {
      
    let counted = await db.any('select * from my_greet');
    return counted.length
    
  }
    return;
  }
  async function listofNames() {
    let greeted = await db.manyOrNone('select greeted_names from my_greet')
    return greeted
  }

  async function resetButton() {
    return "Your Data has been cleared!"

  }

  async function userCounter(name) {
    let counter = await db.oneOrNone('select greeted_names, counter from my_greet where greeted_names=$1', [name])
    return counter
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
    userCounter

  }
}
