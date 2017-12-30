import React from 'react';
import Automaton from '../automaton/Automaton';
import ControlPanel from '../utils/ControlPanel';

export default class Automaton2D extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [...new Array(100)].map(() => {
				return [...new Array(100)].map(() => Math.random() > 0.5);
			}),
			generations: 0
		};
		this.evalFn = this.evalFn.bind(this);
		this.getRef = this.getRef.bind(this);
	}

	evalFn(checkValid, checkAlive, coords) {
		const [x, y] = coords;
		const cellAlive = checkAlive(x, y);
		let neighboursAlive = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if ((i !== 0 || j !== 0) && checkAlive(x + i, y + j)) {
					neighboursAlive++;
				}
			}
		}
		if (cellAlive) {
			return neighboursAlive === 2 || neighboursAlive === 3;
		} else {
			return neighboursAlive === 3;
		}
	}

	getRef(ref) {
		this.automaton = ref;
	}

	componentDidMount() {
		this.cancelSub = this.automaton.subscribe(generations => this.setState({ generations }));
	}

	componentWillUnmount() {
		if (this.cancelSub) {
			this.cancelSub();
		}
	}

	render() {
		const { data, generations } = this.state;
		return (
			<div>
				Generations: {generations}
				<Automaton data={data} evalFn={this.evalFn} delay={100} ref={this.getRef} />
			</div>
		);
	}
}
