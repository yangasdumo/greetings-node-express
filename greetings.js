module.exports = function Greet() {
  let name = ''
  let language = ''
  let Number = []

  function setName(par) {
    if (par == "") {
      return name = "enter name"
    } else {
      return name = par
    }
  }
  function getName() {
    return name
  }

  function setLanguage(sppeak) {
    language = sppeak
  }

  function getLanguage() {
    if (language == "english") 
    {
      return language = "Hey"
    } else

      if (language == "isixhosa") {

        return language = "Molo"
      } else

        if (language == "sesotho") {

          return language = "Dumela"
        }
       
  }

  function setN() {
    if (Number == "") {
      return name = " enter name"
    }
  }
  function getN() {
    return name.length
  }


  // if ((name) ==='string' && name) {
  //   return `Hello, ${name}`;
  // } else {
  //   return "enter name"
  // }

  return {
    setName,
    getName,
    setLanguage,
    getLanguage,
    setN,
    getN

  }
}

//the other factory fuction// 
function Greet() {
  let name = ''
  function setName(username) {
    name = username
  }
  function getName() {
    return findName;
  }
     
  function storedName() {
       
  }
  function errorMessage(name, language) {
    if (!name && !language == null)
      return errorMessage('Please enter your name and language!');
  }

  function errorMessage(language) {
    if (!language == null)
      return errorMessage('Please select language!');
  }
  function errorMessage(name) {
    if (!name)
      return errorMessage('Please enter your name!');
  }
  return {
    setName,
    getName,
    storedName,
    errorMessage
  }
}

// export default Greet