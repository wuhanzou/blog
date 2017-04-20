require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/test.css');
require('styles/test.scss');
import React from 'react';
let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <p>112888888</p>
        <span cls="tops">
        	112888888
        	<p>666666666</p>
        	<em>88888888888</em>
        	<a>77777777777</a>
        </span>
        <div id="one"></div>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
