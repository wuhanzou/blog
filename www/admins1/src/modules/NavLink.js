import React, {
	Component
} from 'react';
import {
	Link
} from 'react-router'
class navlink extends Component {
	render() {
		return (
			<Link {...this.props} className="active"/>
		)
	}
}
export default navlink;