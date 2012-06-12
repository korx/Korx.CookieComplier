<?php
    require_once('../Source/korx.cookiecomplier.php');
    Korx_CookieComplier::init();
?>
<!doctype html>
<html>
    <head>
        <script src="../Source/korx.cookiecomplier.js"></script>
        <script>
            document.cookie = 'test_javascript=1';
        </script>
        <script defer="defer">Korx.CookieComplier.init();</script>
    </head>
    <body>
    
        <?php
            if (!Korx_CookieComplier::allowed()) {
                echo '<a href="?_allow_cookies">Allow Cookies</a></p>';
            }
        ?>

        <?php

            if (Korx_CookieComplier::allowed()) {
                echo '<p>Cookies allowed</p>';
            } else {
                echo '<p>Cookies disallowed</p>';
            }

            setcookie('test_php', '1');

            echo '<p>'.(isset($_COOKIE['test_php']) ? 'Test php cookie exists' : 'Test php cookie doesn\'t exist').'</p>';
            echo '<p>'.(isset($_COOKIE['test_javascript']) ? 'Test javascript cookie exists' : 'Test javascript cookie doesn\'t exist').'</p>';

        ?>

    </body>
</html>

