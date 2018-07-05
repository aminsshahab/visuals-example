const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3001;

app.get('/data', (req, res) => {
	request('https://www.highcharts.com/samples/data/aapl-ohlcv.json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body);
		}
	});

});

app.listen(port, () => console.log(`Listening on port ${port}`));
