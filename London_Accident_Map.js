
// load the DOM so I can manipulate the styling of the map
document.addEventListener("DOMContentLoaded", function (){

//////////////////////////////////////////
//////////// ACCIDENT LAYER //////////////
//////////////////////////////////////////

////// CLUSTER GROUP ////////

// create layer group
let accidentLayer = L.layerGroup();

let severityLayers = {
    Slight: new L.markerClusterGroup(),
    Serious: new L.markerClusterGroup(),
    Fatal: new L.LayerGroup()
}

let modeLayers = {
    Car: new L.markerClusterGroup(),
    Pedestrian: new L.markerClusterGroup(),
    Bicycle: new L.markerClusterGroup(),
    'BusOrCoach': new L.LayerGroup(),
    'OtherModes': new L.markerClusterGroup()
}

// json data
let accidentUrl = 'http://127.0.0.1:5000/api/v1.0/accidents';


// extract data
d3.json(accidentUrl).then(function(data){

    // create cluster group
    let markerGroup = L.markerClusterGroup({

        // change the colours of the cluster so its not defaulted to max colour at 100
        // and min at 10
        iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-';
            if (childCount < 20) {
                c += 'super-mini'
            }

            else if (childCount < 300) {
                c += 'mini'
            }
            else if (childCount < 1000) {
              c += 'small';
            } 

            else if (childCount < 5000) {
              c += 'medium';
            } 
            else {
              c += 'large';
            }
           
            return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', 
             className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
            }
    });


    /////////////////////////////////////////////////
    //////////////// ICON MARKER ////////////////////
    /////////////////////////////////////////////////


    let icons = {};
    let iconDisplay = "";
    for (i=0; i<data.length;i++){

        // extract info/properties I need
        let location = data[i];
        let mode = data[i].mode;
        let severity = data[i].severity;

        // create a display icon to show up depending on mode of transporation
        if (mode == 'Car'){
            iconDisplay = 'ion-android-car';
        }
        else if (mode == 'Pedestrian'){
            iconDisplay = 'ion-android-walk'
        }
        else if (mode == 'BusOrCoach'){
            iconDisplay = 'ion-android-bus'
        }
        else if (mode == 'PedalCycle'){
            iconDisplay = 'ion-android-bicycle'
        }
        else {
            iconDisplay = 'ion-android-warning'
        }

        // create new icons for each incident
        icons[data[i].severity] = L.ExtraMarkers.icon({
            icon: iconDisplay,
            iconColor: 'white',
            markerColor: getMarkerColor(severity),
            shape: 'circle'
        });


        // at each location, create a marker and the popups
        let newMarker = L.marker([location.lat, location.lon], {
            icon: icons[severity]
           })
           .bindPopup("<h3>Location: </h3>" + location.location + "<h3>Date: </h3>" + 
           data[i].date + "<h3>Borough: </h3>" + location.borough + 
           "<h3> Casuality: </h3>" + mode)

        // add markers to layers
        if (mode == 'Car'){
            newMarker.addTo(modeLayers['Car'])
        }

        else if (mode == 'Pedestrian'){
            newMarker.addTo(modeLayers['Pedestrian'])
        }

        else if (mode == 'PedalCycle'){
            newMarker.addTo(modeLayers['Bicycle'])
        }

        else if (mode == 'BusOrCoach'){
            newMarker.addTo(modeLayers['BusOrCoach'])
        }

        else {
            newMarker.addTo(modeLayers['OtherModes'])
        }


        markerGroup.addLayer(newMarker);

        newMarker.addTo(severityLayers[severity]);

        

    };

    // accident counts per borough
    accidentCount(data);

    // add it to the accident layer to display
    accidentLayer.addLayer(markerGroup);


});

////////////////////////////////
/////// HEAT LAYER /////////////
////////////////////////////////

let heatmapLayer = L.layerGroup();

d3.json(accidentUrl).then(function(data){

    let heatArray = [];

    for (i=0; i < data.length; i++) {
        let location = data[i];

        if (location){
            heatArray.push([location.lat, location.lon]);
        };
    };

    let heat = L.heatLayer(heatArray, {
        radius:23,
        blur: 35,
        gradient: {0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1: 'red'}
    }).addTo(heatmapLayer)



});


//////////////////////////////////////////
//////////// BOROUGH LAYER ///////////////
//////////////////////////////////////////

let boroughLayer = L.layerGroup();

let boroughUrl = 'http://127.0.0.1:5000/api/v1.0/boroughs'


d3.json(boroughUrl).then(function(data){

    // json data
    let accidentUrl = 'http://127.0.0.1:5000/api/v1.0/accidents';

    d3.json(accidentUrl).then(function(accidentData){

    L.geoJSON(data, {
        // default style
        style: function(feature){
            return {
                color: 'white', // white outline
                fillColor: 'blue', // fill with orange
                fillOpacity: 0.3,
                weight: 1.5
            }
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: function(event){
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity:0.5 // so on event trigger (mouseover), fill opacity to 0.9
                    }); //closes the styling when mouse over

                    // change westminster if needed
                    layer.bindPopup("<h2>" + changeWestminster(feature) + `</h2><hr> \
                    <h5>Total Accidents: ${accidentCount(accidentData,feature.properties.name)}</h5>`).openPopup(); // opens up the popup on mouseover
                }, // closes mouseover
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.3
                    }); // closes the style when mouse out
                    layer.closePopup();
                }, // closes second mouseover
                click: function(event){
                    myMap.fitBounds(event.target.getBounds())
                    // on click might have to change other graphs... will have to think about this
                } // closes mouse out event
            }); // closes on layer
        } // closes on each feature

    }).addTo(boroughLayer)

    });// closes the nested d3.json
});


