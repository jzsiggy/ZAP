class ErrorHandler {
  throw(msg, line, col) {
    let err;
    if (line && col) {
      err = `${msg} -- ln: ${line}, col: ${col}`
    } else {
      err = `${msg} -- EOF`
    };
    try {
      throw new Error(err);
    } catch (e) {
      console.error(e);
      process.exit(1);
    };
  };
};

module.exports = {
  ErrorHandler,
};