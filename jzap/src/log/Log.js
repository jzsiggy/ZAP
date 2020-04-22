class Log {
  constructor() {
    this.values= [];
  };

  add(log) {
    this.values.push(log);
  };
  
  clear() {
    this.values = [];
    return this;
  };
};

let globalLog = new Log();

module.exports = {
  globalLog,
};