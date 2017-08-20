var json = require('output.json');
console.log(json);
var actualValues =JSON.parse(json);
  
  /**
   * Assume the graph scale goes only from 0 to 1.
   * Thus, the maximum allowed height is 1 for the valueAxis,
   * and the middle value for the balloon is 0.5.
   */
  function calcBandPos1( val, baseline, bandOpts ) {
    var break_u_1 = baseline + ( baseline * bandOpts.band1_inc_perc );
  
    if ( val <= baseline ) {
      return 0;
    } else if ( ( val > baseline ) && ( ( val - baseline ) > ( break_u_1 - baseline ) ) ) {
      return 1;
    } else {
      return ( val - baseline ) / ( break_u_1 - baseline );
    }
  }
  
  function calcBandPos2( val, baseline, bandOpts ) {
    var break_u_1 = baseline + ( baseline * bandOpts.band1_inc_perc );
    var break_u_2 = baseline + ( baseline * bandOpts.band2_inc_perc );
  
    if ( val <= baseline ) {
      return 0;
    } else if ( ( val > baseline ) && ( ( val - baseline ) <= ( break_u_1 - baseline ) ) ) {
      return 0;
    } else if ( ( val > baseline ) && ( ( val - baseline ) > ( break_u_2 - baseline ) ) ) {
      return 1;
    } else {
      return ( val - break_u_1 ) / ( break_u_2 - break_u_1 );
    }
  }
  
  function calcBandPos3( val, baseline, bandOpts ) {
    var break_u_2 = baseline + ( baseline * bandOpts.band2_inc_perc );
    var break_u_3 = baseline + ( baseline * bandOpts.band3_inc_perc );
  
    if ( val <= baseline ) {
      return 0;
    } else if ( ( val > baseline ) && ( ( val - baseline ) <= ( break_u_2 - baseline ) ) ) {
      return 0;
    } else if ( ( val > baseline ) && ( ( val - baseline ) > ( break_u_3 - baseline ) ) ) {
      return 1;
    } else {
      return ( val - break_u_2 ) / ( break_u_3 - break_u_2 );
    }
  }
  
  function calcBandNeg1( val, baseline, bandOpts ) {
    var break_d_1 = baseline - ( baseline * bandOpts.band1_dec_perc );
  
    if ( val >= baseline ) {
      return 0;
    } else if ( ( val < baseline ) && ( ( baseline - val ) > ( baseline - break_d_1 ) ) ) {
      return 1;
    } else {
      return ( baseline - val ) / ( baseline - break_d_1 );
    }
  }
  
  function calcBandNeg2( val, baseline, bandOpts ) {
    var break_d_1 = baseline - ( baseline * bandOpts.band1_dec_perc );
    var break_d_2 = baseline - ( baseline * bandOpts.band2_dec_perc );
  
    if ( val >= baseline ) {
      return 0;
    } else if ( ( val < baseline ) && ( Math.abs( val - baseline ) <= Math.abs( break_d_1 - baseline ) ) ) {
      return 0;
    } else if ( ( val < baseline ) && ( Math.abs( val - baseline ) > Math.abs( break_d_2 - baseline ) ) ) {
      return 1;
    } else {
      return 1 - ( Math.abs( break_d_2 - val ) / Math.abs( break_d_2 - break_d_1 ) );
    }
  }
  
  function calcBandNeg3( val, baseline, bandOpts ) {
    var break_d_2 = baseline - ( baseline * bandOpts.band2_dec_perc );
    var break_d_3 = baseline - ( baseline * bandOpts.band3_dec_perc );
  
    if ( val >= baseline ) {
      return 0;
    } else if ( ( val < baseline ) && ( Math.abs( val - baseline ) <= Math.abs( break_d_2 - baseline ) ) ) {
      return 0;
    } else if ( ( val < baseline ) && ( Math.abs( val - baseline ) > Math.abs( break_d_3 - baseline ) ) ) {
      return 1;
    } else {
      return 1 - ( Math.abs( break_d_3 - val ) / Math.abs( break_d_3 - break_d_2 ) );
    }
  }
  
  function buildFieldMappings( dim ) {
    return [ {
      "fromField": "val" + dim,
      "toField": "val" + dim
    }, {
      "fromField": "pos_1u" + dim,
      "toField": "pos_1u" + dim
    }, {
      "fromField": "pos_2u" + dim,
      "toField": "pos_2u" + dim
    }, {
      "fromField": "pos_3u" + dim,
      "toField": "pos_3u" + dim
    }, {
      "fromField": "neg_1u" + dim,
      "toField": "neg_1u" + dim
    }, {
      "fromField": "neg_2u" + dim,
      "toField": "neg_2u" + dim
    }, {
      "fromField": "neg_3u" + dim,
      "toField": "neg_3u" + dim
    } ];
  }
  
  function buildPanel( dim ) {
    return {
      "allLabels": [ {
        "text": undefined,
        "align": "left",
        "x": "1%",
        "size": 14
      } ],
      "valueAxes": [ {
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left",
        "gridCount": 2,
        "labelsEnabled": false,
        "labelFrequency": 1,
        "strictMinMax": true,
        "minimum": 0,
        "maximum": 1
      } ],
      "fontFamily": "Arial, sans-serif",
      "showCategoryAxis": false,
      "stockGraphs": [ {
        "id": "pos_band1" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "pos_1d",
        "fillAlphas": 0,
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "fillAlphas": 1,
        "lineColor": "#c6dbef",
        "fillToGraph": "pos_band1" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "pos_1u" + dim,
        "type": "smoothedLine",
  "theme": "light",
  
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "id": "pos_band2" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "pos_2d",
        "fillAlphas": 0,
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "fillAlphas": 1,
        "lineColor": "#6baed6",
        "fillToGraph": "pos_band2" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "pos_2u" + dim,
        "type": "smoothedLine",
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "id": "pos_band3" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "pos_3d",
        "fillAlphas": 0,
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "fillAlphas": 1,
        "lineColor": "#2171b5",
        "fillToGraph": "pos_band3" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "pos_3u" + dim,
        "type": "smoothedLine",
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "id": "neg_band1" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "neg_1d",
        "fillAlphas": 0,
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "fillAlphas": 1,
        "lineColor": "#fcbba1",
        "fillToGraph": "neg_band1" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "neg_1u" + dim,
        "type": "smoothedLine",
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "id": "neg_band2" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "neg_2d",
        "fillAlphas": 0,
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "fillAlphas": 1,
        "lineColor": "#fb6a4a",
        "fillToGraph": "neg_band2" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "neg_2u" + dim,
        "type": "smoothedLine",
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "id": "neg_band3" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "neg_3d",
        "fillAlphas": 0,
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "fillAlphas": 1,
        "lineColor": "#cb181d",
        "fillToGraph": "neg_band3" + dim,
        "lineAlpha": 0,
        "showBalloon": false,
        "valueField": "neg_3u" + dim,
        "type": "smoothedLine",
        "useDataSetColors": false,
        "visibleInLegend": false
      }, {
        "fillAlphas": 0,
        "lineAlpha": 0,
        "lineColor": "#eee",
        "showBalloon": true,
        "showBalloonAt": "open",
        "valueField": "val" + dim,
        "openField": "mid",
        "type": "smoothedLine",
        "useDataSetColors": false,
        "visibleInLegend": false
      } ]
    };
  }
  
  var dimensions = [ {
    "dimension": "krw",
    "dataSet": undefined,
    "panel": undefined
  }, {
    "dimension": "usd",
    "dataSet": undefined,
    "panel": undefined
  }, {
    "dimension": "rub",
    "dataSet": undefined,
    "panel": undefined
  }, {
    "dimension": "aud",
    "dataSet": undefined,
    "panel": undefined
  }, {
    "dimension": "eur",
    "dataSet": undefined,
    "panel": undefined
  }, {
    "dimension": "gbp",
    "dataSet": undefined,
    "panel": undefined
  }, {
    "dimension": "cny",
    "dataSet": undefined,
    "panel": undefined
  }, {
    "dimension": "YHOO",
    "dataSet": undefined,
    "panel": undefined
  } ];
  
  var chartPanels = [];
  
  AmCharts.addInitHandler( function( chart ) {
  
    // set the bandOpts percentages
    var bandOpts = {
      'band1_inc_perc': .1,
      'band2_inc_perc': .2,
      'band3_inc_perc': .3,
      'band1_dec_perc': .1,
      'band2_dec_perc': .2,
      'band3_dec_perc': .3
    };
  
    var newDataSet = [ {
      "categoryField": "date",
      "dataProvider": undefined,
      "fieldMappings": [ {
        "fromField": "pos_1d",
        "toField": "pos_1d"
      }, {
        "fromField": "pos_2d",
        "toField": "pos_2d"
      }, {
        "fromField": "pos_3d",
        "toField": "pos_3d"
      }, {
        "fromField": "neg_1d",
        "toField": "neg_1d"
      }, {
        "fromField": "neg_2d",
        "toField": "neg_2d"
      }, {
        "fromField": "mid",
        "toField": "mid"
      } ]
    } ];
  
    // transform base data
    // to prepare for graphs
    var newDataProvider = [];
  
    var baseline_usd = actualValues[ 0 ][ 'usd' ],
      baseline_krw = actualValues[ 0 ][ 'krw' ],
      baseline_rub = actualValues[ 0 ][ 'rub' ],
      baseline_aud = actualValues[ 0 ][ 'aud' ],
      baseline_eur = actualValues[ 0 ][ 'eur' ],
      baseline_gbp = actualValues[ 0 ][ 'gbp' ],
      baseline_cny = actualValues[ 0 ][ 'cny' ],
      baseline_YHOO = actualValues[ 0 ][ 'YHOO' ];
  
    for ( var i = 0; i < actualValues.length; i++ ) {
      var av = actualValues[ i ];
      newDataProvider.push( {
        'date': av.date,
        'val_usd': parseFloat( av[ 'usd' ].toFixed( 2 ) ),
        'val_krw': parseFloat( av[ 'krw' ].toFixed( 2 ) ),
        'val_rub': parseFloat( av[ 'rub' ].toFixed( 2 ) ),
        'val_aud': parseFloat( av[ 'aud' ].toFixed( 2 ) ),
        'val_eur': parseFloat( av[ 'eur' ].toFixed( 2 ) ),
        'val_gbp': parseFloat( av[ 'gbp' ].toFixed( 2 ) ),
        'val_cny': parseFloat( av[ 'cny' ].toFixed( 2 ) ),
        'val_YHOO': parseFloat( av[ 'YHOO' ].toFixed( 2 ) ),
        'mid': 0.5,
        'pos_1d': 0,
        'pos_2d': 0,
        'pos_3d': 0,
        'neg_1d': 0,
        'neg_2d': 0,
        'neg_3d': 0,
  
        'pos_1u_usd': calcBandPos1( av[ 'usd' ], baseline_usd, bandOpts ),
        'pos_2u_usd': calcBandPos2( av[ 'usd' ], baseline_usd, bandOpts ),
        'pos_3u_usd': calcBandPos3( av[ 'usd' ], baseline_usd, bandOpts ),
        'neg_1u_usd': calcBandNeg1( av[ 'usd' ], baseline_usd, bandOpts ),
        'neg_2u_usd': calcBandNeg2( av[ 'usd' ], baseline_usd, bandOpts ),
        'neg_3u_usd': calcBandNeg3( av[ 'usd' ], baseline_usd, bandOpts ),
  
        'pos_1u_krw': calcBandPos1( av[ 'krw' ], baseline_krw, bandOpts ),
        'pos_2u_krw': calcBandPos2( av[ 'krw' ], baseline_krw, bandOpts ),
        'pos_3u_krw': calcBandPos3( av[ 'krw' ], baseline_krw, bandOpts ),
        'neg_1u_krw': calcBandNeg1( av[ 'krw' ], baseline_krw, bandOpts ),
        'neg_2u_krw': calcBandNeg2( av[ 'krw' ], baseline_krw, bandOpts ),
        'neg_3u_krw': calcBandNeg3( av[ 'krw' ], baseline_krw, bandOpts ),
  
        'pos_1u_rub': calcBandPos1( av[ 'rub' ], baseline_rub, bandOpts ),
        'pos_2u_rub': calcBandPos2( av[ 'rub' ], baseline_rub, bandOpts ),
        'pos_3u_rub': calcBandPos3( av[ 'rub' ], baseline_rub, bandOpts ),
        'neg_1u_rub': calcBandNeg1( av[ 'rub' ], baseline_rub, bandOpts ),
        'neg_2u_rub': calcBandNeg2( av[ 'rub' ], baseline_rub, bandOpts ),
        'neg_3u_rub': calcBandNeg3( av[ 'rub' ], baseline_rub, bandOpts ),
  
        'pos_1u_aud': calcBandPos1( av[ 'aud' ], baseline_aud, bandOpts ),
        'pos_2u_aud': calcBandPos2( av[ 'aud' ], baseline_aud, bandOpts ),
        'pos_3u_aud': calcBandPos3( av[ 'aud' ], baseline_aud, bandOpts ),
        'neg_1u_aud': calcBandNeg1( av[ 'aud' ], baseline_aud, bandOpts ),
        'neg_2u_aud': calcBandNeg2( av[ 'aud' ], baseline_aud, bandOpts ),
        'neg_3u_aud': calcBandNeg3( av[ 'aud' ], baseline_aud, bandOpts ),
  
        'pos_1u_eur': calcBandPos1( av[ 'eur' ], baseline_eur, bandOpts ),
        'pos_2u_eur': calcBandPos2( av[ 'eur' ], baseline_eur, bandOpts ),
        'pos_3u_eur': calcBandPos3( av[ 'eur' ], baseline_eur, bandOpts ),
        'neg_1u_eur': calcBandNeg1( av[ 'eur' ], baseline_eur, bandOpts ),
        'neg_2u_eur': calcBandNeg2( av[ 'eur' ], baseline_eur, bandOpts ),
        'neg_3u_eur': calcBandNeg3( av[ 'eur' ], baseline_eur, bandOpts ),
  
        'pos_1u_gbp': calcBandPos1( av[ 'gbp' ], baseline_gbp, bandOpts ),
        'pos_2u_gbp': calcBandPos2( av[ 'gbp' ], baseline_gbp, bandOpts ),
        'pos_3u_gbp': calcBandPos3( av[ 'gbp' ], baseline_gbp, bandOpts ),
        'neg_1u_gbp': calcBandNeg1( av[ 'gbp' ], baseline_gbp, bandOpts ),
        'neg_2u_gbp': calcBandNeg2( av[ 'gbp' ], baseline_gbp, bandOpts ),
        'neg_3u_gbp': calcBandNeg3( av[ 'gbp' ], baseline_gbp, bandOpts ),
  
        'pos_1u_cny': calcBandPos1( av[ 'cny' ], baseline_cny, bandOpts ),
        'pos_2u_cny': calcBandPos2( av[ 'cny' ], baseline_cny, bandOpts ),
        'pos_3u_cny': calcBandPos3( av[ 'cny' ], baseline_cny, bandOpts ),
        'neg_1u_cny': calcBandNeg1( av[ 'cny' ], baseline_cny, bandOpts ),
        'neg_2u_cny': calcBandNeg2( av[ 'cny' ], baseline_cny, bandOpts ),
        'neg_3u_cny': calcBandNeg3( av[ 'cny' ], baseline_cny, bandOpts ),
  
        'pos_1u_YHOO': calcBandPos1( av[ 'YHOO' ], baseline_YHOO, bandOpts ),
        'pos_2u_YHOO': calcBandPos2( av[ 'YHOO' ], baseline_YHOO, bandOpts ),
        'pos_3u_YHOO': calcBandPos3( av[ 'YHOO' ], baseline_YHOO, bandOpts ),
        'neg_1u_YHOO': calcBandNeg1( av[ 'YHOO' ], baseline_YHOO, bandOpts ),
        'neg_2u_YHOO': calcBandNeg2( av[ 'YHOO' ], baseline_YHOO, bandOpts ),
        'neg_3u_YHOO': calcBandNeg3( av[ 'YHOO' ], baseline_YHOO, bandOpts )
      } );
    }
  
    newDataSet[ 0 ].dataProvider = newDataProvider;
  
    for ( var i = 0; i < dimensions.length; i++ ) {
      var dim = dimensions[ i ];
      var dimHandle = "_" + dim.dimension;
  
      var newFieldMappings = buildFieldMappings( dimHandle );
  
      for ( var x = 0; x < newFieldMappings.length; x++ ) {
        var fm = newFieldMappings[ x ];
        newDataSet[ 0 ].fieldMappings.push( fm );
      }
  
      var newPanel = buildPanel( dimHandle );
      newPanel.allLabels[ 0 ].text = dim.dimension;
      chartPanels.push( newPanel );
    }
  
    chart.panels = chartPanels;
    chart.dataSets = newDataSet;
  
  }, [ "stock" ] );
  
  var chart = AmCharts.makeChart( "chartdiv", {
    "type": "stock",
    "dataDateFormat": "YYYY-MM-DD",
  
    "chartScrollbarSettings": {
      "graph": "g1",
      "scrollbarHeight": 40,
  
      "dragIcon": "dragIconRectSmall",
      "dragIconWidth": 20,
      "dragIconHeight": 40,
  
      "backgroundAlpha": 0,
      "selectedBackgroundAlpha": 0.1,
      "selectedBackgroundColor": "#888888",
      "graphFillAlpha": 0,
      "graphLineAlpha": 0.5,
      "selectedGraphFillAlpha": 0,
      "selectedGraphLineAlpha": 1,
      "color": "#AAAAAA"
    },
  
    "balloon": {
      "fontSize": 13
    },
  
    "panelsSettings": {
      "fontFamily": "Arial",
      "creditsPosition": "bottom-right",
      "panelSpacing": 1,
      "marginLeft": 15,
      "marginRight": 15
    },
  
    "chartCursorSettings": {
      "cursorAlpha": 0.5,
      "cursorColor": '#444444',
      "valueLineAlpha": 0,
      "valueBalloonsEnabled": true,
      "oneBalloonOnly": true
    },
  
    "categoryAxesSettings": {
      "minPeriod": "hh",
      "parseDates": true,
      "equalSpacing": false,
      "gridAlpha": 0,
      "axisAlpha": 0,
      "inside": true,
      "maxSeries": 0
    },
  
    "periodSelector": {
      "position": "bottom",
      "inputFieldsEnabled": false,
      "periods": [ {
        "period": "DD",
        "selected": true,
        "count": 1,
        "label": "1d"
      }, {
        "period": "DD",
        "selected": true,
        "count": 10,
        "label": "10d"
      }, {
        "period": "MM",
        "selected": true,
        "count": 1,
        "label": "1m"
      }, {
        "period": "MM",
        "selected": true,
        "count": 6,
        "label": "6m"
      }, {
        "period": "YYYY",
        "selected": true,
        "count": 6,
        "label": "1y"
      }, {
        "period": "MAX",
        "label": "MAX"
      } ]
    },
    "export": {
      "enabled": true
    }
  } );