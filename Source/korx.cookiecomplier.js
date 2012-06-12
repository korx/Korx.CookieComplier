/*! © 2012 Korx Limited */

if (!window.Korx) window.Korx = {};

Korx.CookieComplier = {

    init: function(){
        this.crumble();
        if (document.body) {
            this.attach(document.body);
        }
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            this.attach(scripts[i]);
        }
    },

    crumble: function(){
        if (document.cookie.indexOf('_allow_cookies') < 0) {
            var cookies = document.cookie.split(';');
            for (var c = 0; c < cookies.length; c++) {
                var cookie = cookies[c];
                var pos = cookie.indexOf('=');
                var name = (pos > -1 ? cookie.substr(0, pos) : cookie).replace(/^\s+/,'');
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                var paths = window.location.pathname.split('/');
                if (paths.length == 0 || paths[0] != '') {
                    paths.unshift('');
                }
                for (var p = 0; p < paths.length; p++) {
                    var path = '';
                    for (var i = 0; i <= p; i++) {
                        path += paths[i] + '/';
                    }
                    var domains = window.location.hostname.split('.');
                    for (var d = domains.length-1; d >= 0; d--) {
                        var domain = '';
                        for (var i = d; i < domains.length; i++) {
                            domain += '.' + domains[i];
                        }
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
    }

};