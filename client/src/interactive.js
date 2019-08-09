import React, {Component} from 'react'
import {Segment,Card,Grid,Button,Header} from 'semantic-ui-react'

import axios from 'axios'

import HeartBearMonitor from './heartbeatmonitor'
import {Beats} from './beatsjson'

const symbols = "NLRBAaJSVrFejE/fQ?"

class Demo extends Component{
	constructor(props){
		super(props)
		const beats = []
		for (let i=0;i<Beats.length;i++){
			const beat = Beats[i]
			beat.key = i
			beats.push(beat)
		}
		this.state = {
			beats: beats,
			beat: beats[0],
			prediction: '...'
		}



	}

	componentDidMount() {
		const {beat} = this.state
		axios.post('/api/classifybeat',{beat})
			.then((data) => {
				console.log(data.data.sym)
				this.setState({prediction:data.data.sym})
			})
			.catch(err=>{alert(err)})
	}

	setBeat = (beat) => {
		this.setState({beat})
		this.setState({prediction:"..."})
		axios.post('/api/classifybeat',{beat})
			.then((data) => {
				console.log(data.data.sym)
				this.setState({prediction:data.data.sym})
			})
			.catch(err=>{alert(err)})
	}


	render(){
		return (
			<Segment vertical>
				<Grid divided columns="2" style={{
					padding:"0 1em"
				}} >
					<Grid.Column width="3">
						<Segment textAlign="center" vertical style={{
							maxHeight: 700,
							overflowX:'hidden',
							overflowY:"scroll"
						}}>
							<Header content="Select a Beat"/>
							<>{this.state.beats.map( beat =>(
								<Card key={beat.key}>
									<Button color="blue" content={beat.sym}
									onClick={() => this.setBeat(beat)}/>
								</Card>)
								)}</>
						</Segment>
					</Grid.Column>

					<Grid.Column width="10">
						<HeartBearMonitor beat={this.state.beat}/>
					</Grid.Column>

					<Grid.Column stretched width="3" >
							<Grid.Row textAlign="center">
								<Segment textAlign="center" vertical style={{
									marginTop: "2em"
								}}>
									<Header>
										Known Arrythmia Type:
									</Header>
									<Header color="blue" style={{
										fontSize:"10em"
									}}>
										{this.state.beat.sym}
									</Header>
								</Segment>
							</Grid.Row>
							<Grid.Row>
								<Segment textAlign="center" vertical style={{
									marginTop: "2em"
								}}>
									<Header>
										Predicted Arrythmia Type:
									</Header>
									<Header color="orange" style={{
										fontSize:"10em"
									}}>
										{this.state.prediction}
									</Header>
								</Segment>
							</Grid.Row>
					</Grid.Column>
				</Grid>
			</Segment>)
	}
}




export default Demo;