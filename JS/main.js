const url = 'http://localhost:5000/api/v1.0/accidents'
var accident_dataset = [];
var severities = [];
var borough_accident_dataset = [];
var bar;
var boroughLabels;
var severityDropdownSelected = '-';
var sortingDropdownSelected = 'A-Z';

d3.json(url).then(loaddata);

function loaddata(data) {
    createBarChart(data);
    // createRadarChart(data);
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


    console.log('accident_dataset', accident_dataset)
    console.log('borough_accident_dataset', borough_accident_dataset)

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
          responsive: true,
          maintainAspectRatio: false,
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

    var severityDropdown = document.getElementById("severityDropdown");
    console.log(severityDropdown)
    var optionElm = document.createElement("option")
    optionElm.text = '-';
    severityDropdown.appendChild(optionElm) 

    for (let severityIndex = 0; severityIndex < severities.length; severityIndex++) {
        var optionElm = document.createElement("option")
        optionElm.text = severities[severityIndex];
        severityDropdown.appendChild(optionElm) 
    }
}

function optionChange(severityDropdown) {
    console.log('option changed called', severityDropdown.value);
    this.severityDropdownSelected = severityDropdown.value;
    handleUpdatedDropdownFilters();
}

function sortingOptionChange(sortingDropdown) {
  console.log('sorting option changed called', sortingDropdown.value);
  this.sortingDropdownSelected = sortingDropdown.value;
  handleUpdatedDropdownFilters();
}


function handleUpdatedDropdownFilters() {
  let sortedLabels = [];
  let sortedDataset = [];
  let data = [];

  
  if (sortingDropdownSelected === 'A-Z') {
    sortedLabels = boroughLabels.sort();
    if (severityDropdownSelected === "-") {
      sortedLabels.forEach(label => {
        sortedDataset.push(borough_accident_dataset.find(t => t.borough === label));
      });
    } else {
      sortedLabels.forEach(label => {
        sortedDataset.push(accident_dataset.find(t => t.borough === label && t.severity === severityDropdownSelected));
      });
    }
  } else if (sortingDropdown.value === 'Ascending') {
    if (severityDropdownSelected === "-") {
      sortedDataset = borough_accident_dataset.sort(compareByAccidents);
    } else {
      let severity_dataset = accident_dataset.filter(t => t.severity === severityDropdownSelected);
      sortedDataset = severity_dataset.sort(compareByAccidents);
    }
  } else {
    if (severityDropdownSelected === "-") {
      sortedDataset = borough_accident_dataset.sort(compareByAccidentsDesc);
    } else {
      let severity_dataset = accident_dataset.filter(t => t.severity === severityDropdownSelected);
      sortedDataset = severity_dataset.sort(compareByAccidentsDesc);
    }
  }

  // finalizing data and labels
  console.log('sortedDataset', sortedDataset);
  data = sortedDataset.map(t => t.accidents);
  sortedLabels = sortedDataset.map(t => t.borough);

  // update the bar graph
  bar.data.datasets.forEach((dataset) => {
      dataset.data = data;
  });

  bar.data.labels = sortedLabels;
  bar.update();
}

function compareByAccidents(a, b) {
  if (a.accidents < b.accidents) {
    return -1;
  }
  if (a.accidents > b.accidents) {
    return 1;
  }
  return 0;
}

function compareByAccidentsDesc(a, b) {
  if (a.accidents > b.accidents) {
    return -1;
  }
  if (a.accidents < b.accidents) {
    return 1;
  }
  return 0;
}