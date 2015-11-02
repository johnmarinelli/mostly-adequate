"use strict"

let Identity = function(x) {
  this.__value = x;
};

Identity.of = (x) => new Identity(x);

Identity.prototype.map = function(fx) {
  return Identity.of(fx(this.__value));
};

module.exports = {
  identity: Identity
};
