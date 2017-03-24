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
        <title>iHangry | Find Some Foods</title>
        
        <!-- jQuery Support -->
        <script src="scripts/jquery-3.1.1.min.js"></script>

        <!-- Bootstrap JavaScript Support -->
        <script src="scripts/bootstrap.min.js"></script>
        
        <!-- Ajax -->
        <script src="scripts/ajax.js"></script>
        
        <!-- BOOTSTRAP CSS -->
        <link rel="stylesheet" href="content/bootstrap.min.css">
        
        <!-- MATERIAL DESIGN FOR BOOTSTRAP - http://fezvrasta.github.io/bootstrap-material-design/ -->
        <link rel="stylesheet" href="content/bootstrap-material-design.min.css" type="text/css">
        
        <!-- CUSTOM STYLESHEETS-->
        <link rel="stylesheet" href="content/styles.css" type="text/css">
	    
	<!-- FAVICON IMAGE-->
	<link rel="icon" href="/images/iHangry.ico" type="image/x-icon" />
    </head>
    <body>

        <main>
            <div class="container">
                <div class="row">
                    <div class="col-sm-5 col-md-4">
                        <div class="row">
                            <div class="well">
                                <span class="text-center">
                                    <h1>iHangry</h1>
                                    <p>Find your lunch.</p>
                                </span>

                                <hr>

                                <h2>Restaurant Name</h2>
                                <p>Ratings stars</p>
                                <p>Address</p>
                                <p>Distance</p>
                                <p>Time to get there</p>

                                <div class="text-center">
                                    <button class="btn btn-large btn-raised btn-primary" id="FindNext">That looks gross. Find another.</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-7 col-md-8 text-center">
                        
                    <!-- Checks if there is a location set, if not, show BYUI map -->
                    <!-- Will probably want to redirect the user if there is no location set -->
                    <c:choose>
                        <c:when test="${api_key != null}">
                            <iframe id="mapLocation" src="https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${location}" width="100%" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </c:when>
                        <c:otherwise>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11515.269763446113!2d-111.782753!3d43.818146!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1e5534d3c38ef412!2sBrigham+Young+University-Idaho!5e0!3m2!1sen!2sus!4v1489449791545" width="100%" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </c:otherwise>
                    </c:choose>
                    </div>
                </div>
                
                <div class="row text-center">
                    <h2>DEBUGGING</h2>
                    <pre>
                        ${location}<br>
                        <!-- debugging output for list of restaurants-->
                        <c:forEach items="${list}" var="restaurant">
                            ${restaurant}<br>
                        </c:forEach>
                    </pre>
                    <a href="index.jsp" class="btn btn-large btn-raised btn-primary pull-right">Change Location</a>
                </div>
            </div>
        </main>
        <footer>

        </footer>
		<!-- Geolocation Access Script (Move as needed) -->
<!--        <script>
           
        </script>-->
    </body>
</html>
