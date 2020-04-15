const { Interpreter } = require('../interpreter/Interpreter');
const fs = require('fs');

class Zap {
  constructor() {
    this.input = this.fetchInput();
    new Interpreter(this.input);
  }

  fetchInput() {
    try {
      const data = fs.readFileSync('../../tests/test1.zap', 'utf8');
      return data  
    } catch(e) {
      console.log('Error:', e.stack);
    }
  };
};

new Zap();