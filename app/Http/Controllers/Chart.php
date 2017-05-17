<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Chart extends Controller
{
    const timeWaitNextRequest = 1;

    const timestampsInterval = [
        "week" => 604800000,
        "2month" => 5169600000,
        "year" => 31017600000
    ];


    const coinMarketGraphs = [
        "market_global" => "https://graphs.coinmarketcap.com/global/marketcap-total/",
        "market_btc" => "https://graphs.coinmarketcap.com/currencies/bitcoin/",
        "market_ripple" => "https://graphs.coinmarketcap.com/currencies/ripple/",
        "market_ethereum" => "https://graphs.coinmarketcap.com/currencies/ethereum/",
        "market_litecoin" => "https://graphs.coinmarketcap.com/currencies/litecoin/",
        "market_dash" => "https://graphs.coinmarketcap.com/currencies/dash/",
        "market_zcash" => "https://graphs.coinmarketcap.com/currencies/zcash/",
        "market_waves" => "https://graphs.coinmarketcap.com/currencies/waves/",
    ];

    public function refresh($graph = -1, $interval = "week") {

        $graph = array_key_exists($graph, self::coinMarketGraphs) ? $graph : -1;
        $interval = array_key_exists($interval, self::timestampsInterval) ? $interval : "week";

        $tempCoinMarketGraphs = ($graph == -1) ? self::coinMarketGraphs : array($graph => self::coinMarketGraphs[$graph]);
        $timestampsInterval = self::timestampsInterval[$interval];


        $start = 1401724020000;
        $timestampNow = round(microtime(true) * 1000);

        foreach ($tempCoinMarketGraphs as $name => $link) {
            $fp = fopen($name . '.csv', 'w');

            $timestampBegin = $start;
            $timestampEnd = $timestampBegin + $timestampsInterval;

            while($timestampEnd < $timestampNow) {

                $test = json_decode(
                    file_get_contents(
                        $link . "{$timestampBegin}/{$timestampEnd}/"
                    )
                );

                $previousHour = ["hour" => -1, "count" => 0, "capitalization" => 0];

                foreach ($test->market_cap_by_available_supply as $fields) {
                    $time = $fields[0]/1000;
                    $capitalization = (int) $fields[1];

                    $hour =  date("Y-m-d H:", $time);


                    if ($hour == $previousHour["hour"]) {
                        $previousHour["count"]++;
                        $previousHour["capitalization"] += $capitalization;
                    } else {
                        if ($previousHour["count"] >= 4) {
                            $median = $previousHour["capitalization"] / $previousHour["count"];
                            $time = strtotime(date("Y-m-d H:00:00", $time));
                            $fields = [$time, $median];
                            fputcsv($fp, $fields);

                        }

                        $previousHour = ["hour" => $hour, "count" => 1, "capitalization" => $capitalization];

                    }
                }

                $timestampBegin = $timestampEnd;
                $timestampEnd = $timestampBegin + $timestampsInterval;
            }


            fclose($fp);
        }

        return "Completed";
    }


}
