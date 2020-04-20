const { Interpreter } = require('../interpreter/Interpreter');
const fs = require('fs');

class Zap {
  constructor(input) {
    this.input = input;
    this.interpreter = new Interpreter(this.input);
  };
};

const fetchSource = () => {
  let file = process.argv[2];
  if (!file)
  {
    console.log('USAGE -- [ node Zap.js <filename> ]');
  }
  else
  {
    try 
    {
      const data = fs.readFileSync(file, 'utf8');
      return data  
    } 
    catch(e) 
    {
      console.log('USAGE -- [ node Zap.js <filename> ]');
      console.log('Error:', e.stack);
    };
  };

  return [];

};

// console.time('interpreting');
// new Zap(fetchSource());
// console.timeEnd('interpreting');

module.exports = {
  Zap,
};