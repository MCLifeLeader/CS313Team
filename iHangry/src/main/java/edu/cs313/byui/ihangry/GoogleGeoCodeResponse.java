/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cs313.byui.ihangry;

/**
 *
 * @author nieminen
 */
public class GoogleGeoCodeResponse {
    public String status;
    public results[] results;

    public GoogleGeoCodeResponse() {
        
    }

    public class results {
        public String formatted_address;
        public geometry geometry;
        public String[] types;
        public address_component[] address_components;
    }

    public class geometry {
        public bounds bounds;
        public String location_type;
        public location location;
        public bounds viewport;
    }

    public class bounds {

        public location northeast;
        public location southwest;
    }

    public class location {
        public String lat;
        public String lng;
    }

    public class address_component {
        public String long_name;
        public String short_name;
        public String[] types;
    }
}
