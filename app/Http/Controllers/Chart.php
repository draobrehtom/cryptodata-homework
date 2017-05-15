<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Chart extends Controller
{
    const timestampYearDuration = 31017600000;
    const timestampTwoMonthDuration = 5169600000;

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

    public function refresh($graph) {

        $start = 1401724020000;
        $timestampNow = round(microtime(true) * 1000);

        foreach (self::coinMarketGraphs as $name => $link) {
            $fp = fopen($name . '.csv', 'w');

            $timestampBegin = $start;
            $timestampEnd = $timestampBegin + self::timestampTwoMonthDuration;

            while($timestampEnd < $timestampNow) {
                $test = json_decode(
                    file_get_contents(
                        $link . "{$timestampBegin}/{$timestampEnd}/"
                    )
                );

                foreach ($test->market_cap_by_available_supply as $fields) {
                    fputcsv($fp, $fields);
                }

                $timestampBegin = $timestampEnd;
                $timestampEnd = $timestampBegin + self::timestampTwoMonthDuration;
            }


            fclose($fp);
        }

        return "Completed";
    }


}
