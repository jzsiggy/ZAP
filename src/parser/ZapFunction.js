

class ZapFunction {
  constructor(args, body) {
    this.args = args;
    this.body = body;
    this.arity = args.length;
  };
}

module.exports = {
  ZapFunction,
};