import React, {Component} from 'react';

import {Segment,Header} from 'semantic-ui-react'

class ApiDocumentation extends Component {
	constructor(props){
		super(props)
		this.state = {
			apis : [
			{title: "Classify a heartbeat",
			 method: "POST",
			 path: "/classifybeat",
			 params: [
			 ["beat","[number]","A list of sequential voltage values of the beat.",1],
			 ["frequency","number","The sample frequency of the signal.",2]],
			}
			]
		}
	}

	getApi(method,path){
		for (let i=0; i < this.state.apis.length ; i++){
			let api = this.state.apis[i]
			if (api.method === method && api.path === path){
				return api
			}
		}
	}

	prepareParam(param){
		const styles = {
			fields: {
				display: 'flex',
				borderBottom : '1px solid',
			},
			name: {
				width: '20%'
			},
			type: {
				width: '20%'
			},
			desc: {
				width: '50%'
			}
		}
		let [name,type,desc,key] = param
		return <div id={key} style={styles.fields}>
			<div style={styles.name}>{name}</div>
			<div style={styles.type}>{type}</div>
			<div style={styles.desc}>{desc}</div>
		</div>
	}

	prepareAPI(api){
		const styles = {
			apiContainer: {
				//border : '1px solid',
				marginTop: '20px',
				marginLeft: '10%',
				maxWidth: '50%',

			},
			mpContainer : {
				display: 'flex',
			},
			title : {
				fontSize: '1.5em'
			},
			method: {
				color: '#ee1111',
				fontSize: '2em',
			},
			path: {
				position: 'relative',
				marginLeft: '10%',
				color: '#00aa00',
				fontSize: '1.2em'
			},
			pathSpan: {
				position: 'absolute',
				bottom: '0'
			},
			field : {
				borderBottom : '1px solid #000000',
				fontSize: '1.2em',
				color: 'blue'
			},
			ntdContainer: {
				display: 'flex',
				borderBottom : '1px solid',
			},
			name: {
				width: '20%'
			},
			type: {
				width: '20%'
			},
			desc: {
				width: '60%'
			}
		}
		return <div style={styles.apiContainer}>
			<div style={styles.title}>
			{api.title}
			</div>
			<div style={styles.mpContainer}>
				<div style={styles.method}>{api.method}</div>
				<div style={styles.path}><span style={styles.pathSpan}>{api.path}</span></div>
			</div>
			<div>
				<div style={styles.field}>
				Fields
				</div>
				<div style={styles.ntdContainer} >
					<div style={styles.name}>Name</div>
					<div style={styles.type}>Type</div>
					<div style={styles.desc}>Description</div>
				</div>
				<div>
					{api.params.map( param => this.prepareParam(param))}
				</div>
			</div>
		</div>
	}

    render(){
    	var api1 = this.getApi("POST","/classifybeat")
        return (
			<Segment textAlign="center" vertical>
				<Header color="orange" style={{
				fontSize:"4em"
				}}>
					ECG Classifier
				</Header>
				<Header color="orange" style={{
					fontSize:"2em"
				}}>
					API documentation
				</Header>
				<>
					{this.prepareAPI(api1)}
				</>

			</Segment>
		)
    }
}


export default ApiDocumentation;
