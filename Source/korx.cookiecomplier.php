<?php

/*! © 2012 Korx Limited */
class Korx_CookieComplier {

    public static function init() {
        // allow cookies if asked to do so
        if (isset($_GET['_allow_cookies'])) {
            self::allow();
            header('Location: '.$_SERVER['PHP_SELF']);
            exit;
        }
    }

    public static function allowed() {
        // check if cookies are allowed
        return (isset($_COOKIE['_allow_cookies']) || getenv('_allow_cookies') !== false);
    }

    public static function allow() {
        // set preference to allow cookies for 2 years
        setcookie('_allow_cookies', '1', time()+63072000);
    }


}

