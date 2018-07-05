import React, { Component } from 'react';
import CandleStickChart from './CandleStickChart.jsx';
import TradingPairsList from './TradingPairsList.jsx';

class VisualizationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTradingPair: 'ETH/BTC',
      tradingPairs: [
        { label: 'ETH/BTC', value: 'ETH/BTC' },
        { label: 'XLM/BTC', value: 'XLM/BTC' },
        { label: 'XLM/ETH', value: 'XLM/ETH' },
        { label: 'BTC/ETH', value: 'BTC/ETH' }
      ]
    };

    this.setTradingPair = this.setTradingPair.bind(this);
  }

  setTradingPair(tradingPair) {
    this.setState({ selectedTradingPair: tradingPair });
  }

  render() {
    return (
      <div>
        <TradingPairsList
          value={this.state.selectedTradingPair}
          tradingPairs={this.state.tradingPairs}
          setNewTradingPair={this.setTradingPair}
        />
        <CandleStickChart tradingPair={this.state.selectedTradingPair} />
      </div>
    );
  }
}

export default VisualizationContainer;
