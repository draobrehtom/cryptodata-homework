window.onload = function () {




    $(document).ready(function() {
        var coinMarketGraphs = [
            "market_global",
            "market_btc",
            "market_ethereum",
            "market_litecoin",
            "market_dash",
            "market_zcash",
            "market_waves"
        ];

        $.ajax({
            type: "GET",
            url: "market_global.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_global", "Global market capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_btc.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_btc", "Global market Bitcoin capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_ethereum.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_ethereum", "Global market Ethereum capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_litecoin.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_litecoin", "Global market Litecoin capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_dash.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_dash", "Global market Dash capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_zcash.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_zcash", "Global market ZCash capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_waves.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_waves", "Global market Waves capitalization");
            }
        });
    });


    // y = 2*LN(B1/(E1))/$D$1
    // x = Е1
    //
    // $D$1 = 2*LN((scrt(5)+1)/2)/ПИ()
    //
    // B1 - капитализация, y
    // Е1 - время, в часах (timestamp/3600*2П)


    function getDataPointsFromCSV(csv, name, title) {

        var dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        var x,y,b1,e1,d1;

        for (var i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");

                // secret formula
                e1 = points[0]/3600*2*Math.PI;
                b1 = points[1];
                d1 = 2 * Math.log((Math.sqrt(5) + 1)/2)/Math.PI;

                x = e1;
                y = 2*Math.log(b1/e1)/d1;



                dataPoints.push({
                    x: parseFloat(x),
                    y: parseFloat(y)
                });
            }

        var global_chart = new CanvasJS.Chart(name, {
            title: {
                text: title
            },
            data: [
                {
                    type: "line",
                    dataPoints: dataPoints
                }
            ]
        });
        global_chart.render();


    }







};
