var _ = require('underscore');

function deps(v) {
  if (_.isArray(v)) {
    return v.slice(0, Math.abs(v.length - 1)) || [];
  }
  return [];
}

module.exports = function(whole, target) {
  if (!whole[target]) {
    throw new Error('No such target');
  }

  var part = {}, needed = [target], k;

  while (needed.length) {
    k = needed.pop();
    part[k] = whole[k];
    needed = needed.concat(deps(whole[k]).filter(function(k) { return !part[k]; }));
  }

  return part;
};
