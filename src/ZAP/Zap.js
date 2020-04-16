const { Interpreter } = require('../interpreter/Interpreter');
const fs = require('fs');

class Zap {
  constructor() {
    this.input = this.fetchInput();
    this.interpreter = new Interpreter(this.input);
    // console.log(this.interpreter.statements);
  };

  fetchInput() {
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
      }
    }
  };
};

console.time('interpreting');
new Zap();
console.timeEnd('interpreting');
