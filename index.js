// Imports

var Chart = require("chart");

// Statics

var Colors = {
  invalid: "#f6f6f6",
  initial: "#da4e3a",
  remainders: "#4486f6",
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
    animation: true
  };
  this.colors = config.colors || Colors;
  this.update(percentages);
}

// Updates the chart display with the inputt data percentages.
CommissionBreakdownChart.prototype.update = function ( percentages ) {
  new Chart(this.canvas.getContext("2d")).Pie(this.appropriateCommissionData(percentages.initial, percentages.remainders), this.pieOpts);
};

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
        arr.push({ value: value, color: this.colors.remainders });
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