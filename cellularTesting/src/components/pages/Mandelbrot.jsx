import React from 'react';
import colormap from 'colormap';

const BOARD_SIZE = 1000;
const CELL_SIZE = 1;

const V_LOWER_LIMIT = -1.5;
const V_UPPER_LIMIT = 1.5;
const V_CELL_STEP = (V_UPPER_LIMIT - V_LOWER_LIMIT) / BOARD_SIZE;

const H_LOWER_LIMIT = -2;
const H_UPPER_LIMIT = 1;
const H_CELL_STEP = (H_UPPER_LIMIT - H_LOWER_LIMIT) / BOARD_SIZE;

const ITERATIONS = 200;

const COLORS = colormap({
	colormap: 'greens',
	nshades: ITERATIONS - 1,
	format: 'hex',
	alpha: 1
});
COLORS.push('#000000');

export default class Mandelbrot extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [...new Array(BOARD_SIZE)].map(() => {
				return [...new Array(BOARD_SIZE)].map(() => true);
			})
		};
	}

	componentDidMount() {
		const ctx = this.refs.canvas.getContext('2d');
		this.renderCells(ctx, this.state.data);
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

	getCellColor(keys) {
		const [r, im] = keys;
		const cn = [im * H_CELL_STEP + H_LOWER_LIMIT, r * V_CELL_STEP + V_LOWER_LIMIT];

		let tmp = [0, 0];
		let i = 1;

		while ((tmp[0] * tmp[0] + tmp[1] * tmp[1]) < 4 && i < ITERATIONS) {
			tmp = this.addComplex(this.squareComplex(tmp), cn);
			i++;
		}

		return COLORS[i - 1];
	}

	renderCells(ctx, cell, keys = []) {
		if (Array.isArray(cell)) {
			cell.map((c, i) => this.renderCells(ctx, c, [...keys, i]));
		} else {
			const cellColor = this.getCellColor(keys);
			ctx.beginPath();
			ctx.rect(keys[1] * CELL_SIZE, keys[0] * CELL_SIZE, CELL_SIZE, CELL_SIZE);
			ctx.fillStyle = cellColor;
			ctx.fill();
		}
	}

	render() {
		return (
			<div>
				<canvas width={BOARD_SIZE * CELL_SIZE} height={BOARD_SIZE * CELL_SIZE} ref="canvas" />
			</div>
		);
	}
}
