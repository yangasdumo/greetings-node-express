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
        await db.none('delete from my_greet where id >=1')
    });
     
    
    it("Should be no names in the database when the clear button is pressed", async function () {
        
        await greeted.greet2("Sdumo")
        await greeted.clearNames()
        assert.deepEqual( [] , await greeted.listofNames())
        
    });
     
    it("Should be able to count how many times a specific user has been greeted ", async function () {

        await greeted.greet2("Yanga");
        var personcounter = await greeted.userCounter("Yanga") ;
        assert.equal(1, personcounter.counter)
    });
    
    it("Should be able to display name if the name is already in the database", async function () {
        
        await greeted.greet2("Sdumo");
        assert.deepEqual([ { greeted_names: 'Sdumo' }]
        , await greeted.listofNames())
        
    });

    it("should return the number of greeted names ", async function () {
    
        await greeted.greet2("Yanga");
        await greeted.greet2("Aphiwe");
        await greeted.greet2("Tso");
        await greeted.greet2("Young");

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

