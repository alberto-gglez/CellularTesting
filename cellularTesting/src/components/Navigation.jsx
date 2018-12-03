import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);

		let section = '';
		const locationParts = location.href.split('/');
		if (locationParts.length > 3) {
			section = locationParts[3];
		} else {
			section = 'home';
		}

		this.state = { section };

		this.onSectionChange = this.onSectionChange.bind(this);
	}

	onSectionChange(e) {
		e.preventDefault();
		this.setState({ section: e.target.id });
	}

	renderSubsection() {
		switch (this.state.section) {
			case 'react':
				return (
					<ul>
						<li>
							<Link to="/react/1d">1D automata</Link>
						</li>
						<li>
							<Link to="/react/2d">2D automata</Link>
						</li>
					</ul>
				);
			case 'webgl':
				return (
					<ul>
						<li>
							<Link to="/webgl/mandelbrot">Mandelbrot</Link>
						</li>
					</ul>
				);
			default:
		}
	}

	render() {
		return (
			<div id="navigation">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link id="react" to=" " onClick={this.onSectionChange}>
							React
						</Link>
					</li>
					<li>
						<Link id="webgl" to=" " onClick={this.onSectionChange}>
							WebGL
						</Link>
					</li>
					<br />
					{this.renderSubsection()}
				</ul>
			</div>
		);
	}
}
