const { globalLog } = require('../log/Log');

class ErrorHandler {
  constructor() {
    this.log = globalLog;
  };

  throw(msg, line, col) {
    let err;
    if (line && col) {
      err = `\n\n${msg} -- ln: ${line}, col: ${col}\n`
    } else {
      err = `\n\n${msg}\n`
    };
    try {
      throw new Error(err);
    } catch (e) {
      console.error(e);
      this.log.error(e, line);
      // process.exit(1);
    };
  };
};

module.exports = {
  ErrorHandler,
};