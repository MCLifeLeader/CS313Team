package edu.cs313.byui.ihangry;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.cs313.byui.HttpServletiHangryBase;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Ele Thompson
 *
 * Some TODO Items Geocoding/geolocation - Store location in a session,
 * possibly, to make it easy to access for multiple restaurant requests - Figure
 * out if its better to store location by longitude/latitude or street address
 */
@WebServlet(name = "SetLocation", urlPatterns = {"/SetLocation"})
public class SetLocation extends HttpServletiHangryBase {

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request
     * @param response
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        this.LoadConfig();
        String ApiKey = this._config.readConfig().getProperty("googleApiKey");

        // Get form data from location.jsp. 
        String location = request.getParameter("location");

        // If empty send them back to the text entry page
        if (location.isEmpty()) {
            request.getRequestDispatcher("index.jsp").forward(request, response);
            return;
        }

        //If we get JSON Quotes, remove them
        location = location.replace("\"", "");

        // Replace spaces with + signs
        String parsed_location = location.replaceAll("\\s+", "+");

        // Get the geocode (lat/long) for the address using Google Maps API for use
        // with Google Places search
        URL addressUrl = new URL("https://maps.googleapis.com/maps/api/geocode/json?key="
        
        // Google API Proxy Wrapper Written in C# By Michael Carey and hosted in Azure
        //URL addressUrl = new URL("https://mlmlinkup.com/Api/ProxyGeocode?key="
                + ApiKey
                + "&address=" + parsed_location);
        
        ObjectMapper addressMapper = new ObjectMapper();
        
        Map<String, Object> addressMap = addressMapper.readValue(addressUrl, Map.class);
        
        List geocodeList = (List) addressMap.get("results");
        
        for (Object item : geocodeList) {
            Map<String, Object> innerMap = (Map<String, Object>) item;
        }
        // TODO: Figure out a way to extract the latitude and longitude from the results

        Gson gson = new Gson();
        GoogleGeoCodeResponse result = gson.fromJson(gson.toJson(addressMap), GoogleGeoCodeResponse.class);

        if (result == null || result.results == null || result.results.length == 0) {
            throw new java.lang.Error("Google API Failed to Return Data");
        }

        String lat = result.results[0].geometry.location.lat;
        String lng = result.results[0].geometry.location.lng;

        // Bind appropriate attributes
        request.getSession().setAttribute("api_key", ApiKey);
        request.getSession().setAttribute("parsed_location", parsed_location);
        request.getSession().setAttribute("location", location);
        request.getSession().setAttribute("latitude", lat);
        request.getSession().setAttribute("longitude", lng);
        request.getSession().setAttribute("geocodeList", geocodeList); // DEBUGGING
/*
        request.setAttribute("api_key", ApiKey);
        request.setAttribute("parsed_location", parsed_location);
        request.setAttribute("location", location);
        request.setAttribute("latitude", lat);
        request.setAttribute("longitude", lng);
        request.setAttribute("geocodeList", geocodeList); // DEBUGGING
         */
//        request.setAttribute("restaurants", list); // DEBUGGING

        // Send location data to the index.jsp
        request.getRequestDispatcher("location.jsp").forward(request, response);
    }
}
