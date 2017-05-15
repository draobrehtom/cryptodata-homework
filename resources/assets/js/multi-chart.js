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

    function getDataPointsFromCSV (csv, name) {
        var dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        var label = name;

        for (var i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                dataPoints.push({
                    x: parseFloat(points[0]),
                    y: parseFloat(points[1]),
                    indexLabel: ""
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
            data: data
        });
        global_chart.render();


    }
};
