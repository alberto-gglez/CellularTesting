import React from 'react';
import Automaton from '../automaton/Automaton';
import colormap from 'colormap';

const LOWER_LIMIT = -2;
const UPPER_LIMIT = 2;
const SIZE = 500;
const CELL_STEP = (UPPER_LIMIT - LOWER_LIMIT) / SIZE;
const COLORS = colormap({
	colormap: 'greens',
	nshades: 99,
	format: 'hex',
	alpha: 1
});
COLORS.push('black');

export default class Mandelbrot extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [...new Array(SIZE)].map(() => {
				return [...new Array(SIZE)].map(() => true);
			})
		};
		this.evalFn = this.evalFn.bind(this);
		this.getRef = this.getRef.bind(this);
		this.cellStyle = this.cellStyle.bind(this);
	}

	evalFn() {
		return true;
	}

	getRef(ref) {
		this.automaton = ref;
	}

	addComplex(c1, c2) {
		const [r1, i1] = c1;
		const [r2, i2] = c2;
		return [r1 + r2, i1 + i2];
	}

	squareComplex(c) {
		const [r, i] = c;
		return [r * r - i * i, r * i + r * i];
	}

	cellStyle(keys) {
		const [r, im] = keys.map(k => k * CELL_STEP + LOWER_LIMIT);
		const cn = [im, r];

		let tmp = [0, 0];
		let i = 1;

		while (tmp[0] < 2 && i < 100) {
			tmp = this.addComplex(this.squareComplex(tmp), cn);
			i++;
		}

		return { border: '0', backgroundColor: COLORS[i], width: '5px', height: '5px' };
	}

	render() {
		const { data } = this.state;
		console.log('called with data', data ? data.length : null);
		return (
			<div>
				<Automaton
					noLoop
					data={data}
					evalFn={this.evalFn}
					getCellStyle={this.cellStyle}
					delay={100}
					ref={this.getRef}
				/>
			</div>
		);
	}
}
