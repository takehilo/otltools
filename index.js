#!/usr/bin/env node

var options = {
  'string': ['s', 'e']
}
var argv = require('minimist')(process.argv.slice(2), options);

if (argv.h || argv.help) {
  usage();
}

var startTime,
    endTime,
    excludeTime,
    elapsedTime;

if (argv.s && /^\d{4}$/.test(argv.s)) {
  var hour = parseInt(argv.s.slice(0, 2), 10);
  var minute = parseInt(argv.s.slice(2, 4), 10);
  startTime = new Date(2000, 4, 1, hour, minute);
} else {
  usage('Error: Start time must be 4 digits.');
}

if (argv.e && /^\d{4}$/.test(argv.e)) {
  var hour = parseInt(argv.e.slice(0, 2), 10);
  var minute = parseInt(argv.e.slice(2, 4), 10);
  endTime = new Date(2000, 4, 1, hour, minute);
} else {
  usage('Error: End time must be 4 digits.');
}

if (argv.x) {
  if (/\d+$/.test(argv.x)) {
    excludeTime = parseInt(argv.x, 10) * 60000;  // milliseconds
  } else {
    usage('Error: Exclude time must be number.')
  }
} else {
  excludeTime = 4500000;  // 75 min in milliseconds
}

elapsedTime = endTime.getTime() - startTime.getTime() - excludeTime;
console.log(floatFormat(elapsedTime / 3600000, 2));

function usage(msg) {
  if (msg) console.log(msg);
  console.log([
    'usage: otl [options]',
    '',
    'options:',
    '  -s        Start time [HHMM] (required)',
    '  -e        End time [HHMM] (required)',
    '  -x        Exclude time in minutes (default: 75)'
  ].join('\n'));
  process.exit();
}

function floatFormat(number, n) {
  var pow = Math.pow(10, n);
  return Math.round(number * pow) / pow
}
