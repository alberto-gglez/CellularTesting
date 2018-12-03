import React from 'react';
import 'normalize.css';
import 'styles/index.scss';
import Navigation from './components/Navigation';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { height: 1000 };
		this.onResize = this.onResize.bind(this);
	}

	componentWillMount() {
		// window.addEventListener('resize', this.onResize);
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
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
				<div id="content">
				<Navigation />
					{React.Children.map(this.props.children, c =>
						React.cloneElement(c, { height: this.state.height })
					)}
				</div>
			</div>
		);
	}
}
