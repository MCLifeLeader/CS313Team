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
import java.io.PrintWriter;
import java.net.URL;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author nieminen
 */
@WebServlet(name = "GetRestaurants", urlPatterns = {"/GetRestaurants"})
public class GetRestaurants extends HttpServletiHangryBase {

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
        
        String lat = request.getParameter("lat");
        String lng = request.getParameter("lng");
        
        // Create URL to get a list of nearby restaurants
        // Google Places API requires that location is given in latitude,longitude format
        URL restaurantsUrl = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="
                           + ApiKey
                           + "&location=" + lat + "," + lng
                           + "&rankby=distance&type=restaurant");
        // Create Map to store and read JSON from the list of restaurants
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(restaurantsUrl, Map.class);
        List list = (List)map.get("results");
        for (Object item : list) {
            Map<String, Object> innerMap = (Map<String, Object>)item;
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String json = new Gson().toJson(list);
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
}
