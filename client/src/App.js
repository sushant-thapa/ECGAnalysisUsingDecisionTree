import React, {Component} from 'react';
import {BrowserRouter as Router , Link, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import ApiDocumentation from './apidocumentation'
import Demo from './interactive'
import NavBar from './navbar'
import CustomData from './customdata'

class App extends Component {
	render() {
		return (
			<Router>
				<NavBar/>
				<Route exact path="/" component={Demo}/>
				<Route path="/documentation" component={ApiDocumentation} />
				<Route path="/custom" component={CustomData} />
			</Router>
		)
	}
}


export default App;
