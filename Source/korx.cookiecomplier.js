/*! © 2012 Korx Limited */

if (!window.Korx) window.Korx = {};

Korx.CookieComplier = {

    countries: ['BE','BG','CZ','DK','DE','EE','IE','GR','ES','FR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE','GB'],

    construct: function(){
        // auto detect
        Korx.CookieComplier.autodetect();
        // attach crumble events to window
        Korx.CookieComplier.attach(window);
    },

    init: function(){
        // attach crumble events to scripts
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            Korx.CookieComplier.attach(scripts[i]);
        }
        // crumble
        Korx.CookieComplier.crumble();
    },

    allow: function(){
        // allow cookies for 2 years
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 730);
        document.cookie = '_allow_cookies=1; expires='+expiry.toUTCString();
    },

    allowed: function(){
        // check if cookies have been allowed
        return (document.cookie.indexOf('_allow_cookies') >= 0);
    },

    crumble: function(){
        // only crumble if cookies aren't allowed
        if (!Korx.CookieComplier.allowed()) {
            // get all cookies
            var cookies = document.cookie.split(';');
            // loop though them
            for (var c = 0; c < cookies.length; c++) {
                var cookie = cookies[c];
                // get the cookie name
                var pos = cookie.indexOf('=');
                var name = (pos > -1 ? cookie.substr(0, pos) : cookie).replace(/^\s+/,'');
                // expire the cookie
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                // try all variations on paths
                var paths = window.location.pathname.split('/');
                if (paths.length == 0 || paths[0] != '') {
                    paths.unshift('');
                }
                for (var p = 0; p < paths.length; p++) {
                    var path = '';
                    for (var i = 0; i <= p; i++) {
                        path += paths[i] + '/';
                    }
                    // try all variations on domains
                    var domains = window.location.hostname.split('.');
                    for (var d = domains.length-1; d >= 0; d--) {
                        var domain = '';
                        for (var i = d; i < domains.length; i++) {
                            domain += '.' + domains[i];
                        }
                        // expire the cookie
                        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path='+path;
                        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain='+domain;
                        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path='+path+'; domain='+domain;
                    }
                }
            }
        }
    },

    attach: function(element){
        // load event
        if (typeof element.onload === 'function') {
            var onload = element.onload;
            element.onload = function(e) {
                onload(e);
                Korx.CookieComplier.crumble();
            };
        } else {
            element.onload = Korx.CookieComplier.crumble;
        }
        // unload event
        if (typeof element.onunload === 'function') {
            var onunload = element.onunload;
            element.onunload = function(e) {
                onunload(e);
                Korx.CookieComplier.crumble();
            };
        } else {
            element.onunload = Korx.CookieComplier.crumble;
        }
    },

    autodetect: function(){
        // check country via geoip and allow if not in the EU
        var geoip = document.createElement('script');
        geoip.async = true;
        geoip.src = 'http://j.maxmind.com/app/country.js';
        geoip.onload = function(e){
            if (window.geoip_country_code) {
                var country = geoip_country_code();
                if (typeof country == 'string') {
                    var auto = true;
                    for (var i = 0; i < Korx.CookieComplier.countries.length; i++) {
                        if (country == Korx.CookieComplier.countries[i]) {
                            auto = false;
                        }
                    }
                    if (auto) {
                        Korx.CookieComplier.allow();
                    }
                }
            }
            Korx.CookieComplier.prompt();
        }
        var script = document.getElementsByTagName("script")[0];
        script.parentNode.insertBefore(geoip, script);
    },

    prompt: function(){ }

};

Korx.CookieComplier.construct();