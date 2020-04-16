const { ErrorHandler } = require('../errorHandler/ErrorHandler');

class Environment {
  constructor(enclosing) {
    this.errorHandler = new ErrorHandler();
    this.values = {};
    this.enclosing = null;
    if (enclosing) {
      this.enclosing = enclosing;
    };
  };

  define(identifier, value) {
    this.values[identifier] = value;
  };

  assign(identifier, value) {
    if (!Object.keys(this.values).includes(identifier))
    {
      if (this.enclosing) 
      {
        return this.enclosing.assign(identifier, value);
      } 
      else 
      {
        this.errorHandler.throw(
          `UNDEFINED VARIABLE ${identifier}`
        );
      }
    } 
    else 
    {
      this.values[identifier] = value;
    };
  };

  get(identifier) {
    if (Object.keys(this.values).includes(identifier)) 
    {
      return this.values[identifier];
    }
    else 
    {
      if (this.enclosing) 
      {
        return this.enclosing.get(identifier);
      };
      this.errorHandler.throw(
        `UNDEFINED VARIABLE ${identifier}`
      );
    };
  };
};

module.exports = {
  Environment,
};