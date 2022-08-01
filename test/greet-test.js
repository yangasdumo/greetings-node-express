const assert = require('assert');
const fun = require('../greetings');


describe('TEST MY GREET FUNCTION', function(){

    it('should return error message when name is empty', function(){
       
        greet.setName('')
        assert.equal("enter name", greet.getName());

    });

    it('should return when you select a language', function(){
        
        greet.setLanguage()
        assert.equal("", greet.getLanguage());

    });

    it('should return the number of names', function(){
        

        greet.setName('sdumo')
        greet.setName('young')
        greet.setName('zoe')

        assert.equal("3", greet.getN());

    });

});