const assert = require('assert');
const Greet = require('../greetings');
const pgPromise = require('pg-promise');
const greetings = require('../greetings');

const pgp = pgPromise({})

const local_database_url = 'postgres://codex:codex123@localhost:5432/my_greet_test';
const connectionString = local_database_url;


const db = pgp(connectionString);

 const greeted = greetings(db)

describe("The Greeting massages", async function () {

    beforeEach(async function(){
        await db.manyOrNone('delete from my_greet where id >=1')
    });
     
    it("should display (Hello, name) if the name is entered and the selected language is english", async function () {

        
        let theName = 'Sdumo'
        let theLanguage = 'english'
         const theGreeting = await greeted.getLanguage(theName,theLanguage)
        assert.equal("Hello, Sdumo", theGreeting)

    });
    it("should display (Molo, name) if the name is entered and the language is isixhosa", async function () {
         
        let theName = 'Young'
        let theLanguage = 'isixhosa'
         const theGreeting = await greeted.getLanguage(theName,theLanguage)
        assert.equal("Mholo, Young",theGreeting)

    });
    it("should display (Dumela, name) if the language is selected ", async function () {

        let theName = 'Sdumo'
        let theLanguage = 'sesotho'
         const theGreeting = await greeted.getLanguage(theName,theLanguage)
        assert.equal("Dumela, Sdumo",theGreeting)

    });

    it("should display (please select languge) if the name is passed and the lanuge is not passed", async function(){
        let theName = 'sdumo';
        let language = ''
        const theGreeting = await greeted.errorMessage(theName,language)
        assert.equal("Please select a language", theGreeting)

    });

    it("should display (please enter you name) if the is no name given",async function(){
          let theName = ''
          let  language = 'isixhosa'
          const theGreeting = await greeted.errorMessage(theName,language)
        assert.equal("Please enter your name",theGreeting)

    });

    it("should display (please Enter Name and language) if the is no name passed and no languge selected",async function(){
         let theName = ''
         let theLanguage =''
        const theGreeting = await greeted.errorMessage(theName,theLanguage)
        assert.equal("Please enter your name and language",theGreeting)
    });

    
});


