"use strict"
let _ = require('../node_modules/ramda'),
  Maybe = require('./maybe.js').maybe,
  IO = require('./io.js').io,
  Left = require('./either.js').left,
  Right = require('./either.js').right,
  moment = require('../node_modules/moment');

// _ -> _
let id = (x) => x;

// String -> _ -> _
let trace = function(msg, x) {
  console.log(msg);
  return x;
};

// Date -> User -> Either(String, Number)
let getAge = _.curry((now, user) => {
  let birthdate = moment(user.birthday, 'YYYY-MM-DD');
  if (!birthdate.isValid()) return Left.of('Invalid birthdate.');
  return Right.of(now.diff(birthdate, 'years'));
});

let validAge = getAge(moment(), { birthday: '1995-12-25' });
let invalidAge = getAge(moment(), { birthday: 'ducks' });

// Number -> String
let fortune = _.compose(_.concat('If you survive, you will be '), _.add(1));

// User -> Either(String, _)
let zoltar = _.compose(_.map(console.log), _.map(fortune), getAge(moment()));

zoltar({ birthday: '1995-12-25' });
zoltar({ birthday: 'ducks' });

// (a -> c) -> (b -> c) -> Either a b -> c
let Either = _.curry((fx, gx, x) => {
  switch (x.constructor) {
    case Left: return fx(x.__value);
    case Right: return gx(x.__value);
  }
});

zoltar = _.compose(console.log, Either(id, fortune), getAge(moment()));
zoltar({ birthday: '1995-12-25' });
zoltar({ birthday: 'ducks' });

let wdw = {
  loc: {
    href: 'http://google.com?searchterm=wallaby&another=no'
  }
};

let url = new IO(() => wdw.loc.href);

// String -> String
let getParams = _.compose(_.last, _.split('?'));

// String -> [[String]]
let getParamPairs = _.compose(_.map(_.split('=')), _.split('&'));

// String -> [[String]] -> IO Maybe [String]
let findParamTerm = (key) => {
  // search 2d string array for term
  let findTerm = _.filter(_.compose(_.eq(key), _.head));
  return _.map(_.compose(Maybe.of, findTerm, getParamPairs, getParams), url);
};

console.log(findParamTerm('searchterm').__value());


