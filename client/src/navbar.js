import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Segment,Menu,Responsive,Container,Button} from 'semantic-ui-react'

const getWidth = () => {
	const isSSR = typeof window === 'undefined'

	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class NavBar extends Component{
	constructor(props){
		super(props)
		this.colors = {
			crtGreen : "#33ff00",
			paleVioletRed: "palevioletred",

		}
	}

	render(){
		const {crtGreen,paleVioletRed} = this.colors
		return (
			<Segment inverted color="blue" vertical style={{padding:0}}>
				<Container>
					<Menu inverted color="blue" borderless size="massive" style={{
						minHeight: "7.5vh",
						border: 0,
						borderRadius: 0,
						boxShadow: "0 0 0 0",
					}}>
						<Menu.Item header as={Link} to="/" style={{
							fontSize: "2em",
							padding: 0,
							paddingLeft: "0.5em",
							paddingRight: "0.5em"

						}}>
							<span>ECG</span>
						</Menu.Item>
						<Menu.Item as={Link} to="/custom" style={{
							fontSize: "2em",
							padding: 0,
							paddingLeft: "0.5em",
							paddingRight: "0.5em"
						}}>
							<span>
								Custom Data
							</span>
						</Menu.Item>
						<Menu.Item as={Link} to="/documentation" style={{
							fontSize: "2em",
							padding: 0,
							paddingLeft: "0.5em",
							paddingRight: "0.5em"
						}}>
							<span>API</span>
						</Menu.Item>
						<Menu.Item position="right" style={{
							padding: 0,
						}}>
							<Button color="orange" content="Contact" />
						</Menu.Item>
					</Menu>
				</Container>
			</Segment>
			)
	}
}


export default NavBar