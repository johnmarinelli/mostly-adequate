"use strict"

let Container = function(x) {
  this.__value = x;
}

Container.of = (x) => new Container(x);

// (a -> b) -> Container a -> Container b
Container.prototype.map = function(fx) {
  return Container.of(fx(this.__value));
}


module.exports = {
  container: Container
};
