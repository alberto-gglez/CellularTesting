import React from 'react';

export default class AutomatonToolbar extends React.Component {
	constructor(props) {
		super(props);

		this.onStart = this.onStart.bind(this);
		this.onPause = this.onPause.bind(this);
		this.onStop = this.onStop.bind(this);
		this.onOptionChange = this.onOptionChange.bind(this);
	}

	onStart() {
		const { onStart } = this.props;
		if (onStart) {
			onStart();
		}
	}

	onPause() {
    const { onPause } = this.props;
		if (onPause) {
			onPause();
		}
  }

	onStop() {
    const { onStop } = this.props;
		if (onStop) {
			onStop();
		}
  }

	onOptionChange() {}

	render() {
		return (
			<div className="toolbar">
				<div className="group">
					<input type="button" value="Start" onClick={this.onStart} />
					<input type="button" value="Pause" onClick={this.onPause} />
					<input type="button" value="Stop" onClick={this.onStop} />
				</div>
				<div className="group">group 2</div>
			</div>
		);
	}
}
