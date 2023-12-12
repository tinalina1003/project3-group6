# Exploring London’s Vehicular Accident Rate in 2019: A Visual Journey

<h3>Group Members</h3><p>
Angad Dhillon<p>
Camille Velarde<p>
Christina Leung<p>
Gurpreet Doal<p>

<h1> Goal </h1>

Vehicular accidents are usual and impactful aspect of urban life, affecting communities on daily basis. The significance of road safety and potential to contribute to the well being of community drove out team to choose this topic.


<h1> Methodology </h1>

![architecture](https://github.com/tinalina1003/project3-group6/assets/127992819/0f7bada7-d2b7-40c2-b71e-7a3c3c7a2bfb)

Python (to clean and export data)
MongoDB (to store our data)
Flask (to create framework for API’s)
JavaScript & Chart.js (to visualize data)
HTML & CSS ( as basic skeleton of webpage)


<h1> Data </h1>

<h3>Data and Delivery:</h3>
The data component used in project, include London accident statistics obtained from an API, London borough boundaries in JSON format, and a CSV file with borough population data converted to JSON. A MongoDB database is used to store and manage the data after cleaning it in Pandas. The project is powered by a  three Python Flask API for each individual dataset, providing a robust backend for handling data operations. The technology stack includes HTML, CSS, and JavaScript for creating a dynamic and interactive front end.

APIs Used: <p>
London 2019 Accidents:
https://api-portal.tfl.gov.uk/api-details#api=AccidentStats&operation=AccidentStats_Get

London Boroughs:
https://data.london.gov.uk/dataset/statistical-gis-boundary-files-london?resource=9ba8c833-6370-4b11-abdc-314aa020d5e0

Borough Population and Area:
https://data.london.gov.uk/dataset/land-area-and-population-density-ward-and-borough


<h1> Map </h1>

![map](https://github.com/tinalina1003/project3-group6/assets/127992819/6ac06b07-2205-4f7f-979c-d1d0db1fc7a3)

<h3>Main Layers: </h3>
The map has 3 main layers: Street, Topography, and Satellite. Topography layer was included as a way to determine if topography would influence accidents, i.e.) slopes.

<h3>Overlay maps: </h3>
<li>1 boroughs map that shows the boundaries of the boroughs with popup information for each borough; the information includes Total Area (sq.km), Total Population, Total Accidents, Accidents per 100,000 people, and Accidents per Sq.km.</li>
<li>1 heat map that measures total accidents in all of london</li>
<li>1 accidents layer that shows all the accidents incurred in 2019</li>
<li>3 severity layers, one for each severity: slight, serious, and fatal. This map includes all accidents in each category</li>
<li>5 modes of transportation layers: Car, Pedestrian, Bus or Coach, Bicycle, and Other Modes of transportation. Other modes of transportation include PoweredTwoWheeler(motor scooters/mopeds), Taxis, Private Hire, Goods Vehicles (semis), and all other types of vehicles</li>

<h3>Summary: </h3>

<li>Bromley has the lowest accidents/sq.km of 9. This is due to Bromley having a large area of 150 sq.km</li>
<li>City of London has the highest with 220 accidents/sq.km. City of London has a small area of 2.9 sq.km</li>
<li>City of Westminster has highest accidents per 100,000 people with 1173</li>
<li>Harrow has lowest accidents per 100,000 people with 330</li>

Note: Not all accidents are produced by the residents in the borough; accidents can occur in the borough by people going between other boroughs

<h1> London Accident Data by Borough</h1>

An interactive bar graph was created using chart.js. The bar graph, by default, displays the total number of accidents in London for the year 2019 by borough. The data can be further filtered by the severity of the accident and can be sorted alphabetically or by ascending or descending values as shown below.

Sort by highest fatality in descending order:

![AccidentByBorough2](https://github.com/tinalina1003/project3-group6/assets/127992819/6cc6d422-6469-49ec-8525-7a9e737753cc)

Sort by highest total accidents in descending order:

![AccidentByBorough1](https://github.com/tinalina1003/project3-group6/assets/127992819/fc84405f-924d-4454-95f8-1c483644a19e)

<h3>Findings: </h3>
When we filter by severity, the top 5 boroughs remain the same, except when we filter by “Fatal” accidents

<h3>Top 5 Boroughs With Highest Fatalities in 2019: </h3>

1. Merton – 16 accidents
1. Cordon and Wandsworth – 14 accidents
1. Bromley, Brent, Hounslow – 12 accidents
1. Endfield and Hillingdon - 10 fatal accidents each

<h3>Top 5 Boroughs With Highest Total Accidents in 2019</h3>

1. The City of Westminster – 3032 accidents
1. Lambeth – 2382 accidents
1. Tower Hamlets – 2232 accidents
1. Southwark – 2186 accidents
1. Ealing – 1966 accidents

<h1>London Accident Data by Casualty Type</h1>


![casualty1](https://github.com/tinalina1003/project3-group6/assets/127992819/d2de7958-41ab-4374-9266-4c19c0f93979)

<h3>Findings: </h3>

The Highest Accident in Descending Order: 

1. November (4,694)
1. October (4,594)
1. June (4,544)

The Fewest Accidents in Ascending Order: 
1. January (3,790)
1. February (3,782)
1. April (3,760)

