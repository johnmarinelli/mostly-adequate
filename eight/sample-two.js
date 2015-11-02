"use strict"
let _ = require('../node_modules/ramda'),
    Container = require('./container.js').container;


let id = (x) => x;

let idLaw1 = _.map(id);
let idLaw2 = id;

console.log(idLaw1(Container.of(1)));
console.log(idLaw2(Container.of(1)));

