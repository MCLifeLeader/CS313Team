<%-- 
    Document   : location
    Created on : Mar 10, 2017, 9:09:40 PM
    Author     : Ele Thompson
--%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>iHangry | Find Some Foods</title>

        <!-- jQuery Support -->
        <script src="scripts/jquery-3.1.1.min.js"></script>

        <!-- Bootstrap JavaScript Support -->
        <script src="scripts/bootstrap.min.js"></script>

        <!-- BOOTSTRAP CSS -->
        <link rel="stylesheet" href="content/bootstrap.min.css">

        <!-- MATERIAL DESIGN FOR BOOTSTRAP - http://fezvrasta.github.io/bootstrap-material-design/ -->
        <link rel="stylesheet" href="content/bootstrap-material-design.min.css" type="text/css">

        <!-- CUSTOM STYLESHEETS-->
        <link rel="stylesheet" href="content/styles.css" type="text/css">

        <!-- FAVICON IMAGE -->
        <link rel="icon" href="/images/iHangry.ico" type="image/x-icon">

        <!-- Google Places API Access - For autocomplete (Move to servlet controller?) -->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxRoQJSpiJs0YzwUoQZS86YqRT0eZSjoE&libraries=places"></script>

    </head>
    <body onload="loadLatLong()">
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-sm-offset-2 col-sm-8 well text-center">
                        <h1>Where you at?</h1>
                        <!-- CHANGE ACTION TO SETLOCATION SERVLET-->
                        <form id="submitLoc" action="SetLocation" method="POST">
                            <div class="form-group row">
                                <input type="text" class="col-sm-8 col-sm-offset-2" name="location" id="location" placeholder="Street address, city, state">
                            </div>
                            <div class="row">
                                <input type="submit" class="btn btn-primary btn-raised btn-large" value="Set Location">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
        <footer>

        </footer>
        <!-- Google Places Autocomplete Script (Move as needed)-->
        <script>
            function loadLatLong()
            {
                var input = document.getElementById('location');
                var autocomplete = new google.maps.places.Autocomplete(input);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(accept, decline);
                }
            }

            // If the user accepted geolocation tracking
            function accept(position) {
                // Put the latitude and longitude into a string
                var latlon = position.coords.latitude + "," + position.coords.longitude;
                // Put string into the location form
                var location = document.getElementById("location");
                location.value = latlon;

                // Send the geolocation to the Java App
                submitGeoLocation(latlon);
                // I'm still not 100% sure how to get this information
                // to Java from JS. That is the missing piece that
                // would go here...
            }

            //stash position in local storage if available
            function storePosition(position) {
                if (typeof (Storage) !== "undefined") {

                    localStorage.setItem("location", position);

                    //var storedPosition = localStorage.getItem("location");
                    //alert("Location was stored as 'location' with value: ".concat(storedPosition));
                } else {
                    //alert("Local Storage is Not Available: Your location will be forgotten when you close the browser.");
                }
            }

            //pulls position in local storage if available
            function retrievePosition(position) {
                if (typeof (Storage) !== "undefined" && localStorage.getItem("location") !== "undefined") {
                    return localStorage.getItem("location");
                } else {
                    //local storage was not available
                }
            }

            // If the user declined geolocation tracking
            function decline() {
                // DEBUGGING
                console.log("Rejected geolocation");
            }


            function submitGeoLocation(loc)
            {
                var formData = "location=" + JSON.stringify(loc);

                console.log(formData);

                $.ajax({
                    url: "SetLocation",
                    type: "POST",
                    data: formData,
                    success: function (data, textStatus, jqXHR)
                    {
                        //data - response from server
                        window.location.replace("location.jsp");
                    },
                    error: function (jqXHR, textStatus, errorThrown)
                    {

                    }
                });
            }

        </script>

    </body>
</html>
