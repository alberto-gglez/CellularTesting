import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../app';
import Index from '../pages/Index';
import Automaton1D from '../pages/react/Automaton1D';
import Automaton2D from '../pages/react/Automaton2D';
import Mandelbrot from '../pages/webgl/Mandelbrot';
import 'styles/index.scss';

const Routes = () => (
	<Router>
		<div>
			<Route
				exact
				path="/"
				render={() => (
					<App>
						<Index />
					</App>
				)}
			/>
			<Route
				path="/1d"
				render={() => (
					<App>
						<Automaton1D />
					</App>
				)}
			/>
			<Route
				path="/2d"
				render={() => (
					<App>
						<Automaton2D />
					</App>
				)}
			/>
			<Route
				path="/mandelbrot"
				render={() => (
					<App>
						<Mandelbrot />
					</App>
				)}
			/>
		</div>
	</Router>
);

export default Routes;
