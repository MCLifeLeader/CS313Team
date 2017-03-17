/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cs313.byui;

import edu.cs313.byui.config.Config;
import javax.servlet.http.HttpServlet;

/**
 *
 * @author michael.carey
 */
public class HttpServletiHangryBase extends HttpServlet {

    protected Config _config = null;

    protected void LoadConfig() {
        if (_config == null) {
            _config = (Config) getServletContext().getAttribute("config");
        }
    }
}
