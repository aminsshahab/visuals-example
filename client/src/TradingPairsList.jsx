import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

import React, { Component } from 'react';
import Select from 'react-virtualized-select';

class TradingPairsList extends Component {
  constructor(props) {
    super(props);

    this.handleNewSelected = this.handleNewSelected.bind(this);
  }

  handleNewSelected(e) {
    if (e) {
      this.props.setNewTradingPair(e.value);
    }
  }

  render() {
    return (
      <div>
        <Select
          value={this.props.value}
          onChange={this.handleNewSelected}
          options={this.props.tradingPairs}
        />
      </div>
    );
  }
}

export default TradingPairsList;
