import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/index.scss';
import App from '../app';

import DefaultLayout from './layouts/DefaultLayout';
import MandelbrotLayout from './layouts/MandelbrotLayout';

import Home from '../pages/Home';
import Automaton1D from '../pages/react/Automaton1D';
import Automaton2D from '../pages/react/Automaton2D';
import Mandelbrot from '../pages/webgl/Mandelbrot';

const Routes = () => (
	<Router>
		<div>
			<Route
				exact
				path="/"
				render={() => (
					<App>
						<DefaultLayout>
							<Home />
						</DefaultLayout>
					</App>
				)}
			/>
			<Route
				path="/react/1d"
				render={() => (
					<App>
						<DefaultLayout>
							<Automaton1D />
						</DefaultLayout>
					</App>
				)}
			/>
			<Route
				path="/react/2d"
				render={() => (
					<App>
						<DefaultLayout>
							<Automaton2D />
						</DefaultLayout>
					</App>
				)}
			/>
			<Route
				path="/webgl/mandelbrot"
				render={() => (
					<App>
						<MandelbrotLayout>
							<Mandelbrot />
						</MandelbrotLayout>
					</App>
				)}
			/>
		</div>
	</Router>
);

export default Routes;
