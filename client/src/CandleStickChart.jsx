import React, { Component } from 'react';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title,
  CandlestickSeries, Navigator, RangeSelector, Tooltip, Loading
} from 'react-jsx-highstock';
import Highcharts from 'highcharts/highstock';
import TooltipOnClick from './TooltipOnClick';

class CandleStickChart extends Component {
  constructor(props){
    super(props);
    this.state = { ohlc: [], volume: [], loaded: false, annotationsArr: []};

    this.loadData = this.loadData.bind(this);
    this.getChart = this.getChart.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tradingPair !== prevProps.tradingPair) {
      this.setState({ loaded: false });
      this.loadData();
    }
  }

  getChart(chart){
    this.chart = chart;
  }

  loadData(tradingPair) {
    fetch('/data')
      .then(res => {
        return res.json();
      })
      .then(data => {
        const ohlc = [],
          volume = [],
          dataLength = data.length; 

        var i = 0;

        for (i; i < dataLength; i += 1) {
          ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
          ]);

          volume.push([
            data[i][0], // the date
            data[i][5] // the volume
          ]);
        }
        this.setState({ ohlc, volume, loaded: true });
      });
  }

  render() {
    return (
      <HighchartsStockChart callback={this.getChart}>
        <Chart />

        <Title>{this.props.tradingPair}</Title>

        <Loading isLoading={!this.state.loaded}>Fetching data...</Loading>

        <RangeSelector>
          <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
          <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
          <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
          <RangeSelector.Button count={3} type="month">3m</RangeSelector.Button>
          <RangeSelector.Button count={6} type="month">6m</RangeSelector.Button>
          <RangeSelector.Button count={1} type="year">1y</RangeSelector.Button>
          <RangeSelector.Input boxBorderColor="#7cb5ec" />
        </RangeSelector>

        <XAxis ordinal>
          <CandlestickSeries id="ohlc" name="OHLC" data={this.state.ohlc} />
        </XAxis>

        <YAxis>
          <CandlestickSeries id="volume" name="Volume" data={this.state.volume} />
        </YAxis>

        <Tooltip padding={10} hideDelay={250} shape="square" split />

        <Navigator>
          <Navigator.Series seriesId="volume" />
        </Navigator>

        <TooltipOnClick />
      </HighchartsStockChart>
    );
  }
}

export default withHighcharts(CandleStickChart, Highcharts);