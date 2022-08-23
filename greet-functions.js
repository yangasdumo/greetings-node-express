module.exports = function Greeting() {
    let name = ''
    let language = ''

    var alphabets = /^[a-z A-Z]+$/;

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

    function message(name,language) {

        if (alphabets.test(name) == true) {

            if (language === 'english') {
                return 'Hello, ' + name
            }
            if (language === 'isixhosa') {
                return 'Mholo, ' + name
            }

            if (language === 'sesotho') {
                return 'Dumela, ' + name
            }
        } else {
            return 'PLEASE DO NOT USE NUMBERS'
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
    return {
        setLanguage,
        getLanguage,
        setName,
        getName,
        errorMessage,
        message
    }

}