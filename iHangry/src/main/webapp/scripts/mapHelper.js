/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google */

function setupMap(lat, lng) {
    var mapEl = document.getElementById("map");
    var map = new google.maps.Map(mapEl, {
        zoom: 14,
        center: new google.maps.LatLng(lat, lng)
    });

    var infowindow = new google.maps.InfoWindow();

    //set current location
    setMarker(lat, lng, "Your Location", map, infowindow);
  
    //add color variable to chagne start location (green?)

    $.post("GetRestaurants", {lat: lat, lng: lng}, function(response) {
        $(mapEl).data('locs', response); //saves all locations to the map
        var locs = Array(),
            counter = 1;
        $.each(response, function(index, element) {
            locs.push([element.name, element.geometry.location.lat, element.geometry.location.lng, counter++]);
        });

        for (var i = 0; i < locs.length; i++) {
            setMarker(locs[i][1], locs[i][2], locs[i][0], map, infowindow);
        }
        getRecommendation();
    });
}

function setDistanceAndTime(placeID, distEl, timeEl) {
    //debugger;
    $.post("GetDistance", {placeID: placeID}, function(response) {
        //debugger;
        distEl.text(response.rows[0].elements[0].distance.text);
        timeEl.text(response.rows[0].elements[0].duration.text);
    });
}

function setMarker(lat, lng, text, map, infowindow) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
            infowindow.setContent(text); //fills pin info
            infowindow.open(map, marker);
        };
    })(marker));
}

function getRecommendation(tries) {
    var map = $('#map'), // Get map div, because it holds the loc data
        infoDiv = $('#InfoDiv'), // get info div for manipulation
        locs = map.data('locs'), // get loc data
        minimum = 0, // minimum random number
        maximum = locs.length - 1, // maximum random number
        random = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum, // get random restaurant index
        maxTries = 10; // max number of tries before giving up
    
    infoDiv.find('.loader-div').show();
    infoDiv.find('.content-div').hide();
        
    tries = tries || 0; // if tries is passed in, set it to that, otherwise 0
    var loc = locs[random];
    // logic for testing a retry (if not open and haven't run out of tries)
    if ((!loc || (loc.opening_hours && !loc.opening_hours.open_now)) && tries < maxTries) {
        getRecommendation(tries + 1);
    } else {
        infoDiv.find('.name').text(loc.name);
        infoDiv.find('.rating').text(loc.rating + " stars");
        infoDiv.find('.address').text(loc.vicinity);
        //debugger;
        setDistanceAndTime(loc.place_id, infoDiv.find('.distance'), infoDiv.find('.eta'));
        
        infoDiv.find('.loader-div').hide();
        infoDiv.find('.content-div').show();
    }
}
