Plotly.d3.csv('static/exp.csv', function(err, data) {
    var lookup = {};
    function getData(Year, region) {
        var byYear, trace;
        if (!(byYear = lookup[Year])) {;
            byYear = lookup[Year] = {};
    }
    if (!(trace = byYear[region])) {
        trace = byYear[region] = {
          x: [],
          y: [],
          id: [],
          text: [],
          marker: {size: []}
        };
      }
      return trace;
    }
    custom_colors = {
        'Asia': 'rgb(171, 99, 250)',
        'Europe': 'rgb(230, 99, 250)',
        'Africa': 'rgb(99, 110, 250)',
        'Americas': 'rgb(25, 211, 243)',
        'Oceania': 'rgb(50, 170, 255)'
    }
    // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.Year, datum.region);
    trace.text.push(datum.Exporter);
    trace.id.push(datum.Exporter);
    trace.x.push(datum.Year);
    trace.y.push(datum.value);
    trace.marker.size.push(datum.region);
  }

  // Get the group names:
  var years = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstYear = lookup[years[0]];
  var region = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < region.length; i++) {
    var data = firstYear[region[i]];
    traces.push({
        name: region[i],
        x: data.x.slice(),
        y: data.y.slice(),
        id: data.id.slice(),
        text: data.text.slice(),
        mode: 'markers',
        marker: {
          size: data.marker.size.slice(),
          sizemode: 'area',
          sizeref: 200000
        },
        color: custom_colors[region]
      });
    }
    // Create a frame for each year
    var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: region.map(function (rgn) {
        return getData(years[i], rgn);
      })
    })
  }
  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'weight',

    },
    yaxis: {
      title: 'Value',
      type: 'log'
    },
    hovermode: 'closest',
    updatemenus: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [{
          method: 'animate',
          args: [null, {
            mode: 'immediate',
            fromcurrent: true,
            transition: {duration: 300},
            frame: {duration: 500, redraw: false}
          }],
          label: 'Play'
        }, {
          method: 'animate',
          args: [[null], {
            mode: 'immediate',
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
          }],
          label: 'Pause'
        }]
      }],
      sliders: [{
        pad: {l: 130, t: 55},
        currentvalue: {
          visible: true,
          prefix: 'Year:',
          xanchor: 'right',
          font: {size: 20, color: '#666'}
        },
        steps: sliderSteps
      }]
    };
  
    // Create the plot:
    Plotly.plot('mydiv', {
      data: traces,
      layout: layout,
      frames: frames,
    });
  });