var _ = require('underscore');

function deps(v) {
  if (_.isArray(v)) {
    return v.slice(0, Math.abs(v.length - 1)) || [];
  }
  return [];
}


module.exports = function(whole, targets) {
  var part = {}, needed = _.isArray(targets) ? targets : [targets], k;

  if (!_.every(needed, function(t) { return _.contains(_.keys(whole), t); })) {
    throw new Error('Not all targets are present: ' + needed.join(' '));
  }

  while (needed.length) {
    k = needed.pop();
    part[k] = whole[k];
    needed = needed.concat(deps(whole[k]).filter(function(k) { return !part[k]; }));
  }

  return part;
};