//////////////////////////////////////////////
//////////// CREATE STREET MAP ///////////////
//////////////////////////////////////////////

let street =   // Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// google satellite map
let sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});


/////////////////////////////////////
///////// CREATE BASE LAYERS ////////
/////////////////////////////////////


let baseMaps = {
    Street: street,
    Satellite: sat
}




//////////////////////////////////////
////// AGGREGATE ALL MAP LAYERS///////
//////////////////////////////////////

let overlayMaps = {
    'Boroughs': boroughLayer,
    'Accidents': accidentLayer,
    'Heat Map': heatmapLayer,
    'Slight': severityLayers.Slight,
    'Serous': severityLayers.Serious,
    'Fatal': severityLayers.Fatal,
    'Car': modeLayers.Car,
    Pedestrian: modeLayers.Pedestrian,
    Bicycle: modeLayers.Bicycle,
    'Bus or Coach': modeLayers.BusOrCoach,
    'Other Modes': modeLayers.OtherModes

}

// actual map


// Create a map object.
let myMap = L.map(document.getElementById("map-id"), {
    center: [51.495, -0.14],
    zoom: 10,
    layers: [street, 
            severityLayers.Fatal]
  });


L.control.layers(baseMaps, overlayMaps,{
    collapsed:true // so the lil menu bar at the top does not collapse into smaller menu
}).addTo(myMap)


////////// LEGEND ///////////////////////

var markerColor = {
    'Slight': 'green',
    'Serious': 'yellow',
    'Fatal': 'red'
};

var markerIconLegend = {
    'Car': 'ion-android-car',
    'PedalCycle': 'ion-android-bicycle',
    'Pedestrian': 'ion-android-walk',
    'BusOrCoach': 'ion-android-bus',
    'OtherModes': 'ion-android-warning'
};

function legendIcons(modeTransport){

    var modeIcon = L.ExtraMarkers.icon({
        icon: markerIconLegend[modeTransport],
        iconColor: 'black',
        markerColor: 'white',
        shape: 'circle'

    });


    return modeIcon;

};

