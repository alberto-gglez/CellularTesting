import React from 'react';
import Automaton from '../automaton/Automaton';
import colormap from 'colormap';

const SIZE = 400;
const V_LOWER_LIMIT = -1.5;
const V_UPPER_LIMIT = 1.5;
const V_CELL_STEP = (V_UPPER_LIMIT - V_LOWER_LIMIT) / SIZE;

const H_LOWER_LIMIT = -2;
const H_UPPER_LIMIT = 1;
const H_CELL_STEP = (H_UPPER_LIMIT - H_LOWER_LIMIT) / SIZE;

const ITERATIONS = 100;

const COLORS = colormap({
	colormap: 'greens',
	nshades: ITERATIONS - 1,
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
		const [r, im] = keys;
		const cn = [im * H_CELL_STEP + H_LOWER_LIMIT, r * V_CELL_STEP + V_LOWER_LIMIT];

		let tmp = [0, 0];
		let i = 1;

		while (tmp[0] < 2 && i < ITERATIONS) {
			tmp = this.addComplex(this.squareComplex(tmp), cn);
			i++;
		}

		return { border: '0', backgroundColor: COLORS[i], width: '2px', height: '2px' };
	}

	render() {
		const { data } = this.state;
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
