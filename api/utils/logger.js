const DEBUG = true;

const log = () => {
  if (DEBUG) {
    console.log.apply(console, arguments);
  }
};

module.exports = log;
