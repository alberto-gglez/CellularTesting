import React from 'react';

export default class MandelbrotLayout extends React.Component {
	render() {
		return <div id="mandelbrotLayout">{this.props.children}</div>;
	}
}
