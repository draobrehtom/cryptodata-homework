<!DOCTYPE html>

<html>
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta charset="UTF-8">
        <title>Secret Room</title>
        <link rel="stylesheet" href="css/app.css">

        <script src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>

        <script src="js/chart.js"></script>

    </head>


    <body>
        <div id="app">
            <h1>Secret Room</h1>
            <example></example>
        </div>

        <div id="market_global" style="height: 300px; width: 100%;"></div>
        <div id="market_btc" style="height: 300px; width: 100%;"></div>
        <div id="market_ethereum" style="height: 300px; width: 100%;"></div>
        <div id="market_litecoin" style="height: 300px; width: 100%;"></div>
        <div id="market_dash" style="height: 300px; width: 100%;"></div>
        <div id="market_zcash" style="height: 300px; width: 100%;"></div>
        <div id="market_waves" style="height: 300px; width: 100%;"></div>


        <script src="js/app.js" charset="UTF-8"></script>

    </body>
</html>