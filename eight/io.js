"use strict"

let _ = require('../node_modules/ramda')

let IO = function(fx) {
  this.__value = fx;
};

IO.of = function(x) {
  return new IO(() => x);
};

IO.prototype.map = function(fx) {
  return new IO(_.compose(fx, this.__value));
};

module.exports = {
  io: IO  
};
