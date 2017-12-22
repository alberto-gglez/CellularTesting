import React from 'react';

export default class ControlPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { children } = this.props;
		return (
			<div className="controlPanel">
				controlPanel
				{children}
			</div>
		);
	}
}
