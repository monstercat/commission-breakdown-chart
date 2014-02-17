// Imports

var Chart = require("chart");
var AutoScaleCanvas = require("autoscale-canvas");

// Statics

var Colors = {
  invalid: "#f6f6f6",
  initial: "#da4e3a",
  remainder: "#4486f6",
  remainders: [],
  missing: "#ffb80a"
};

var InvalidGraphData = [
  { value: 100, color: Colors.invalid }
];

// Class

function CommissionBreakdownChart ( config ) {
  var percentages = config.percentages || InvalidGraphData;
  var cls = config.elClass || "commissionBreakdownChart"

  this.el = document.createElement("div");
  this.el.setAttribute("class", cls);
  this.title = document.createElement("h4");
  this.title.innerHTML = config.title;
  this.canvas = document.createElement("canvas");
  this.canvas.setAttribute("width", config.size);
  this.canvas.setAttribute("height", config.size);
  this.el.appendChild(this.canvas);
  this.el.appendChild(this.title);
  this.pieOpts = {
    animation: false
  };
  this.colors = config.colors || Colors;
  this.update(percentages);

  AutoScaleCanvas(this.canvas);
}

// Updates the chart display with the input data percentages.
CommissionBreakdownChart.prototype.update = function ( percentages ) {
  new Chart(this.canvas.getContext("2d")).Pie(this.appropriateCommissionData(percentages.initial, percentages.remainders), this.pieOpts);
};

CommissionBreakdownChart.prototype.getRemainderColorForIndex = function ( index ) {
  if ( this.colors.remainders.length >= index + 1 ) {
    return this.colors.remainders[index];
  }
  return this.colors.remainder;
}

// Breaks down data into a format that the chart API can read.
CommissionBreakdownChart.prototype.appropriateCommissionData = function ( initial, remainders ) {
  var initialTotal = (initial * 100).toFixed(0) * 1;
  var remaindersTotal = 100 - initialTotal;
  var arr = [ { value: initialTotal, color: this.colors.initial } ];

  if ( remaindersTotal > 0 ) {
    var i;
    var sum = 0.0;
    var count = remainders.length;
    for ( i = 0; i < count; i++ ) {
      sum += remainders[i];
    }

    // Invalid graph data.
    if ( sum > 1.0 ) {
      arr = InvalidGraphData;
    }
    // Show individual pieces
    else if ( sum > 0.0 ) {
      var remainder = remaindersTotal;
      for ( i = 0; i < count; i++ ) {
        var value = remainders[i] * remaindersTotal;
        remainder -= value;
        arr.push({ value: value, color: this.getRemainderColorForIndex(i) });
      }

      // Show remaining piecies left to share.
      if ( remainder > 0 ) {
        arr.push({ value: remainder, color: this.colors.missing });
      }
    }
    // Just show the general slice as a whole remaining from the initial left overs.
    else {
      arr.push({ value: remaindersTotal, color: this.colors.invalid });
    }
  }

  return arr;
};

// Exports

module.exports = CommissionBreakdownChart;