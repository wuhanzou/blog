import React, {
	Component
} from 'react';
import {
	Link,
	IndexLink
} from 'react-router'
import NavLink from './NavLink'
import Home from './Home'
class App extends Component {
	render() {
		return (
			<div>
		        <h1>React Router Tutorial</h1>
				<ul role="nav">
				  <li><NavLink to="/about">About</NavLink></li>
				  <li><NavLink to="/repos">Repos</NavLink></li>
				  <li><NavLink to="/" onlyActiveOnIndex={true} >Home</NavLink></li>
		    
		        </ul>

		{ /* add this */ } {
			this.props.children || <Home/>
		}

	      </div>
		)
	}
}
export default App;