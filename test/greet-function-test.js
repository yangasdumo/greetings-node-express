const assert = require('assert');
const Greeting = require('../greet-functions');



describe("The Greetings factory function", function () {

    it(' it should return (Hello Name) if name is passed and language is english', function () {
        let greetmessage = Greeting();

        assert.deepEqual("Hello, Sdumo",greetmessage.message("Sdumo", "english"))
    });

    it(' it should return (Hello Name) if name is passed and language is sesotho', function () {
        let greetmessage= Greeting();

        assert.deepEqual("Dumela, Sdumo", greetmessage.message("Sdumo", "sesotho"))
    });

    it(' it should return (Mholo Name) if name is passed and language isixhosa', function () {
        let greetmessage= Greeting();

        assert.deepEqual("Mholo, Sdumo",greetmessage.message("Sdumo", "isixhosa"))
    });

    it('it should return (please Enter Name and language) if the is no name and language is not selected', function () {
        let greetmessage = Greeting();
        assert.deepEqual("Please enter your name and language",greetmessage.errorMessage("",""))
    });


    it('it should return (Please enter your name) if language is not selected and name is not entered', function () {
        let greetmessage = Greeting();
        assert.deepEqual("Please enter your name",greetmessage.errorMessage("","english"))
    });


    it('it should return (Select a language) if the name is not added', function () {
        let greetmessage = Greeting();
        assert.deepEqual("Please select a language", greetmessage.errorMessage("Young", ""))
    });


})







