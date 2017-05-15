/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 161);
/******/ })
/************************************************************************/
/******/ ({

/***/ 127:
/***/ (function(module, exports) {

window.onload = function () {

    $(document).ready(function () {
        var coinMarketGraphs = ["market_global", "market_btc", "market_ethereum", "market_litecoin", "market_dash", "market_zcash", "market_waves"];

        $.ajax({
            type: "GET",
            url: "market_global.csv",
            dataType: "text",
            success: function success(data) {
                getDataPointsFromCSV(data, "market_global", "Global market capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_btc.csv",
            dataType: "text",
            success: function success(data) {
                getDataPointsFromCSV(data, "market_btc", "Global market Bitcoin capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_ethereum.csv",
            dataType: "text",
            success: function success(data) {
                getDataPointsFromCSV(data, "market_ethereum", "Global market Ethereum capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_litecoin.csv",
            dataType: "text",
            success: function success(data) {
                getDataPointsFromCSV(data, "market_litecoin", "Global market Litecoin capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_dash.csv",
            dataType: "text",
            success: function success(data) {
                getDataPointsFromCSV(data, "market_dash", "Global market Dash capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_zcash.csv",
            dataType: "text",
            success: function success(data) {
                getDataPointsFromCSV(data, "market_zcash", "Global market ZCash capitalization");
            }
        });

        $.ajax({
            type: "GET",
            url: "market_waves.csv",
            dataType: "text",
            success: function success(data) {
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

        var x, y, b1, e1, d1;

        for (var i = 0; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");

                // secret formula
                e1 = points[0] / 3600 * 2 * Math.PI;
                b1 = points[1];
                d1 = 2 * Math.log((Math.sqrt(5) + 1) / 2) / Math.PI;

                x = e1;
                y = 2 * Math.log(b1 / e1) / d1;

                dataPoints.push({
                    x: parseFloat(x),
                    y: parseFloat(y)
                });
            }
        }var global_chart = new CanvasJS.Chart(name, {
            title: {
                text: title
            },
            data: [{
                type: "line",
                dataPoints: dataPoints
            }]
        });
        global_chart.render();
    }
};

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(127);


/***/ })

/******/ });