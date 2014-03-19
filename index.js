var lifx = require('lifx');
var lx = lifx.init();
lifx.setDebug = false;

var LifxReporter = function(baseReporterDecorator) {
	baseReporterDecorator(this);

  var isConnected = true;
  var timeouts = [];
  var interval = 0;
  var color = 0;

  var turnLightOn = function() {
    lx.lightsOn();
  };

  var turnLightOff = function() {
    lx.lightsOff();
  };

  var setDimLight = function() {
    lx.lightsColour(color, 0xFFFF, 800, 0, 0x0513);
  };

  var setBrightLight = function() {
    lx.lightsColour(color, 0xFFFF, 1000, 0, 0x0513);
  };

  var setProcessingLight = function() {
    lx.lightsColour(color, 0, 800, 0, 0x0513);
  };

  var openConnection = function() {
    if(!isConnected) {
      lx.gateways.forEach(function(gateway) {
        gateway.connect();
      });
      isConnected = true;
    }
  };

  var closeConnection = function() {
    lx.close();
    isConnected = false;
  };

	this.onSpecComplete = function() { };

  this.onRunStart = function() {
    timeouts.forEach(function(val) {
      clearTimeout(val);
    });
    openConnection();
    turnLightOn();
    //setProcessingLight();
    this._browsers = [];
    this.browserResults = {};
  };

  this.onRunComplete = function(browsers, results) {
    turnLightOn();
    if (results.failed || results.error) {
      color = 0xFFFF;
      setBrightLight();
    } else {
      color = 0x3333;
      setBrightLight();
    }
    timeouts.push(setTimeout(setDimLight, 1000));
    timeouts.push(setTimeout(closeConnection, 2000));
	};
};

LifxReporter.$inject = ['baseReporterDecorator'];

module.exports = {
	'reporter:lifx': ['type', LifxReporter]
};
