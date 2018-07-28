"use strict";

const express = require('express'),
	request = require('request'),
    props = require('./package.json'),
    PORT = process.env.PORT || 3001,
    HOST = process.env.HOST || '0.0.0.0';

(async function init()
{
    try
    {
        // Setup the express app listener.
		const app = express();
		
		// Simple healthcheck to ensure things are operational.
        app.get('/health', (req, res) =>
        {
            let answer = props.name + " - v" + props.version;
            res.send(answer + " is fully operational.");
		});
		
		// Gets data (currently mock data from a server)
		app.get('/data', (req, res) => 
		{
			request('https://www.highcharts.com/samples/data/aapl-ohlcv.json', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
		});

        app.listen(PORT, HOST);
        console.log(`Running ${props.name} v${props.version} on http://${HOST}:${PORT}`);
    }
    catch (error)
    {
        console.log(error);
    }
})();
