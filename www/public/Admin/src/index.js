import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
var $ = require('jquery');

// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));
var MyTitle = React.createClass({
	getInitialState: function() {
		return {
			username: '',
			lastGistUrl: ''
		}
	},
	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			var lastGist = result[0];
			if (this.isMounted()) {
				this.setState({
					username: lastGist.owner.login,
					lastGistUrl: lastGist.html_url
				});
			}
		}.bind(this));
	},
	render: function() {
		return (
			<div>
				{this.state.username}`s last gist is
				<a href="{this.state.lastGistUrl}">here</a>
			</div>
		)
	}
});

ReactDOM.render(
	<MyTitle source="https://api.github.com/users/octocat/gists" />, document.body
);