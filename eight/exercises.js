"use strict"
let _ = require('../node_modules/ramda'),
    Task = require('../node_modules/folktale').task,
    Identity = require('./identity').identity,
    Maybe = require('./maybe').maybe;

// exercise 1
let ftr = Identity.of(1);
let inc = _.map(_.add(1));

// exercise 2
let xs = Identity.of(['do', 're', 'mi', 'fa', 'sol', 'la', 'ti']);
let head = _.map(_.head);

// exercise 3
let safeProp = _.curry((x, e) => Maybe.of(e[x]));
let user = { age: 2, name: 'Albert' };
let firstInitial = _.compose(_.map(_.head), safeProp('name'));
