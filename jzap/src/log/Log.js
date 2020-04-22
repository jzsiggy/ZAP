class Log {
  constructor() {
    this.values = [];
    this.errors = [];
  };

  add(log) {
    this.values.push({
      'log': log,
    });
  };

  error(e) {
    this.errors.push(this.values.length);
    this.values.push({
      'error' : e.message,
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