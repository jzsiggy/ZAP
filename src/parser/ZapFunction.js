const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Parser } = require('./Parser');
const { Environment } = require('../environment/Environment');

class ZapFunction {
  constructor(args, body, environment) {
    this.errorHandler = new ErrorHandler();
    this.environment = new Environment(environment);
    // this.parser = new Parser(this.environment);
    // console.log(this.environment);
    this.args = args;
    this.body = body;
    this.arity = args.length;
  };

  call(args) {

  };
};

module.exports = {
  ZapFunction,
};