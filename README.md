# Korx.CookieComplier

Korx.CookieComplier is an accessible and unobtrusive EU cookie compliance tool.

![Screenshot](https://github.com/korx/Korx.CookieComplier/raw/master/Graphics/screenshot.jpg)

## Benefits


* Cookies are set by the server or client side code are blocked until the user chooses to accept them. This is much more to the spirit of the EU's Privacy and Communications Directive than an implied consent solution.
* The end user does not need JavaScript enabled for it to work.
* Existing JavaScript code doesn't need changing even if cookies are utilised.
    * The JavaScript code is framework agnostic so will work alongside MooTools, jQuery etc.
    * There's no need to go changing mime types on script tags or such like.
    * Google Analytics will work normally without modification. If the user hasn't chosen to allow cookies, visits will still be logged but tracking data won't be stored.
* Existing server side code doesn't need changing even if cookies utilised.
* If the user is outside the EU, cookies will be allowed by default without any change to the user experience thanks to geolocation.
* If the web browser sends a 'Do Not Track' header then cookies are disallowed by default regardless of the user's location.

## Requirements

* An Apache 2.2+ web server with:
    * mod_header
    * AllowOverride All (.htaccess files allowed)
* A server side method of setting a cookie so that users can allow cookies, for example via PHP.

### Server side support

In theory it'll work with any languages executed via the web server, but the Demo is written in PHP.

### Geolocation support

The client side geolocation feature uses GeoIP from MaxMind http://www.maxmind.com/app/javascript

If you want to take advantage of the server side geolocation feature, you'll need to have mod_geoip from MaxMind loaded in Apache. http://www.maxmind.com/app/mod_geoip

## How to use

Upload the .htaccess file from the Source directory to the document root of the website. If you already have a .htaccess file in use, then just copy and paste the content of the Korx.CookieComplier .htaccess file to the end of it.

Upload the korx.cookiecomplier.js file from the Source directory to your web server. On all your HTML pages you'll need to add the following as **the first** `<script>` in the `<head>` tag:

    <script src="korx.cookiecomplier.js"></script>

*Note: Change the `src` attributes to the correct location of where you've uploaded the korx.cookiecomplier.js file to e.g. "/scripts/korx.cookiecomplier.js"*

You'll also need to add the following **immeditately before** the `</head>` tag.

    <script defer="defer">Korx.CookieComplier.init();</script>

*Note: Don't change the above script tags' `defer` and `async` attributes or positioning within the `<head>` tag otherwise there will be issues in some browsers.*

You might also want to style the prompt by putting something like this in your CSS file:

    #korx-cookiecomplier-prompt {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #000000;
        opacity: 0.8;
        font-size: 1.2em;
        color: #ffffff;
    }
    #korx-cookiecomplier-container {
        padding: 1.2em;
        overflow: hidden;
    }
    #korx-cookiecomplier-question {
        display: block;
        float: left;
        width: 100%;
    }
    #korx-cookiecomplier-allow {
        display: block;
        clear: left;
        float: left;
        color: #ffffff;
    }
    #korx-cookiecomplier-close {
        display: block;
        float: right;
        color: #555555;
        cursor: pointer;
    }

### Advanced usage

You can also specify your own consent question by passing it in as a string to the init function:

    <script defer="defer">Korx.CookieComplier.init('We would like to set some cookies');</script>

If you want to change the link texts you can do this by passing in an object to the init function:

    <script defer="defer">Korx.CookieComplier.init({ question:'Can we use cookies?', allow:'Yes', close:'' });</script>


## Enabling users to allow cookies

Now all you have to do is create a way for users to allow cookies. This is done by setting the cookie '_allow_cookies' to the value '1'. You can do this via JavaScript, PHP, or any other server side language.

An environment variable and cookie '_allow_cookies' will be set if cookies are allowed. You can use this to check if you need to ask the user to allow cookies.

### PHP

Upload the korx.cookiecomplier.php file from the Source directory to your web server.

Add the following code to the top of each page where you want to accept or detect cookies:

    <?php
        require_once('korx.cookiecomplier.php');
        Korx_CookieComplier::init();
    ?>

*Note: Change the location to where you've uploaded the korx.cookiecomplier.php file to e.g. "/includes/korx.cookiecomplier.php"*

Add the following code the the page where you want the user to have the option to allow cookies:

    <?php
        if (!Korx_CookieComplier::allowed()) {
            echo '<a href="?_allow_cookies">Allow Cookies</a></p>';
        }
    ?>
