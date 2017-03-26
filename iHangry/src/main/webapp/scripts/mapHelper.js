/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google */

function setupMap(lat, lng) {

    // Custom map styles
    // "Dark" via mapstyle.withgoogle.com
    var mapStyle1 = [{"elementType":"geometry","stylers":[{"color":"#212121"}]},
                    {"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
                    {"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},
                    {"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},
                    {"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},
                    {"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},
                    {"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},
                    {"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},
                    {"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},
                    {"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},
                    {"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
                    {"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},
                    {"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},
                    {"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},
                    {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},
                    {"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},
                    {"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},
                    {"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
                    {"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},
                    {"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},
                    {"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}];
                
    // "Retro" via mapstyle.withgoogle.com
    var mapStyle2 = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},
                    {"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},
                    {"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},
                    {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},
                    {"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},
                    {"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},
                    {"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},
                    {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},
                    {"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},
                    {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},
                    {"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},
                    {"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},
                    {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},
                    {"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},
                    {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},
                    {"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},
                    {"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},
                    {"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},
                    {"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},
                    {"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},
                    {"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},
                    {"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},
                    {"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},
                    {"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];

    var styledMapType = new google.maps.StyledMapType(mapStyle1, {name: 'Dark'});
    var styledMapType2 = new google.maps.StyledMapType(mapStyle2, {name: 'Retro'});

    var mapEl = document.getElementById("map");
    var map = new google.maps.Map(mapEl, {
        zoom: 14,
        center: new google.maps.LatLng(lat, lng),
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'styled_map', 'styled_map2']
        }
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    map.mapTypes.set('styled_map2', styledMapType2);
    map.setMapTypeId('styled_map2');

    $(mapEl).data('map', map);

    var infowindow = new google.maps.InfoWindow();

    var color = "#FFF";
    //set current location
    setMarker(lat, lng, "Your Location", map, infowindow, color);

    $.post("GetRestaurants", {lat: lat, lng: lng}, function (response) {
        $(mapEl).data('locs', response); //saves all locations to the map
        var locs = Array(),
                counter = 1;
        $.each(response, function (index, element) {
            locs.push([element.name, element.geometry.location.lat, element.geometry.location.lng, counter++]);
        });

        var markers = Array();//Create marker list
        var color = "#0F0";
        for (var i = 0; i < locs.length; i++) {
            setMarker(locs[i][1], locs[i][2], locs[i][0], map, infowindow, color, markers);
        }
        $(mapEl).data('markers', markers); //Add to map element
        getRecommendation();
    });
}

function setDistanceAndTime(placeID, distEl, timeEl) {
    $.post("GetDistance", {placeID: placeID}, function (response) {
        distEl.text("Distance: " + response.rows[0].elements[0].distance.text);
        timeEl.text("ETA: " + response.rows[0].elements[0].duration.text);
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

    var content = "<strong>" + text + "</strong>";

    google.maps.event.addListener(marker, 'click', (function (marker) {
        return function () {
            infowindow.setContent(content); //fills pin info
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
            lastIndex = map.data('last'),
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
