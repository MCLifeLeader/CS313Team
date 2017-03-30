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
    
    // "Night" via mapstyle.withgoogle.com
    var mapStyle2 = [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},
                    {"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},
                    {"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},
                    {"featureType":"administrative.locality","elementType": "labels.text.fill","stylers":[{"color":"#d59563"}]},
                    {"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},
                    {"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},
                    {"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},
                    {"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},
                    {"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},
                    {"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},
                    {"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},
                    {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},
                    {"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},
                    {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},
                    {"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},
                    {"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},
                    {"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},
                    {"featureType": "water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}]
                
    // "Flat Colors" via https://snazzymaps.com/style/19955/flat-colors
    var mapStyle3 = [{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"23"}]},
                    {"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#f38eb0"}]},
                    {"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#ced7db"}]},
                    {"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#ffa5a8"}]},
                    {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#c7e5c8"}]},
                    {"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"color":"#d6cbc7"}]},
                    {"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#c4c9e8"}]},
                    {"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#b1eaf1"}]},
                    {"featureType":"road","elementType":"geometry","stylers":[{"lightness":"100"}]},
                    {"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"},{"lightness":"100"}]},
                    {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffd4a5"}]},
                    {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffe9d2"}]},
                    {"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"}]},
                    {"featureType":"road.local","elementType":"geometry.fill","stylers":[{"weight":"3.00"}]},
                    {"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"weight":"0.30"}]},
                    {"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},
                    {"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"36"}]},
                    {"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#e9e5dc"},{"lightness":"30"}]},
                    {"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":"100"}]},
                    {"featureType":"water","elementType":"all","stylers":[{"color":"#d2e7f7"}]}]
               
    // "Light Dream" via https://snazzymaps.com/style/134/light-dream
    var mapStyle4 = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},
                    {"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},
                    {"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},
                    {"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},
                    {"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},
                    {"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
                
                    

    var styledMapType = new google.maps.StyledMapType(mapStyle1, {name: 'Dark'});
    var styledMapType2 = new google.maps.StyledMapType(mapStyle2, {name: 'Night'});
    var styledMapType3 = new google.maps.StyledMapType(mapStyle3, {name: 'Flat'});
    var styledMapType4 = new google.maps.StyledMapType(mapStyle4, {name: 'Light'});
    
    var mapEl = document.getElementById("map");
    var map = new google.maps.Map(mapEl, {
        zoom: 14,
        center: new google.maps.LatLng(lat, lng),
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'styled_map', 'styled_map2', 'styled_map3', 'styled_map4']
        }
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    map.mapTypes.set('styled_map2', styledMapType2);
    map.setMapTypeId('styled_map2');
    
    map.mapTypes.set('styled_map3', styledMapType3);
    map.setMapTypeId('styled_map3');
    
    map.mapTypes.set('styled_map4', styledMapType4);
    map.setMapTypeId('styled_map4');

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
        var color = "#009587"; // Previously #0F0 -- Feel free to revert!
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
