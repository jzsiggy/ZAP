class Log {
  constructor() {
    this.values = [];
  };

  add(log) {
    this.values.push({
      'log': log,
    });
  };

  error(e, ln) {
    this.values.push({
      'error' : {
        'message' : e.message,
        'line' : ln,
      }
    });
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