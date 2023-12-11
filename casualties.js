//Getting link

const url ="http://127.0.0.1:5000/api/v1.0/accidents";

//Getting our GeoJSON data
d3.json(url).then(function(data){
    console.log(data);
    processAccidentData(data); //call the function to process data here
});

let monthlyAccidentCounts = {};
let vehicleTypeCounts = {};

//function to process accident data
function processAccidentData(data){
    
  //intialzied monthlt data structure 
  // object to keep track of accident counts for each month  as an empty objec
   monthlyAccidentCounts = {};
   vehicleTypeCounts = {};

   data.forEach(item => {
    //Processing for MONTHLY ACCIDENTS COUNTS 
    //parse the date and extract the month and year
    const date = new Date(item.date);
    const year =date.getFullYear();

    //process only if the year is 2019
    //condition checks whether the year of the current item is 2019.
    if(year === 2019){
       const month = date.getMonth(); // month is 0 index
       const monthYearKey = `${year}-${month+1}`;//craeting a yer month key

       //increment the count for this 
       //The [monthYearKey] is a string that combines the year and month of each accident
       //This way, you can keep a separate count for each month. 
        monthlyAccidentCounts[monthYearKey] = (monthlyAccidentCounts[monthYearKey] || 0) +1;
    
      //Processing for VEHICLE TYPE COUNTS 
       const vehicleType = item.mode; // in data mode coulmn has a vehicle type 
        if (!vehicleTypeCounts[monthYearKey]) {
        vehicleTypeCounts[monthYearKey] = {};
        }
        vehicleTypeCounts[monthYearKey][vehicleType] = (vehicleTypeCounts[monthYearKey][vehicleType] || 0) +1;
         }
      });

      //log the monthly Accident data
      console.log(" monthlyAccidentCounts:", monthlyAccidentCounts);
    
       //log the monthly Accident data
       console.log("  vehicleTypeCounts:", vehicleTypeCounts);
       displayAccidentData('2019-1');
}
    // mapping month names
     const monthDropdown = document.getElementById('monthDropdown');

     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      months.forEach((month,index) =>{
            const option = document.createElement('option');
            option.value = `2019-${index + 1}`; // Setting value as '2019-1' for January, '2019-2' for February, etc.
            option.textContent = month + ' 2019'; // Display text as 'January 2019', 'February 2019', etc.
             monthDropdown.appendChild(option);
    });

     // Add event listener to the dropdown
     monthDropdown.addEventListener('change', function() {
        const selectedMonth = this.value;
        displayAccidentData(selectedMonth);
    });
   
function formatMonthYear(monthYear) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const [year, monthIndex] = monthYear.split('-');
        const monthName = months[parseInt(monthIndex, 10) - 1];
        return `${monthName} ${year}`;
}    
 
function displayAccidentData(monthKey) {
    const readableMonth = formatMonthYear(monthKey);
    const accidents = monthlyAccidentCounts[monthKey] || 'No data';

    // Update total accidents
    const totalAccidentsDiv = document.getElementById('totalAccidents');
    totalAccidentsDiv.innerHTML = `Accidents in ${readableMonth}: ${accidents}`;

    // Process and display vehicle types and counts
    const vehicleTypes = vehicleTypeCounts[monthKey];
    let vehicleTypesText = 'No data';
    if (vehicleTypes) {
        vehicleTypesText = 'Vehicle Types: no of vehicles <br>' + Object.entries(vehicleTypes)
            .map(([type, count]) => `${type}:  ${count}`)
            .join('<br>');


    
        // Generate data for the pie chart
           const data = [{
            values: Object.values(vehicleTypes),
            labels: Object.keys(vehicleTypes),
            type: 'pie',
            marker: {
                colors: ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff'] //  array of colors
            }
        }];

        const layout = {
            title: `Vehicle Types Involved in Accidents - ${readableMonth}`,
            paper_bgcolor: 'rgba(0, 0, 0, 0)',
            plot_bgcolor: 'rgba(0, 0, 0, 0)'
        };

        Plotly.newPlot('vehicleTypePieChart', data, layout);
    } else {
        document.getElementById('vehicleTypePieChart').innerHTML = 'No data available for this month';
    }

      // Display the information
      const infoDiv = document.getElementById('accidentInfo');
      infoDiv.innerHTML = vehicleTypesText;
  }

 








  

  











