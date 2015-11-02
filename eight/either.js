"use strict"

let Either = function() {};

let Left = function(x) {
  this.__value = x; 
}

Left.of = (x) => new Left(x);
Left.prototype.map = function(fx) {
  return this;
}

let Right = function(x) {
  this.__value = x;
}

Right.of = (x) => new Right(x);
Right.prototype.map = function(fx) {
  return new Right(fx(this.__value));
}

module.exports = {
  left: Left,
  right: Right
}
