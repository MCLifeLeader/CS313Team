/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cs313.byui.config;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContextEvent;
import javax.servlet.annotation.WebListener;

/**
 * This listener class will load a configuration file into memory and
 * store it in the servlet config attribute space.
 * You can then reference the configuration file settings throughout the application.
 * 
 * @author michael.carey
 */
@WebListener
public class Config implements javax.servlet.ServletContextListener {

    private Properties _properties = null;

    public Properties readConfig() {
        return _properties;
    }

    /**
     * This even will execute when the application starts up.
     * Add any configuration loader details here.
     * 
     * @param event
     */
    @Override
    public void contextInitialized(ServletContextEvent event) {

        // Do stuff on application start up.
        
        if (_properties == null || _properties.isEmpty()) {
            try {
                InputStream input = Thread.currentThread().getContextClassLoader().getResourceAsStream("general.properties");

                _properties = new Properties();
                _properties.load(input);
                
            } catch (FileNotFoundException ex) {
                Logger.getLogger(Config.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IOException ex) {
                Logger.getLogger(Config.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        event.getServletContext().setAttribute("config", this);
    }

    /**
     * This event will execute when the application shuts down.
     * Do any cleanup that you need.
     * 
     * @param event
     */
    @Override
    public void contextDestroyed(ServletContextEvent event) {
        // Do Cleanup on App shutdown
    }
}
