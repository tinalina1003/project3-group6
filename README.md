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
<ul>1 boroughs map that shows the boundaries of the boroughs with popup information for each borough; the information includes Total Area (sq.km), Total Population, Total Accidents, Accidents per 100,000 people, and Accidents per Sq.km.</ul>
<ul>1 heat map that measures total accidents in all of london</ul>
<ul>1 accidents layer that shows all the accidents incurred in 2019</ul>
<ul>3 severity layers, one for each severity: slight, serious, and fatal. This map includes all accidents in each category</ul>
<ul>5 modes of transportation layers: Car, Pedestrian, Bus or Coach, Bicycle, and Other Modes of transportation. Other modes of transportation include PoweredTwoWheeler(motor scooters/mopeds), Taxis, Private Hire, Goods Vehicles (semis), and all other types of vehicles</ul>

summary:
city of london highest accident per population and area ratio because low number of residents


keep in mind it could also be people who are passing by the boroughs that cause accidents so it's not 100% indicative of the safety of city of london.

however, still the highest accidents/sq.km in london with 220 accidents/sq.km

bromley lowest accidents/sq.km



<h1> London Accident Data by Borough</h1>

![AccidentByBorough2](https://github.com/tinalina1003/project3-group6/assets/127992819/6cc6d422-6469-49ec-8525-7a9e737753cc)

![AccidentByBorough1](https://github.com/tinalina1003/project3-group6/assets/127992819/fc84405f-924d-4454-95f8-1c483644a19e)


