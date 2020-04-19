const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Environment } = require('../environment/Environment');

class ZapFunction {
  constructor(name, args, body, environment) {
    const { Parser } = require('./Parser');

    this.errorHandler = new ErrorHandler();
    this.environment = new Environment(environment);
    this.parser = new Parser(this.environment);
    this.name = name;
    this.args = args;
    this.body = body;
    this.arity = args.length;
  };

  call(args) {
    if (args.length != this.args.length) {
      this.errorHandler.throw(
        `INVALID NUMBER OF ARGUMENTS PASSED TO ${this.name}`,
      )
    };

    for (let i=0; i < args.length; i++) {
      this.environment.define(this.args[i]['value'], args[i]);
    };
    
    this.parser.load(this.body);
    this.parser.parse();
  };
};

module.exports = {
  ZapFunction,
};