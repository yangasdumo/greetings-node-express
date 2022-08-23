const assert = require('assert');
const Greet = require('../greetings');
const pgPromise = require('pg-promise');
const greetings = require('../greetings');

const pgp = pgPromise({})

const local_database_url = 'postgres://codex:codex123@localhost:5432/my_greet_test';
const connectionString = local_database_url;


const db = pgp(connectionString);

 const greeted = greetings(db)

describe("The Greeting Database tests", async function () {

    beforeEach(async function(){
        await db.manyOrNone('delete from my_greet where id >=1')
    });
     
    
    it("Should display nothing if the clear botton is pressed and the are > 1 names in the database", async function () {
        
        await greeted.getLanguage("Sdumo")
        await greeted.clearNames()
        assert.deepEqual( [] , await greeted.listofNames() )
        
    });
    
    it("Should display nothing if the clear botton is pressed and the are 4 names in the database", async function () {

        await greeted.getLanguage("Sdumo")
        await greeted.getLanguage("Young")
        await greeted.getLanguage("TaSugar")

        await greeted.clearNames()
        assert.deepEqual( [] ,await greeted.listofNames() )

    });
     
    it("Should display nothing if the is no names in the database table", async function () {
        
        assert.equal(null, await greeted.userCounter())
    });
    
    it("Should display name if name is the name in the database", async function () {
        
        await greeted.getLanguage("Sdumo");
        assert.deepEqual([ { greeted_names: 'Sdumo' }]
        , await greeted.listofNames())
        
    });

    it("The names counter ", async function () {
    
        await greeted.getLanguage("Yanga");
        await greeted.getLanguage("Aphiwe");
        await greeted.getLanguage("Tso");
        await greeted.getLanguage("Young");

        assert.deepEqual( {
            counter: 1,
            greeted_names: 'Yanga'
          }
          , await greeted.userCounter('Yanga'))
    });

    after(async function () {
        await db.manyOrNone('Truncate my_greet');
    });
})

