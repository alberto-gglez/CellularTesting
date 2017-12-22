import React from 'react';
import Board from './Board';
import Row from './Row';
import Cell from './Cell';

export default class Automaton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			generations: 0
		};
		this.turnsAlive = [];
		this.subscriptions = [];

		this.renderCells = this.renderCells.bind(this);
		this.checkValid = this.checkValid.bind(this);
		this.checkAlive = this.checkAlive.bind(this);
		this.updateSubscriptions = this.updateSubscriptions.bind(this);
	}

	componentWillMount() {
		this.interval = setInterval(() => {
			if (this.props.evalFn) {
				const newData = this.iterateData(this.state.data);
				this.setState(
					{ data: newData, generations: this.state.generations + 1 },
					this.updateSubscriptions
				);
			}
		}, this.props.delay || 1000);
	}

	updateSubscriptions() {
		const { generations } = this.state;
		this.subscriptions.forEach(fn => fn(generations));
	}

	subscribe(fn) {
		const length = this.subscriptions.push(fn);
		return () => {
			this.subscriptions.splice(length, 1);
		};
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	checkValid(...coords) {
		const res = coords.every((coord, i) => {
			if (coord.length > 1) {
				return (
					coord[0] >= 0 &&
					coord[0] < this.state.data.length &&
					coord[1] >= 0 &&
					coord[1] < this.state.data[i].length
				);
			}
			return coord[0] >= 0 && coord[0] < this.state.data.length;
		});
		return res;
	}

	checkAlive(...coords) {
		return (
			this.checkValid(coords) &&
			coords.reduce((data, coord) => {
				return data[coord];
			}, this.state.data)
		);
	}

	reset(odds = 0.5) {
		const { data } = this.state;
		if (data && Array.isArray(data[0])) {
			this.setState({
				data: new Array(data.length).map(() =>
					new Array(data[0].length).map(() => Math.random() > odds)
				)
			});
		} else {
			this.setState({
				data: new Array(data.length).map(() => Math.random() > odds)
			});
		}
	}

	iterateData(data, coords = []) {
		// console.log('iterateData', coords);
		if (Array.isArray(data)) {
			return data.map((d, i) => this.iterateData(d, [...coords, i]));
		} else {
			// ToDo: per cell turns alive counter
			let prevList = this.turnsAlive;
			for (let i = 0; i < coords.length; i++) {
				const coord = coords[i];
				if (Array.isArray(prevList[coord])) {
					prevList = prevList[coord];
				}
			}
			return this.props.evalFn(this.checkValid, this.checkAlive, coords);
		}
	}

	renderCells(cell, keys = []) {
		// console.log('renderCells', cell, keys);
		if (Array.isArray(cell)) {
			if (Array.isArray(cell[0])) {
				return cell.map((c, i) => this.renderCells(c, [...keys, i]));
			}

			const rowStyle = this.props.getRowStyle ? this.props.getRowStyle(cell) : null;
			return (
				<Row key={keys.toString()} style={rowStyle}>
					{cell.map((c, i) => this.renderCells(c, [...keys, i]))}
				</Row>
			);
		}
		const cellStyle = this.props.getCellStyle ? this.props.getCellStyle(keys, cell) : null;
		return <Cell key={keys.toString()} style={cellStyle} alive={cell} />;
	}

	render() {
		const { data } = this.state;
		const renderCells = this.props.renderCells || this.renderCells;
		const boardStyle = this.props.boardStyle || null;
		//console.log('data', data);
		return (
			<div className="automaton">
				<Board style={boardStyle}>{renderCells(data)}</Board>
			</div>
		);
	}
}
