var moment = require('moment');
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
            url: "market_btc.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_btc", "Global market Bitcoin capitalization", "orange");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_ethereum.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_ethereum", "Global market Ethereum capitalization", "blue");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_litecoin.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_litecoin", "Global market Litecoin capitalization", "green");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_dash.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_dash", "Global market Dash capitalization", "red");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_zcash.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_zcash", "Global market ZCash capitalization", "pink");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_waves.csv",
            dataType: "text",
            success: function(data) {
                getDataPointsFromCSV(data, "market_waves", "Global market Waves capitalization", "yellow");
            }
        });

        buildCharts(test);
    });

    var test = [
    ];

    function getDataPointsFromCSV (csv, name, title, color) {
        var dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        var label = name;
        var a=true;
        for (var i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                var readableData = moment.unix(points[0]/1000).format("DD MMM YYYY hh:mm a");


                // secret formula
                e1 = points[0]/3600*2*Math.PI;
                b1 = points[1];
                d1 = 2 * Math.log((Math.sqrt(5) + 1)/2)/Math.PI;

                x = e1;
                y = 2*Math.log(b1/e1)/d1;

                dataPoints.push({
                    color: color,
                    showInLegend: true,
                    x:  x,
                    y: y,

                    legendText: label
                });
                label = "";
            }

        test.push({
            name: name,
            type: "line",

            dataPoints: dataPoints
        });
    }


    function buildCharts(data) {
        var global_chart = new CanvasJS.Chart("multi_global", {

            title: {
                text: "Multi global capitalization"
            },
            legend:{
                fontSize: 20,
                fontFamily: "tamoha",
                fontColor: "Sienna"
            },
            data: data
        });
        global_chart.render();


    }
};
