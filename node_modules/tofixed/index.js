'use strict';

module.exports = function (num, precision) {
  var power = Math.pow(10, precision);
  return (Math.round(num * power) / power).toFixed(precision);
};
