"use strict"

let Maybe = function(x) {
  this.__value = x;
}

Maybe.of = (x) => new Maybe(x);

Maybe.prototype.isNull = function() {
  return ((this.__value == undefined) || (this.__value == null));
}

Maybe.prototype.map = function(fx) {
  return this.isNull() ? Maybe.of(null) : Maybe.of(fx(this.__value));
}

module.exports = {
  maybe: Maybe
};
