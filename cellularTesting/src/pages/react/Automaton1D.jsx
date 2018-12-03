import React from 'react';
import Automaton from '../../components/automaton/Automaton';
import AutomatonToolbar from '../../components/toolBars/AutomatonToolbar';

export default class Automaton1D extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [...new Array(50)].map(() => Math.random() > 0.5)
		};
		this.evalFn = this.evalFn.bind(this);
		this.getRef = this.getRef.bind(this);
	}

	evalFn(checkValid, checkAlive, coords) {
		const leftAlive = checkAlive(coords[0] - 1);
		const rightAlive = checkAlive(coords[0] + 1);
		return (leftAlive || rightAlive) && !(leftAlive && rightAlive);
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
			<div id="automaton1dContainer">
				<AutomatonToolbar
					onStart={() => {
						console.log('outside onstart');
					}}
					onPause={() => {
						console.log('outside onPause');
					}}
					onStop={() => {
						console.log('outside onStop');
					}}
					onOptionChange={() => {
						console.log('onOptionChange');
					}}
				/>
				<div id="automaton1d">
					Generations: {generations}
					<Automaton data={data} evalFn={this.evalFn} delay={100} ref={this.getRef} />
				</div>
			</div>
		);
	}
}
