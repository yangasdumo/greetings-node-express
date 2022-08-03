const assert = require('assert');
const { generateKeyPairSync } = require('crypto');
const Greet = require('../greetings');




describe("The Greeting massages", function () {

    it("should display (Hello, name) if the name is entered and the selected language is english", function () {

        const greetedName = Greet()
        assert.equal("Hello, Sdumo", greetedName.getLanguage("Sdumo", "english"))

    });
    it("should display (Molo, name) if the name is entered and the language is isixhosa", function () {

        const greetedName = Greet()
        assert.equal("Mholo, Young", greetedName.getLanguage("Young", "isixhosa"))

    });
    it("should display (Dumela, name) if the language is selected ", function () {

        const greetedName = Greet()
        assert.equal("Dumela, Sdumo", greetedName.getLanguage("Sdumo", "sesotho"))

    });


});
describe("Please Select language massages",function(){

    it("should display (please select languge) if the name is passed and the lanuge is not passed",function(){

        const greetedName = Greet()
        assert.equal("Please select a language",greetedName.errorMessage("Sdumo" ,"") )

    });
   
});

describe("The invelid massages",function(){

    it("should display (please enter a valid name) if the is no name given",function(){

        const greetedName = Greet()
        assert.equal("Please enter your name",greetedName.errorMessage("","english") )

    });
   
});
describe("The invelid massages",function(){

    it("should display (please Enter Name and language) if the is no name passed and no languge selected",function(){

        const greetedName = Greet()
        assert.equal("Please select a language",greetedName.errorMessage(" ","") )

    });
   
});


