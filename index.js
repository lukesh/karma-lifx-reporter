lifx = require('lifx')

var LifxReporter = function(baseReporterDecorator) {
  var lx
  lifx.setDebug = false;
  lx = lifx.init();

	baseReporterDecorator(this);

  setInterval(function() {
    lx.lightsOn();
  }, 10000);

	this.onSpecComplete = function() { };

  this.onRunComplete = function(browsers, results) {
    lx.lightsOn();

		if (results.failed || results.error) {
      lx.lightsColour(0xFFFF, 0xFFFF, 1000, 0, 0);
		} else {
      lx.lightsColour(0x3333, 0xFFFF, 1000, 0, 0);
    }
	};
};

LifxReporter.$inject = ['baseReporterDecorator'];

module.exports = {
	'reporter:lifx': ['type', LifxReporter]
};
