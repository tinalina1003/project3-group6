const url = 'https://api.tfl.gov.uk/AccidentStats/2019'
var accident_dataset = [];
var severities = [];
var borough_accident_dataset = [];
var bar;
var boroughLabels;

d3.json(url).then(loaddata);

function loaddata(data) {
    createBarChart(data);
    createRadarChart(data);
}

function createBarChart(data) {
    console.log("data", data)
    
    //Get unique borough and severities list
    boroughLabels = [...new Set(data.map(t => t.borough))].sort();
    severities = [...new Set(data.map(t => t.severity))];
    console.log(boroughLabels);
    console.log(severities);

    // Populate datasets for borough and severities
    for (let boroughIndex = 0; boroughIndex < boroughLabels.length; boroughIndex++) {
        let accidents = data.filter(t => t.borough == boroughLabels[boroughIndex]).length
        borough_accident_dataset.push({
            "borough": boroughLabels[boroughIndex],
            "accidents": accidents
        }
        );

        for (let severityIndex = 0; severityIndex < severities.length; severityIndex++) {
            let accidents = data.filter(t => t.borough == boroughLabels[boroughIndex] && t.severity == severities[severityIndex]).length
            accident_dataset.push({
                "borough": boroughLabels[boroughIndex],
                "severity": severities[severityIndex],
                "accidents": accidents
            });
        }
    }

    console.log(accident_dataset)
    console.log(borough_accident_dataset)

    chrt = document.getElementById("myChart");

    var data = {
        labels: boroughLabels,
        datasets: [{
          label: 'Total Accidents',
          data: borough_accident_dataset.map(t => t.accidents),
          backgroundColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(255, 159, 64, 0.3)',
            'rgba(255, 205, 86, 0.3)',
            'rgba(75, 192, 192, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(153, 102, 255, 0.3)',
            'rgba(90, 250, 146, 0.3)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(90, 250, 146)'
          ],
          borderWidth: 1
        }]
      };

    bar = new Chart(chrt, {
        type: 'bar',
        data: data,
        options: {
          plugins: {
              title: {
                  display: true,
                  text: 'London Accident Data 2019',
                  font: {
                    size: 15,
                    weight: 'bold'
                }
              }
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Total # of Accidents',
                  font: {
                    size: 15,
                    weight: 'bold'
                }
              }
            },
              x: {
                title: {
                  display: true,
                  text: 'Boroughs',
                  font: {
                    size: 15,
                    weight: 'bold'
                }
                }
              }
          }
        }
    });

    var dropdown = document.getElementById("dropdown");
    console.log(dropdown)
    var optionElm = document.createElement("option")
    optionElm.text = '-';
    dropdown.appendChild(optionElm) 

    for (let severityIndex = 0; severityIndex < severities.length; severityIndex++) {
        var optionElm = document.createElement("option")
        optionElm.text = severities[severityIndex];
        dropdown.appendChild(optionElm) 
    }
}

function createRadarChart(dataset) {
    var casualtiesDataset = createCasualtiesDataset(dataset);
    console.log(casualtiesDataset);
    
    var casualtiesLabels = [...new Set(casualtiesDataset.map(t => t.mode))];
    var finalizedCasualtiesData = [];

    for (let casualtiesIndex = 0; casualtiesIndex < casualtiesLabels.length; casualtiesIndex++) {
        let casualties = casualtiesDataset.filter(t => t.mode == casualtiesLabels[casualtiesIndex]).length
        finalizedCasualtiesData.push(casualties);
    }

    var radarChartElm = document.getElementById("radarChart");

    const data = {
        labels: casualtiesLabels,
        datasets: [{
          label: 'Casualties',
          data: finalizedCasualtiesData,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      };

      var radarChart = new Chart(radarChartElm, {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'London Accident Casualties 2019',
                    font: {
                      size: 15,
                      weight: 'bold'
                    },
                    elements: {
                      line: {
                        borderWidth: 3
                      }
                    }
                  }
                }
              },
            });
          }

function createCasualtiesDataset(dataset) {
    var casualties = [];
    dataset.forEach(t => casualties = casualties.concat(t.casualties))
    return casualties;
}

function optionChange(dropdown) {
    console.log('option changed called', dropdown.value);

    let data = [];
    if (dropdown.value === '-') {
        data = borough_accident_dataset.map(t => t.accidents);
    } else {
        let severity_dataset = accident_dataset.filter(t => t.severity === dropdown.value);
        data = severity_dataset.map(t => t.accidents);
    }

    bar.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });


    bar.update();

}