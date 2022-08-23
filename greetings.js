module.exports = function Greet(db) {
  
  let alphabets = /^[a-z A-Z]+$/;

  async function getLanguage(names) {

    let name = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();

    let show = await db.oneOrNone('select greeted_names from my_greet where greeted_names = $1', [name])

    if (show === null && alphabets.test(names) == true) {
      await db.none('insert into my_greet (greeted_names, counter) values ($1, $2)', [name, 1])
    }
    else if (alphabets.test(names) == true && !show === null) {
      await db.none('UPDATE my_greet SET counter = counter + 1 WHERE greeted_names = $1', [name])
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
    let greeted = await db.manyOrNone('select greeted_names from my_greet');
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
    getLanguage,
    countNames,
    userCounter

  }

}
