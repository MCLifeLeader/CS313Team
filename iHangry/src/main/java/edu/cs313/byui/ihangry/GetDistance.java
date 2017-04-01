/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cs313.byui.ihangry;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.cs313.byui.HttpServletiHangryBase;
import java.io.IOException;
import java.net.URL;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author admin
 */
@WebServlet(name = "GetDistance", urlPatterns = {"/GetDistance"})
public class GetDistance extends HttpServletiHangryBase {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        
        this.LoadConfig();
        
        String ApiKey = this._config.readConfig().getProperty("googleApiKey");
        
        //String lat = request.getParameter("lat");
        //String lng = request.getParameter("lng");
        
        //String originID = request.getParameter("placeID");
        String destID   = request.getParameter("placeID");
        String lat = (String) request.getSession().getAttribute("latitude");
        String lng = (String) request.getSession().getAttribute("longitude");
        
        // Create URL to get a list of nearby restaurants
        // Google Places API requires that location is given in latitude,longitude format
        //URL distanceURL = new URL("https://maps.googleapis.com/maps/api/distancematrix/json?key="

        // Google API Proxy Wrapper Written in C# By Michael Carey and hosted in Azure
        URL distanceURL = new URL("https://mlmlinkup.com/Api/ProxyDistanceMatrix?key="
                           + ApiKey
                           + "&units=imperial"
                           + "&mode=driving"
                           + "&origins=place_id:" + destID
                           + "&destinations=" + lat + "," + lng);
        
        // Create Map to store and read JSON from the list of restaurants
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(distanceURL, Map.class);
        //List list = (List)map.get("results");
  
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String json = new Gson().toJson(map);
        response.getWriter().write(json);
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
