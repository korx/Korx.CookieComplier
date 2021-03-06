<?php
    require_once('../../Source/korx.cookiecomplier.php');
    Korx_CookieComplier::init();
?>
<!doctype html>
<html>
    <head>
        <title>Korx.CookieComplier - PHP</title>
        <style>
            body {
                margin: 0;
                font-family: 'Arial', sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            #wrapper {
                margin: 0 auto;
                width: 960px;
            }
            #korx-cookiecomplier-prompt {
                position: fixed;
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
        </style>
        <script src="../../Source/korx.cookiecomplier.js"></script>
        <script>
            document.cookie = 'test_javascript=1';
        </script>
        <script defer="defer">Korx.CookieComplier.init();</script>
    </head>
    <body>
        <div id="wrapper">
            <p><a href="../index.html">More demos</a></p>
            <h1>PHP</h1>

            <?php
                if (!Korx_CookieComplier::allowed()) {
                    echo '<p><a href="?_allow_cookies">Allow Cookies</a></p>';
                }
            ?>

            <?php

                if (Korx_CookieComplier::allowed()) {
                    echo '<p>Cookies allowed</p>';
                } else {
                    echo '<p>Cookies disallowed</p>';
                }

                setcookie('test_php', '1');

                echo '<p>'.(isset($_COOKIE['test_php']) ? 'Test PHP cookie exists' : 'Test PHP cookie doesn\'t exist').'</p>';
                echo '<p>'.(isset($_COOKIE['test_javascript']) ? 'Test JavaScript cookie exists' : 'Test JavaScript cookie doesn\'t exist').'</p>';

            ?>

            <p>document.cookie value:</p>
            <script>
                document.write(document.cookie);
            </script>

        </div>
    </body>
</html>