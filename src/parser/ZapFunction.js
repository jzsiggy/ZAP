const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Parser } = require('./Parser');
const { Environment } = require('../environment/Environment');

class ZapFunction {
  constructor(name, args, body, environment) {
    this.errorHandler = new ErrorHandler();
    this.environment = new Environment(environment);
    // this.parser = new Parser(this.environment);
    // console.log(this.environment);
    this.name = name;
    this.args = args;
    this.body = body;
    this.arity = args.length;
  };

  call(args) {
    // console.log(args)
    if (args.length != this.args.length) {
      this.errorHandler.throw(
        `INVALID NUMBER OF ARGUMENTS PASSED TO ${this.name}`,
      )
    };

    //DEFINE ARGS TO VARS
    //PARSE

    return null;
  };
};

module.exports = {
  ZapFunction,
};