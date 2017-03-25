package edu.cs313.byui.ihangry;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.cs313.byui.HttpServletiHangryBase;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

/**
 *
 * @author Ele Thompson
 *
 * Some TODO Items
 * Geocoding/geolocation - Store location in a session, possibly, to make it
 * easy to access for multiple restaurant requests - Figure out if its better to
 * store location by longitude/latitude or street address
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
        
        
        // Get form data from location.jsp
        String location = request.getParameter("location");
        // Replace spaces with + signs
        String parsed_location = location.replaceAll("\\s+", "+");
        
        // Get the geocode (lat/long) for the address using Google Maps API for use
        // with Google Places search
        URL addressUrl = new URL("https://maps.googleapis.com/maps/api/geocode/json?key="
                           + ApiKey
                           + "&address=" + parsed_location);
        ObjectMapper addressMapper = new ObjectMapper();
        Map<String, Object> addressMap = addressMapper.readValue(addressUrl, Map.class);
        List geocodeList = (List)addressMap.get("results");
        for (Object item : geocodeList) {
            Map<String, Object> innerMap = (Map<String, Object>)item;
        }
        // TODO: Figure out a way to extract the latitude and longitude from the results
        
        Gson gson = new Gson();
        GoogleGeoCodeResponse result = gson.fromJson(gson.toJson(addressMap), GoogleGeoCodeResponse.class);

        String lat = result.results[0].geometry.location.lat;

        String lng = result.results[0].geometry.location.lng;
        
        // Create URL to get a list of nearby restaurants
        // Google Places API requires that location is given in latitude,longitude format
//        URL restaurantsUrl = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="
//                           + ApiKey
//                           + "&location=" + lat + "," + lng
//                           + "&rankby=distance&type=restaurant");
//        // Create Map to store and read JSON from the list of restaurants
//        ObjectMapper mapper = new ObjectMapper();
//        Map<String, Object> map = mapper.readValue(restaurantsUrl, Map.class);
//        List list = (List)map.get("results");
//        for (Object item : list) {
//            Map<String, Object> innerMap = (Map<String, Object>)item;
//        }
        
        // TODO: Store the list of restaurants with necessary information into an array?
        // TODO: Randomly select one of the restaurants to display
        // TODO: Create another servlet to select another restaurant from the list of nearby
        
        // Bind appropriate attributes
        request.setAttribute("api_key", ApiKey);
        request.setAttribute("parsed_location", parsed_location);
        request.setAttribute("location", location);
        request.setAttribute("latitude", lat);
        request.setAttribute("longitude", lng);
        request.setAttribute("geocodeList", geocodeList); // DEBUGGING
//        request.setAttribute("restaurants", list); // DEBUGGING
        
        // Send location data to the index.jsp
        request.getRequestDispatcher("location.jsp").forward(request, response);
    }

}