function severityIcons(severityTransport){

    var severityLegendIcon = L.ExtraMarkers.icon({
        markerColor: markerColor[severityTransport],
        shape: 'circle'
    });

    return severityLegendIcon;

}

///////////////////////////////////////////////
/////// MODES OF TRANSPORTATION LEGEND ////////
///////////////////////////////////////////////

let modeLegend = L.control({position:'bottomleft'});

modeLegend.onAdd = function(){

    var modeDiv = L.DomUtil.create('div', 'info legend');

    var legendLabels = ['Car', 'PedalCycle', 'Pedestrian', 'BusOrCoach', 'OtherModes'];

    modeDiv.innerHTML = "<div class='legend-title'>Modes of Transportation</div>";

    for (i = 0; i<legendLabels.length; i++){
        let legendIcon = legendIcons(legendLabels[i]).createIcon();
        modeDiv.innerHTML += '<div class="legend-item">' +
        '<div class="legend-icon">' + legendIcon.outerHTML + '</div>' +
        '<div class="legend-item">'+ legendLabels[i] + '</div>' +
        '</div>'
    };

    return modeDiv;
};

modeLegend.addTo(myMap);

///////////////////////////////////////////////
/////////// SEVERITY COLOUR LEGEND ////////////
///////////////////////////////////////////////

let severityLegend = L.control({position: 'bottomright'});

severityLegend.onAdd = function(){

    
    var severityDiv = L.DomUtil.create('div', 'info legend');

    var severityLabels = ['Slight', 'Serious', 'Fatal'];

    severityDiv.innerHTML = "<div class='legend-title'>Incident Severity</div>";

    for(i=0; i<severityLabels.length; i++){
        let severityIcon = severityIcons(severityLabels[i]).createIcon();
        severityDiv.innerHTML += '<div class ="legend-item">' +
        '<div class = "legend-icon">' + severityIcon.outerHTML + '</div>' + 
        '<div class = "legend-item">' + severityLabels[i] + '</div>' +
        '</div>'
    };

    return severityDiv;
};


severityLegend.addTo(myMap);




///////////////////////////////////
//////////// BOROUGHS /////////////
///////////////////////////////////

function accidentCount(accidentData, boroughName) {
    // Create an object to store borough counts
    let boroughCounts = {};

    // Iterate through the accidentData array and count borough counts
    for (let i = 0; i < accidentData.length; i++) {
        let borough = accidentData[i].borough;

        borough = borough === 'Kingston' ? 'Kingston upon Thames' : borough;

        // If the borough is not in the counts object, initialize it to 1
        if (!boroughCounts[borough]) {
            boroughCounts[borough] = 1;
        } 

        else {
            // If the borough is already in the counts object, increment the count
            boroughCounts[borough]++;
        }

    };

    // once count is over, loop over to return the borough and match
    let currentBoroughCount = ""

    //  boroughName is from borough geojson data
    if (boroughName in boroughCounts){

            currentBoroughCount = boroughCounts[boroughName];

    }

    return currentBoroughCount;

};


///////////////////////////////////////////////////
//// CHANGE WESTMINSTER TO CITY OF WESTMINSTER ////
///////////////////////////////////////////////////

function changeWestminster(features){

    // change westminster to city of westminster
    if (features.properties.name === 'Westminster'){
        features.properties.name = 'City of Westminster'
    };

    // if not true, return the original name
    return features.properties.name;
};


});


/////////////////////////////////////////
//////////// MARKER COLOURS /////////////
/////////////////////////////////////////

function getMarkerColor(severity) {
    // Implement logic to determine marker color based on severity
    // Replace this with your own logic
    if (severity === 'Slight') {
        return 'green';
    } else if (severity === 'Serious') {
        return 'yellow';
    } else if (severity === 'Fatal') {
        return 'red';
    } else {
        return 'white';
    }
};


