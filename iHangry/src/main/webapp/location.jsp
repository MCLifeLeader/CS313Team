<%-- 
    Document   : index
    Created on : Mar 9, 2017, 3:38:10 PM
    Author     : Ele Thompson
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>iHangry | Find Some Foods</title>

        <!-- jQuery Support -->
        <script src="scripts/jquery-3.1.1.min.js"></script>

        <!-- Bootstrap JavaScript Support -->
        <script src="scripts/bootstrap.min.js"></script>

        <script src="scripts/mapHelper.js"></script>

        <script src="scripts/ihangry.js"></script>

        <script src="https://maps.google.com/maps/api/js?sensor=false&key=AIzaSyBxRoQJSpiJs0YzwUoQZS86YqRT0eZSjoE" type="text/javascript"></script>

        <script type="text/javascript">
            $(function () {
                var lat = '${latitude}';
                var lng = '${longitude}';
                setupMap(lat, lng);
                $('#FindNext').on('click', function () {
                    getRecommendation();
                });
                
                $('#ShowButton').on('click', function() {
                    $('.main-box-container').removeClass('is-hidden');
                });
                
                $('#ChangeLoc').on('click', function() {
                    sessionStorage.setItem('ChangeLoc', true);
                    window.location = "./";
                });
                
                $('#HideButton').on('click', function() {
                    $('.main-box-container').addClass('is-hidden');
                });
            });
        </script>

        <!-- BOOTSTRAP CSS -->
        <link rel="stylesheet" href="content/bootstrap.min.css">

        <!-- MATERIAL DESIGN FOR BOOTSTRAP - http://fezvrasta.github.io/bootstrap-material-design/ -->
        <link rel="stylesheet" href="content/bootstrap-material-design.min.css" type="text/css">

        <!-- FONT AWESOME ICONS -->
        <link rel="stylesheet" href="content/FontAwesome/css/font-awesome.min.css" type="text/css">

        <!-- CUSTOM STYLESHEETS-->
        <link rel="stylesheet" href="content/styles.css" type="text/css">

        <!-- FAVICON IMAGE-->
        <link rel="icon" href="/images/iHangry.ico" type="image/x-icon">

    </head>
    <body>
        <main>
            <div class="container">
                <div id="map"></div>
                <button class="btn btn-sm btn-raised btn-warning" id="ShowButton">Show</button>
                <div class="row margin-top main-box-container">
                    <div class="col-xs-5 col-md-4 main-box">
                        <div class="row">
                            <div id="InfoDiv" class="well">
                                <span class="text-center">
                                    <h1>iHangry</h1>
                                    <p>Find your lunch.</p>
                                </span>
                                <hr>
                                <div class="loader-div h1 text-center">
                                    <i class="fa fa-spinner fa-pulse"></i>
                                </div>
                                <div class="content-div collapse">
                                    <h2 class="name">Restaurant Name</h2>
                                    <p class="rating">Ratings stars</p>
                                    <p class="address">Address</p>
                                    <p class="distance">Distance</p>
                                    <p class="eta">Time to get there</p>
                                </div>
                                
                                <div class="text-center">
                                    <button class="btn btn-large btn-raised btn-primary" id="FindNext">That looks gross. Find another.</button>
                                </div>
                                <div class="text-center hide-banner">
                                    <button class="btn btn-sm btn-raised btn-warning no-margin" id="HideButton">Hide</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button id="ChangeLoc" class="btn btn-large btn-raised btn-primary pull-right">Change Location</button>
        </main>
        <div class="overlay">
            <a href="javascript:void(0)" id="closebtn" class="closebtn">&times;</a>
            <iframe  src="https://docs.google.com/forms/d/e/1FAIpQLScwxjahxHmM28o4sZlR_JFM0bMhKyxdIN6UD9OM-rhFOu8kRA/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
        </div>
        <footer>
            <div class="slide feedback-popup">
                <a href="#" class="pull-right" id="closeFeedbackPopup">
                    &times;
                </a>
                <h4>Send Us Some Feedback</h4>
                <button id="feedback" type="button" class="btn btn-primary">Send Feedback</button>
            </div>
        </footer>
        <!-- Geolocation Access Script (Move as needed) -->
        <!--        <script>
                   
                </script>-->
    </body>
</html>
