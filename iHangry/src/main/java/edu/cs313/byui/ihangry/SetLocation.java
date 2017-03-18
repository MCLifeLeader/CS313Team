package edu.cs313.byui.ihangry;

import edu.cs313.byui.HttpServletiHangryBase;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Ele Thompson
 *
 * Some TODO Items - Add functionality to get the location from the browser ie.
 * Geocoding/geolocation - Store location in a session, possibly, to make it
 * easy to access for multiple restaurant requests - Figure out if its better to
 * store location by longitude/latitude or street address
 */
@WebServlet(name = "SetLocation", urlPatterns = {"/SetLocation"})
public class SetLocation extends HttpServletiHangryBase {

    /**
     * Handles the HTTP <code>POST</code> method.
     *
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
        
        // Bind appropriate attributes
        request.setAttribute("api_key", ApiKey);
        request.setAttribute("parsed_location", parsed_location);
        request.setAttribute("location", location);
        // Send location data to the index.jsp
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

}
