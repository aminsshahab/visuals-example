import React, { Component, Fragment } from 'react'
import { provideChart } from 'react-jsx-highcharts'
import Highcharts from 'highcharts/highstock';
import addAnnotationsModule from 'highcharts/modules/annotations'

addAnnotationsModule(Highcharts);

var line = [];

class TooltipOnClick extends Component {
	constructor(props){
	  super(props);
	  this.state = { lines: [], lineData: []};

	  this.forceRender = this.forceRender.bind(this);
	  this.renderPoint = this.renderPoint.bind(this);
	  this.drawLine = this.drawLine.bind(this);
	  this.addPointToLine = this.addPointToLine.bind(this);
	}

  componentDidMount () {
    this.getChartObj().container.addEventListener('dblclick', this.forceRender);
  }

  componentWillUnmount () {
    this.getChartObj().container.removeEventListener('dblclick', this.forceRender);
  }

  getChartObj(){
    return this.props.getChart().object;
  }

  forceRender() {
  	const chart = this.getChartObj();
  	const point = chart.hoverPoints.map(this.renderPoint);
  	this.setState(prevState => ({
  	  lineData: [...prevState.lineData, point]
  	}))
    this.forceUpdate();
  }

  renderPoint(point) {
  	return point["options"];
  }

  drawLine() {
  	if (line.length !== 2) {
  		return;
  	}

  	const annotation = 
  	{
  	  shapes: [{
  	    type: 'path',
  	    points: [ { x: this.state.lineData[0][0]["x"], y: line[0], xAxis: 0, yAxis: 0}, { x: this.state.lineData[1][0]["x"], y: line[1], xAxis: 0, yAxis: 0} ]
  	  }]
  	}

  	this.getChartObj().addAnnotation(annotation);

  	this.setState(prevState => ({
  	  lines: [...prevState.lines, [this.state.lineData, line]],
  	  lineData: []
  	}))

  	line = [];
  }

  addPointToLine(e) {
  	if (line.length > 2) {
  		return;
  	}
  	line.push(e.target.value);
  }

  render () {
    const chart = this.getChartObj();
    if (!chart.hoverPoints || this.state.lineData.length !== 2) {
    	return null;
    }
    return (
    	<div>
    	  <h3>Choose Point A To Draw Line</h3>
    	  <dl>
    	    <Fragment>
    	      <dt><button value={this.state.lineData[0][0]["open"]} onClick={this.addPointToLine} >Open: {this.state.lineData[0][0]["open"]}</button></dt>
    	      <dt><button value={this.state.lineData[0][0]["high"]} onClick={this.addPointToLine} >High: {this.state.lineData[0][0]["high"]}</button></dt>
    	      <dt><button value={this.state.lineData[0][0]["low"]} onClick={this.addPointToLine} >Low: {this.state.lineData[0][0]["low"]}</button></dt>
    	      <dt><button  value={this.state.lineData[0][0]["close"]} onClick={this.addPointToLine} >Close: {this.state.lineData[0][0]["close"]}</button></dt>
    	    </Fragment>
    	  </dl>
    	  <h3>Choose Point B To Draw Line</h3>
    	  <dl>
    	  	<Fragment>
    	  	  <dt><button value={this.state.lineData[1][0]["open"]} onClick={this.addPointToLine} >Open: {this.state.lineData[1][0]["open"]}</button></dt>
    	  	  <dt><button value={this.state.lineData[1][0]["high"]} onClick={this.addPointToLine} >High: {this.state.lineData[1][0]["high"]}</button></dt>
    	  	  <dt><button value={this.state.lineData[1][0]["low"]} onClick={this.addPointToLine} >Low: {this.state.lineData[1][0]["low"]}</button></dt>
    	  	  <dt><button value={this.state.lineData[1][0]["close"]} onClick={this.addPointToLine} >Close: {this.state.lineData[1][0]["close"]}</button></dt>
    	  	</Fragment>
    	  </dl>
    	  <button onClick={this.drawLine}>Draw</button>
    	</div>
    )
  }
}

export default provideChart(TooltipOnClick)