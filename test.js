var _ = require('underscore');
var test = require('tape');
var autotarget = require('./');

test("given a target that includes the whole tree, returns the same object", function(t) {
  var
    o = {
      'a': function() {},
      'b': ['a', function() {}],
      'c': ['b', function() {}]
    };

  t.deepEqual(o, autotarget(o, 'c'));
  t.end();
});

test("given a target with no dependencies, returns an object with only that target", function(t) {
  var
    o = {
      'a': function() {},
      'b': ['a', function() {}],
      'c': ['b', function() {}]
    },
    e = {
      'a': o.a
    },
    r = autotarget(o, 'a');

  t.deepEqual(e, r);
  t.end();
});

test("usual case, some in, some out", function(t) {
  var
    o = {
      'a': function() {},
      'b': ['a', function() {}],
      'c': ['b', function() {}]
    },
    e = {
      'a': o.a,
      'b': o.b
    },
    r = autotarget(o, 'b');

  t.deepEqual(e, r);
  t.end();
});

test("multiple targets", function(t) {
  var
    o = {
      'a': function() {},
      'b': ['a', function() {}],
      'c': ['b', function() {}],
      'd': function() {}
    },
    e = {
      'a': o.a,
      'b': o.b,
      'd': o.d
    },
    r = autotarget(o, ['b', 'd']);

  t.deepEqual(e, r);
  t.end();
});

test("throw an error when not all targets are present in the object", function(t) {
  var
    o = {
      'a': function() {},
      'b': ['a', function() {}],
      'c': ['b', function() {}]
    };

  t.throws(function() {
    autotarget(o, ['b', 'd']);
  });

  t.end();
});
