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
        <script src="scripts/scripts/jquery-3.1.1.min.js"></script>

        <!-- Bootstrap JavaScript Support -->
        <script src="scripts/scripts/bootstrap.min.js"></script>
        
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
                <div class="col-sm-4">
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

                            <a href="#" class="btn btn-large btn-raised btn-primary">That looks gross. Find another.</a>
                        </div>
                    </div>
                </div>
                
                <div class="col-sm-8 text-center">
                    <h1>Map goes here...</h1>
                    <p>We will need to do some CSS stuff for the height of the map but this is all I've had time for today lol</p>
                </div>
            </div>
        </main>
        <footer>

        </footer>

    </body>
</html>
