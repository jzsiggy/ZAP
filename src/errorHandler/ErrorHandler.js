class ErrorHandler {
  throw(msg, line, col) {
    let err = `${msg} -- ln: ${line}, col: ${col}`
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