function importer(){
Plotly.d3.csv('static/importer.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    var allCountryNames = unpack(rows, 'Importer'),
        allYear = unpack(rows, 'Year'),
        allValue = unpack(rows, 'value'),
        allWeight = unpack(rows, 'weight'),
        allPercent = unpack(rows, 'percent'),
        allLoad = unpack(rows, 'loads'),
        listofYear = [], listofCountries = [], currentYear, currentBarCountry, currentBarValue = [], currentBarCountry = [], currentTablecountry = [],
        currentTablePercent = [], currentpercent = [], currentLoad = [], currentAreayear = [], currentAreavalue = [], currentLinePercent = [], currentLineCountry =[];
        
        for (var i = 0; i < allCountryNames.length; i++ ){
            if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
                listofCountries.push(allCountryNames[i]);
                listofCountries.sort();
            }
        }
        for (var i = 0; i < allYear.length; i++ ){
            if (listofYear.indexOf(allYear[i]) === -1 ){
                listofYear.push(allYear[i]);
            }
        }

        function getCountryData(chosenCountry) {
            currentAreavalue = [];
            currentAreayear = [];
            for (var i = 0 ; i < allCountryNames.length ; i++){
                if ( allCountryNames[i] === chosenCountry ) {
                    currentAreavalue.push(allValue[i]);
                    currentAreayear.push(allYear[i]);
                }
            }
        };

        function getYearData(chosenYear) {
            currentBarValue = [];
            currentBarCountry = [];
            currentTablePercent = [];
            currentTablecountry = [];
            currentBarpercent = [];
            currentLinePercent = [];
            currentLineCountry = [];


            for (var i = 0 ; i < allYear.length ; i++){
                    if ( allYear[i] === chosenYear && allWeight[i] !== '0') {
                        currentBarValue.push(allValue[i]);  
                        currentBarCountry.push(allCountryNames[i]);
                        currentBarpercent.push(allPercent[i]);   
                     }
                    if (allYear[i] === chosenYear && allLoad[i] !== '0'){
                        currentTablePercent.push(allLoad[i]); 
                        currentTablecountry.push(allCountryNames[i]);                      
                    }
                    if (allYear[i] === chosenYear && allLoad[i] !== '0'){
                        currentLinePercent.push(allLoad[i]); 
                        currentLineCountry.push(allCountryNames[i]);                                       
                    }
                }   
        };
        setBarPlot('2007');
        setTabledata('2007');
        setLinePlot('2007');
        setAreaPlot('All Countries');
        
        function setAreaPlot(chosenCountry) {
            getCountryData(chosenCountry);
            var myPlot = document.getElementById('plotdiv2')
            var trace1 = {
                x: currentAreayear,
                y: currentAreavalue,
                fill: 'tozeroy',
                mode: 'lines+markers',
                marker: {
                    size: 12,
                    opacity: 0.5
                },
                line: {color: 'rgb(50, 166, 20)'}
            };
    
            var data = [trace1];
    
            var layout = {
                title:'Soy Beans Importers -' +chosenCountry,
                height: 400,
                width: 900
            };
            Plotly.newPlot('plotdiv2', data, layout);
            myPlot.on('plotly_click', function(data){
              var pts = '';
              for(var i=0; i < data.points.length; i++){
                pts = data.points[i].x               
              }
            if (pts === 2012){setBarPlot('2012');}else if (pts === 2013){setBarPlot('2013');} else if (pts === 2014){setBarPlot('2014');} else if (pts === 2015){setBarPlot('2015');}else if (pts === 2016){setBarPlot('2016');}else if (pts === 2007){setBarPlot('2007');}else if (pts === 2008){setBarPlot('2008');}else if (pts === 2009){setBarPlot('2009');}else if (pts === 2010){setBarPlot('2010');}else if (pts === 2011){setBarPlot('2011');}
            if (pts === 2012){setTabledata('2012');}else if (pts === 2013){setTabledata('2013');} else if (pts === 2014){setTabledata('2014');} else if (pts === 2015){setTabledata('2015');}else if (pts === 2016){setTabledata('2016');}else if (pts === 2007){setTabledata('2007');}else if (pts === 2008){setTabledata('2008');}else if (pts === 2009){setTabledata('2009');}else if (pts === 2010){setTabledata('2010');}else if (pts === 2011){setTabledata('2011');}  
            if (pts === 2012){setLinePlot('2012');}else if (pts === 2013){setLinePlot('2013');} else if (pts === 2014){setLinePlot('2014');} else if (pts === 2015){setLinePlot('2015');}else if (pts === 2016){setLinePlot('2016');}else if (pts === 2007){setLinePlot('2007');}else if (pts === 2008){setLinePlot('2008');}else if (pts === 2009){setLinePlot('2009');}else if (pts === 2010){setLinePlot('2010');}else if (pts === 2011){setLinePlot('2011');}
            });
        };

    function setBarPlot(chosenYear) {
        getYearData(chosenYear);
        var myPlot = document.getElementById('plotdiv1')
        var trace1 = {
            x: currentBarValue,
            y: currentBarCountry,
            type: 'bar',
            text: currentBarpercent,
            textposition: 'auto',

            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
              }, {
                type: 'filter',
                target: 'x',
                operation: '>',
                value: 1
              }],
            marker:{
                color: ['rgb(65, 175, 37)','rgb(83, 232, 46)', 'rgb(65, 175, 37)','rgb(83, 232, 46)', 'rgb(117, 182, 101)']
              },
            orientation : 'h',
        };      
        var data = [trace1];

        var layout = {
            title:'Top 5 Soybeans Importers -'+chosenYear,
            height: 400,
            width: 400
        };

        Plotly.newPlot('plotdiv1', data, layout);
        myPlot.on('plotly_click', function(data){
            var pts = '';
            for(var i=0; i < data.points.length; i++){
              pts = data.points[i].y              
            }
          if (pts === 'India'){setAreaPlot('India');}else if (pts === 'Germany'){setAreaPlot('Germany');} else if (pts === 'Japan'){setAreaPlot('Japan');} else if (pts === 'Spain'){setAreaPlot('Spain');}else if (pts === 'China'){setAreaPlot('China');}else if (pts === 'Netherlands'){setAreaPlot('Netherlands');}else if (pts === 'Mexico'){setAreaPlot('Mexico');}else if (pts === 'Indonesia'){setAreaPlot('Indonesia');}
        });
    };

    function setTabledata(chosenYear) {
        getYearData(chosenYear);
        function colorSetup(currentTablePercent){
            colours = 'white';
            result = [];
            for(var i=0; i < currentTablePercent.length; i++){
              if (currentTablePercent[i] > '0' ){
                  result.push('rgb(83, 232, 46)');
                  colours = 'rgb(83, 232, 46)';
                  console.log(colours);
              }else{
                    result.push('rgb(247, 170, 81)');
                  colours = 'rgb(247, 170, 81)';
                  console.log(colours);
              }    
            }           
            console.log(result)
            return result;
          }
  
        var layout = {
            title: 'Fastest Growing/Declining'
        };
        var data = [{
            type: 'table',
            columnwidth: [30,30],
            columnorder: [0,1],
            header: {
              values: ["Country","Percent"],
              align: "left",
              line: {width: 1, color: 'white'},
              fill: {color: ['rgb(41, 111, 27)']},
              font: {family: "Arial", size: 14, color: "black"},
              order: "ascending"
            },
            cells: {
              values: [currentTablecountry,currentTablePercent],
              align: ["left", "left"],
              line: {color: "white", width: 1},
              fill: {color: ['rgb(65, 175, 37)', colorSetup(currentTablePercent)]},
              font: {family: "Arial", size: 12, color: ["black"]},
              order: "ascending"
            }
          }]
          Plotly.plot('plotdiv', data, layout);
        };

        function setLinePlot(chosenYear) {
                getYearData(chosenYear);
                function colorSetup(currentLinePercent){
                    colours = 'white';
                    result = [];
                    for(var i=0; i < currentLinePercent.length; i++){
                      console.log(currentLinePercent[i]);
                      if (currentLinePercent[i] > '0' ){
                          result.push('rgb(83, 232, 46)');
                          colours = 'rgb(83, 232, 46)';
                          console.log(colours);
                      }else{
                            result.push('rgb(247, 170, 81)');
                          colours = 'rgb(247, 170, 81)';
                          console.log(colours);
                      }    
                    }           
                    console.log(result)
                    return result;
                  }
                var trace1 = {
                    x: currentLinePercent,
                    y: currentLineCountry,
                    mode: 'lines+markers+text',
                    name: 'Lines, Markers and Text',
                    text: currentLinePercent,
                    textposition: 'bottom',
                    type: 'scatter',
                    line: {color: 'rgb(50, 166, 20)'},
                    
                   marker:{
                        color: colorSetup(currentLinePercent)
                      },

                };      
                var data = [trace1];
        
                var layout = {
                    title:"Fastest Growing / Declining-"+chosenYear,
                    height: 400,
                    width: 500,
                    xaxis: {range: [-20,0,20,40,60]}
                };
        
                Plotly.newPlot('plotdiv3', data, layout);
            };
    
    /****display */
    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot1'),
        plotE = innerContainer.querySelector('.plot'),
        plotE3 = innerContainer.querySelector('.plot3'),
        plotE2 = innerContainer.querySelector('.plot2'),
        countrySelector = innerContainer.querySelector('.countrydata'),
        yearSelector = innerContainer.querySelector('.yeardata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }
    assignOptions(listofYear, yearSelector);

    function updateYear(){
        setBarPlot(yearSelector.value);
        setTabledata(yearSelector.value);
        setLinePlot(yearSelector.value);
    }
    assignOptions(listofCountries, countrySelector);
        
    function updateCountry(){
        setAreaPlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);
    yearSelector.addEventListener('change', updateYear, false);
});
}