const assert = require('assert');
const Greet = require('../greetings');
const pgPromise = require('pg-promise');
const greetings = require('../greetings');

const pgp = pgPromise({})

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

 const greeted = greetings(db)

describe("The Greeting massages", async function () {

    beforeEach(async function(){
        await db.manyOrNone('delete from my_greet')
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
    after( async function(){
       await db.manyOrNone('TRUNCATE from my_greet')
    })

});
describe("Please Select language massages",async function(){

    beforeEach(async function(){
        await db.manyOrNone('delete from my_greet')
    });
       
    it("should display (please select languge) if the name is passed and the lanuge is not passed", async function(){
         let Language = ''
        const theGreeting = await greeted.Language()
        assert.equal("Please select a language", theGreeting)

    });
    after( async function(){
        await db.manyOrNone('TRUNCATE from my_greet')
     })

});

describe("The invelid massages",async function(){

    it("should display (please enter a valid name) if the is no name given",async function(){

      
        assert.equal("Please enter your name", )

    });
   
});
describe("The invelid massages",async function(){

    it("should display (please Enter Name and language) if the is no name passed and no languge selected",async function(){

        
        assert.equal("Please select a language",)

    });
   
});


