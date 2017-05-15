<!DOCTYPE html>

<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="UTF-8">
    <title>Secret Room</title>
    <link rel="stylesheet" href="css/app.css">

    <script src="js/canvasjs.min.js"></script>

    <script src="js/multi-chart.js"></script>

</head>


<body>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Рыночная Капитализация - Общий график</div>

                    <div class="panel-body">
                        <div id="multi_global" style="height: 300px; width: 100%;"></div>

                        <br><br>
                        <ul>
                            <li><label>Bitcoin - Оранжевый</label></li>
                            <li><label>Ethereum - Синий</label></li>
                            <li><label>Litecoin - Зелёный</label></li>
                            <li><label>Dash - Красный</label></li>
                            <li><label>ZCash - Розовый</label></li>
                            <li><label>Waves - Жёлтый</label></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="app">
        <h1>Secret Room</h1>
        <example></example>
    </div>


    <br>

    <script src="js/app.js" charset="UTF-8"></script>

</body>
</html>