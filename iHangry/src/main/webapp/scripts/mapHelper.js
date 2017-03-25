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
    $(mapEl).data('map', map);

    var infowindow = new google.maps.InfoWindow();

    var color = "#FFF";
    //set current location
    setMarker(lat, lng, "Your Location", map, infowindow, color);
  
    //add color variable to chagne start location (green?)

    $.post("GetRestaurants", {lat: lat, lng: lng}, function(response) {
        $(mapEl).data('locs', response); //saves all locations to the map
        var locs = Array(),
            counter = 1;
        $.each(response, function(index, element) {
            locs.push([element.name, element.geometry.location.lat, element.geometry.location.lng, counter++]);
        });

        var markers = Array();
        var color = "#0F0";
        for (var i = 0; i < locs.length; i++) {
            setMarker(locs[i][1], locs[i][2], locs[i][0], map, infowindow, color, markers);
        }
        $(mapEl).data('markers', markers); //Create marker list
        getRecommendation();
    });
}

function setDistanceAndTime(placeID, distEl, timeEl) {
    $.post("GetDistance", {placeID: placeID}, function(response) {
        distEl.text(response.rows[0].elements[0].distance.text);
        timeEl.text(response.rows[0].elements[0].duration.text);
    });
}

function setMarker(lat, lng, text, map, infowindow, color, list) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: pinSymbol(color)
    });
    
    if (list) {
        list.push(marker);
    }

    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
            infowindow.setContent(text); //fills pin info
            infowindow.open(map, marker);
        };
    })(marker));
}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1
   };
}

function getRecommendation(tries) {
    var map = $('#map'), // Get map div, because it holds the loc data
        infoDiv = $('#InfoDiv'), // get info div for manipulation
        locs = map.data('locs'), // get loc data
        minimum = 0, // minimum random number
        maximum = locs.length - 1, // maximum random number
        placeIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum, // get random restaurant index
        lastIndex = map.data('last')
        maxTries = 10; // max number of tries before giving up
    
    infoDiv.find('.loader-div').show();
    infoDiv.find('.content-div').hide();
        
    tries = tries || 0; // if tries is passed in, set it to that, otherwise 0
    var loc = locs[placeIndex],
        isSamePlace = lastIndex && placeIndex === lastIndex,
        isOpen = (!loc || (loc.opening_hours && !loc.opening_hours.open_now));
    // logic for testing a retry (if not open and haven't run out of tries)
    if (isOpen && tries < maxTries && isSamePlace) {
        getRecommendation(tries + 1);
    } else {
        map.data('last', placeIndex);
        
        infoDiv.find('.name').text(loc.name);
        infoDiv.find('.rating').text(loc.rating + " stars");
        infoDiv.find('.address').text(loc.vicinity);
        
        setDistanceAndTime(loc.place_id, infoDiv.find('.distance'), infoDiv.find('.eta'));
        infoDiv.find('.loader-div').hide();
        infoDiv.find('.content-div').show();
        focusPin(placeIndex);
    }
}

function focusPin(index) {
    var map = $("#map");
    var marker = map.data('markers')[index];
    google.maps.event.trigger(marker, 'click');
    map.data('map').panTo(marker.getPosition());
}
