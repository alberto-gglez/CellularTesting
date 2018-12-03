import React from 'react';

export default class DefaultLayout extends React.Component {
	render() {
		return <div id="defaultLayout">{this.props.children}</div>;
	}
}
