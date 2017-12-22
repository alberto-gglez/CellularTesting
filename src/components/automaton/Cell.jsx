import React from 'react';

const Cell = props => (
	<div className={`cell${props.alive ? ' alive' : ''}`} style={props.style}>
		{props.children}
	</div>
);
export default Cell;
