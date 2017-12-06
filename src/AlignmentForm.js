import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import AlignmentMatrix from './matrix/AlignmentMatrix';

export default class AlignmentForm extends Component {

	constructor( props ) {
	    super( props );
	    this.state = {
	    	query: '',
	    	database: '',
	    	gap: '',
	    	userScore: '',
	    	alignment: '',
	    	id: '',
	    	showMatrix: false,
	    	props: {},
	    	mode: ''
	    };
	}

	componentWillMount() {
    	var storage = window.localStorage;
    	if (storage.id) {
      		this.setState({
        		id: storage.id
      		});  
    	}
  	}
	//SANITISE THE INPUT, specifically gap
	handleSubmit(event) {

		this.setState ({
			showMatrix: false
		});

		var apiBaseUrl = "http://192.168.0.4:4200/";
		const re = /^(\+|-)?\d+$/;
		const se = /^[AaCcGgTt]+$/;
		
		if (!re.test(this.state.gap)) {
        	alert('Gap Penalty has to be numeric values only!');
      	}

      	else if (!se.test(this.state.query) || !se.test(this.state.database)) {
        	alert('Query seq and Database seq can only contain A, C, G, T!');
      	}
      	else {
      		var payload={
	 			"query":this.state.query,
	 			"database":this.state.database,
	 			"gap": this.state.gap,
	 			"userScore": this.state.userScore,
	 			"alignment": (this.state.alignment === 0) ? 'global' : 'local',
	 			"id": this.state.id,
	 		}

	 		if (this.state.mode === 0) {
	 			payload.mode = "result";
	 		} else if (this.state.mode === 1) {
	 			payload.mode = "game";
	 		}
	 		
	 		axios.post(apiBaseUrl + 'alignment', payload)
	 		.then((response) => {
	 			this.showMatrix(response);
	 		});	
      	}
		
	}

	showMatrix(response) {
		if (response.status === 200) {
			
			if (this.state.mode === 0) {
	 			response.data.mode = "result";
	 		} else if (this.state.mode === 1) {
	 			response.data.mode = "game";
	 		}

	 		response.data.id = this.state.id;
	 		
			this.setState ({
				showMatrix: true,
				props: response.data
			});	
		}

		else return null;
	}

	render() {
	  	return (
	  		<div>
				<div className="AlignmentForm">
			  		<MuiThemeProvider>
			  		<div>
			  			<TextField
			  				hintText="Enter first string for alignment"
			  				floatingLabelText="Query"
			  				onChange = {(event,newValue) => this.setState({query:newValue})}
			  			/>
			  			<br />
			  			<TextField
			  				hintText="Enter second string for alignment"
			  				floatingLabelText="Database"
			  				onChange = {(event,newValue) => this.setState({database:newValue})}
			  			/>
			  			<br />
			  			<TextField
			  				hintText="Enter gap penalty"
			  				floatingLabelText="Gap"
			  				onChange = {(event,newValue) => this.setState({gap:newValue})}
			  			/>
			  			<br />
			  			<br />
			  			<SelectField hintText="Mode"
			  				floatingLabelFixed={true}
			  				value={this.state.mode}
			  				onChange = {(event,newValue) => this.setState({mode:newValue})}>
	        				<MenuItem value={0} label="Result" primaryText="Result" />
					        <MenuItem value={1} label="Game" primaryText="Game" />					        
					    </SelectField>
			  			<br />
			  			<br />
			  			<SelectField hintText="Alignment type"
			  				floatingLabelFixed={true}
			  				value={this.state.alignment}
			  				onChange = {(event,newValue) => this.setState({alignment:newValue})}>
	        				<MenuItem value={0} label="Global" primaryText="Global" />
					        <MenuItem value={1} label="Local" primaryText="Local" />
					    </SelectField>
			  			<br />
			  			<br />
			  			NOTE : Mismatch score is taken as -1 and match score is taken as +1.
			  			<br />
			  			<br />
			  			<RaisedButton label="Submit" primary={true} onClick={(event) => this.handleSubmit(event)}/>
			  			</div>
			  		</MuiThemeProvider>
				</div>
				<br />
				<br />
				{(this.state.showMatrix) ? <AlignmentMatrix data={this.state.props}/> : null}
			</div>
	  	);
	}
}
