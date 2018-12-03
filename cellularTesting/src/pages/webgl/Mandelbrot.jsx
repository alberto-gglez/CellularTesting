import React from 'react';
import MandelbrotToolbar from '../../components/toolBars/MandelbrotToolbar';
import colormap from 'colormap';

const BOARD_SIZE = 800;
const CELL_SIZE = 1;

const ZOOM_ZONE_SCALE = 0.2;
const ZOOM_ZONE_SIZE = BOARD_SIZE * ZOOM_ZONE_SCALE;
const ZOOM_MIN_X = 50;
const ZOOM_MIN_Y = 100;

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

		const V_LOWER_LIMIT = -1.5;
		const V_UPPER_LIMIT = 1.5;
		const V_CELL_STEP = (V_UPPER_LIMIT - V_LOWER_LIMIT) / BOARD_SIZE;

		const H_LOWER_LIMIT = -2;
		const H_UPPER_LIMIT = 1;
		const H_CELL_STEP = (H_UPPER_LIMIT - H_LOWER_LIMIT) / BOARD_SIZE;

		this.state = {
			data: [...new Array(BOARD_SIZE)].map(() => {
				return [...new Array(BOARD_SIZE)].map(() => true);
			}),
			zoomX: null,
			zoomY: null,
			vLowerLimit: V_LOWER_LIMIT,
			vUpperLimit: V_UPPER_LIMIT,
			vCellStep: V_CELL_STEP,
			hLowerLimit: H_LOWER_LIMIT,
			hUpperLimit: H_UPPER_LIMIT,
			hCellStep: H_CELL_STEP
		};

		this.canvasRef = React.createRef();

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.context = this.canvasRef.current.getContext('2d');
		this.renderCells(this.state.data);
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
		const { hCellStep, hLowerLimit, vCellStep, vLowerLimit } = this.state;
		const [r, im] = keys;
		const cn = [im * hCellStep + hLowerLimit, r * vCellStep + vLowerLimit];

		let tmp = [0, 0];
		let i = 1;

		while (tmp[0] * tmp[0] + tmp[1] * tmp[1] < 4 && i < ITERATIONS) {
			tmp = this.addComplex(this.squareComplex(tmp), cn);
			i++;
		}

		return COLORS[i - 1];
	}

	renderCells(cell, keys = []) {
		if (Array.isArray(cell)) {
			cell.forEach((c, i) => this.renderCells(c, [...keys, i]));
		} else {
			const cellColor = this.getCellColor(keys);
			this.context.beginPath();
			this.context.rect(keys[1] * CELL_SIZE, keys[0] * CELL_SIZE, CELL_SIZE, CELL_SIZE);
			this.context.fillStyle = cellColor;
			this.context.fill();
		}
	}

	onMouseMove(e) {
		const {
			nativeEvent: { pageX, pageY }
		} = e;
		if (pageX >= ZOOM_MIN_X && pageY >= ZOOM_MIN_Y) {
			const zoomX = Math.min(
				Math.max(pageX - ZOOM_ZONE_SIZE / 2, ZOOM_MIN_X),
				ZOOM_MIN_X + BOARD_SIZE * CELL_SIZE - ZOOM_ZONE_SIZE
			);
			const zoomY = Math.min(
				Math.max(pageY - ZOOM_ZONE_SIZE / 2, ZOOM_MIN_Y),
				ZOOM_MIN_Y + BOARD_SIZE * CELL_SIZE - ZOOM_ZONE_SIZE
			);
			this.setState({ zoomX, zoomY });
		} else {
			this.setState({ zoomX: null, zoomY: null });
		}
	}

	onClick() {
		const { zoomX, zoomY } = this.state;
		const x1 = zoomX - ZOOM_MIN_X;
		const x2 = zoomY - ZOOM_MIN_Y;
		const y1 = zoomX + ZOOM_ZONE_SIZE - ZOOM_MIN_X;
		const y2 = zoomY + ZOOM_ZONE_SIZE - ZOOM_MIN_Y;
		console.log('click', x1, x2, y1, y2);
		// multiplicar directamente por el cellStep actual y luego actualizarlo
		// console.log('click', x1 * , x2, y1, y2);
	}

	render() {
		/*
		const { zoomX, zoomY } = this.state;
		const zoomZoneStyle = {
			width: `${ZOOM_ZONE_SIZE}px`,
			height: `${ZOOM_ZONE_SIZE}px`,
			left: `${zoomX}px`,
			top: `${zoomY}px`
		};
		*/

		return (
			<div id="mandelbrot">
				<MandelbrotToolbar />
				<div id="canvasWrapper">
					<canvas
						width={BOARD_SIZE * CELL_SIZE}
						height={BOARD_SIZE * CELL_SIZE}
						// onMouseMove={this.onMouseMove}
						ref={this.canvasRef}
					/>
				</div>
				{/*
					zoomX !== null && zoomY !== null ? (
					<div
						className="zoomZone"
						style={zoomZoneStyle}
						onMouseMove={this.onMouseMove}
						onClick={this.onClick}
					/>
				) : null
					*/}
			</div>
		);
	}
}
