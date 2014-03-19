lifx = require('lifx')

var LifxReporter = function(baseReporterDecorator) {
  var lx

	baseReporterDecorator(this);

  lifx.setDebug = false;

  lx = lifx.init();

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
