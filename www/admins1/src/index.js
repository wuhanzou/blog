import React from 'react'
import ReactDOM from 'react-dom';
// bring in `browserHistory` instead of `hashHistory`
import {
  Router,
  Route,
  browserHistory,
  IndexRoute
} from 'react-router'

import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Home from './modules/Home'
// import routes and pass them into <Router/>
import routes from './modules/routes'
import './index.css'

ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>, document.getElementById('app'))
  // ReactDOM.render((
  //   <Router history={browserHistory}>
  //     <Route path="/" component={App}>
  //       {/* add it here, as a child of `/` */}
  //       <IndexRoute component={Home}/>
  //       {/* make them children of `App` */}
  //       <Route path="/repos" component={Repos}>
  //         <Route path="/repos/:userName/:repoName" component={Repo}/>
  //       </Route> 
  //       <Route path="/about" component={About}/>
  //     </Route>
  //   </Router>
  // ), document.getElementById('app'))