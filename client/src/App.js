import React, {Component} from 'react';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			apis : [
			{title: "Classifies a heartbeat",
			 method: "POST",
			 path: "/classifybeat",
			 params: [
			 ["beat","[number]","A list of sequential voltage values of the beat."],
			 ["frequency","number","The sample frequency of the signal."]],
			}
			]
		}
	}

	getApi(method,path){
		for (let i=0; i < this.state.apis.length ; i++){
			let api = this.state.apis[i]
			if (api.method == method && api.path == path){
				return api
			}
		}
	}

	prepareParam(param){
		let name,type,desc = param
		return <div>
			<div>{name}</div>
			<div>{type}</div>
			<div>{desc}</div>
		</div>
	}

	prepareAPI(api){
		return <div>
			<div>
			{api.title}
			</div>
			<div>
				<div>{api.method}</div><div style={{display: 'inline-block'}}>{api.path}</div>
			</div>
			<div>
				<div></div>
				<div>
					<div>Name</div><div>Type</div><div>Description</div>
				</div>
				{api.params.map( param => this.prepareParam(param))}
			</div>
		</div>
	}

    render(){
    	var api1 = this.getApi("POST","/classifybeat")
        return <div>
        	<div>
        	ECG Classifier
        	</div>
        	<div>
        		<div>
        		API documentation
        		</div>
        		<div>
        		{this.prepareAPI(api1)}
        		</div>
        	</div>
        </div>
    }
}


export default App;