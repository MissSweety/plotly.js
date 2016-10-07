/**
* Copyright 2012-2016, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var Lib = require('../../lib');
var handleOHLC = require('../ohlc/ohlc_defaults');
var helpers = require('../ohlc/helpers');
var attributes = require('./attributes');

module.exports = function supplyDefaults(traceIn, traceOut) {

    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var transformOpts = { type: 'candlestick' };
    helpers.prependTransformOpts(traceIn, traceOut, transformOpts);

    var len = handleOHLC(traceIn, traceOut, coerce);
    if(len === 0) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('whiskerwidth');

    handleDirection(traceOut, coerce, 'increasing');
    handleDirection(traceOut, coerce, 'decreasing');
};

function handleDirection(traceOut, coerce, direction) {
    var dirVisible = coerce(direction + '.visible', traceOut.visible);

    if(dirVisible) {
        coerce(direction + '.color');
        coerce(direction + '.width');
        coerce(direction + '.fillcolor');
    }
}
