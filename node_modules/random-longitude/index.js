'use strict';

var clamp       = require('clamp');
var assign      = require('object-assign');
var randomFloat = require('random-floating');


var MAX = 180;
var MIN = -180;

module.exports = function (options) {

  options = assign({
    fixed: 5,
    min: MIN,
    max: MAX
  }, options);

  options.min = clamp(options.min, MIN, MAX);
  options.max = clamp(options.max, MIN, MAX);

  options.inspected = true;

  return randomFloat(options);
};
