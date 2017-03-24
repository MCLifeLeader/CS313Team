package edu.cs313.byui.ihangry;

import com.fasterxml.jackson.databind.ObjectMapper;
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

        // Get form data from location.jsp
        String location = request.getParameter("location");
        // Replace spaces with + signs
        String parsed_location = location.replaceAll("\\s+", "+");

        String ApiKey = this._config.readConfig().getProperty("googleApiKey");
        
        // TODO: Get a list of restaurants near the location
         // Using a static location for now
        // I was trying to use the Jackson Object Mapper that we used for the
        // Movies team activity to handle the JSON
        URL url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="
                           + ApiKey
                           + "&location=33.8340573,-118.13662550000001"
                           + "&rankby=distance&type=restaurant");
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(url, Map.class);
        List list = (List)map.get("results");
        
        // Bind appropriate attributes
        request.setAttribute("api_key", ApiKey);
        request.setAttribute("parsed_location", parsed_location);
        request.setAttribute("location", location);
        request.setAttribute("restaurants", list);
        
        // Send location data to the index.jsp
        request.getRequestDispatcher("location.jsp").forward(request, response);
    }

}
