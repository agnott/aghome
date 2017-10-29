module.exports.res = {
  data: null,
  send: function (data) {
    this.data = data;
  },
  reset: function() {
    this.data = null;
  }
};
