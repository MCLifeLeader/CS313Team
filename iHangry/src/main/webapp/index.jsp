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
        
        <!-- BOOTSTRAP CSS -->
        <link rel="stylesheet" href="content/bootstrap.min.css">
        
        <!-- MATERIAL DESIGN FOR BOOTSTRAP - http://fezvrasta.github.io/bootstrap-material-design/ -->
        <link rel="stylesheet" href="content/bootstrap-material-design.min.css" type="text/css">
        
        <!-- CUSTOM STYLESHEETS-->
        <link rel="stylesheet" href="content/styles.css" type="text/css">
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
                                    <a href="#" class="btn btn-large btn-raised btn-primary">That looks gross. Find another.</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-7 col-md-8 text-center">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.800171695576!2d-111.78728269853129!3d43.81850417901355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53540b005fb1bc9f%3A0x386ba7f8122e48e8!2sBYU-Idaho+Center%2C+525+S+Center+St%2C+Rexburg%2C+ID+83460!5e0!3m2!1sen!2sus!4v1489210594052" width="100%" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </div>
                </div>
                
                <div class="row text-center">
                    <a href="location.jsp" class="btn btn-large btn-raised btn-primary pull-right">Change Location</a>
                </div>
            </div>
        </main>
        <footer>

        </footer>

    </body>
</html>
