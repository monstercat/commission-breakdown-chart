
# Comission Breakdown Chart

Displays a chart for commisions broken down by two parts. First part being the initial cut from the whole. Second part being the cuts taken from the remainder.

# Installation

    component install monstercat/commission-breakdown-chart

# Usage

Creates a chart in an element. Simply attach it to another element.

    var CommissionBreakdownChart = require('commission-breakdown-chart');
    var chart = new CommissionBreakdown( { title: "My Chart", size: 200, percentages: { owner:0.5, divisors: [0.2, 0.3] } } );
    document.querySelector("body").appendChild(chart.el);

    ...

    chart.update( { initial: 0.4, remainders: [0.1, 0.2, 0.3] } );

# Contributing

Fork and send a PR if you see fit, make sure to report any issues.

# LICENSE (MIT)

Copyright (c) Jason Campbell ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.