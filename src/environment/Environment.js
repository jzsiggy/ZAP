const { ErrorHandler } = require('../errorHandler/ErrorHandler');

class Environment {
  constructor() {
    this.errorHandler = new ErrorHandler();
    this.values = {};
  };

  define(identifier, value) {
    this.values[identifier] = value;
  };

  get(identifier) {
    if (Object.keys(this.values).includes(identifier)) {
      return this.values[identifier];
    }
    else {
      this.errorHandler.throw(
        `UNDEFINED VARIABLE ${identifier}`
      );
    };
  }
}l

module.exports = {
  Environment,
};