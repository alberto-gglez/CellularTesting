import React from 'react';
import Navigation from './components/Navigation';
import 'normalize.css';
import 'styles/index.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { height: 1000 };
		this.onResize = this.onResize.bind(this);
	}

	componentWillMount() {
		// window.addEventListener('resize', this.onResize);
	}

	componentWillUnmount() {
		// window.removeEventListener('resize', this.onResize);
	}

	onResize(e) {
		this.setState({ height: e.target.innerHeight - 100 });
	}

	render() {
		return (
			<div className="App">
				<Navigation />
				<div className="content">
					{React.Children.map(this.props.children, c =>
						React.cloneElement(c, { height: this.state.height })
					)}
				</div>
			</div>
		);
	}
}
