var _ = require('underscore');

function deps(v) {
  if (_.isArray(v)) {
    return v.slice(0, Math.abs(v.length - 1)) || [];
  }
  return [];
}


module.exports = function(whole, targets) {
  var
    needed = _.isArray(targets) ? targets : [targets],
    present = _.keys(whole),
    missing = _.difference(needed, present),
    part = {},
    k;

  if (missing.length > 0) {
    throw new Error('Missing targets: ' + missing.join(' '));
  }

  while (k = needed.pop()) {
    part[k] = whole[k];
    needed = needed.concat(deps(whole[k]).filter(function(k) { return !part[k]; }));
  }

  return part;
};
