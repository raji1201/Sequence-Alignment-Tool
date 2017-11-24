import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class AlignmentForm extends Component {

	constructor( props ) {
	    super( props );
	    this.state = {
	    	query: '',
	    	database: '',
	    	gap: '',
	    	userScore: '',
	    	alignment: ''
	    };
	}

	//SANITISE THE INPUT, specifically gap
	handleSubmit(event) {
		var apiBaseUrl = "http://192.168.0.4:4200/";
		var payload={
 			"query":this.state.query,
 			"database":this.state.database,
 			"gap": this.state.gap,
 			"userScore": this.state.userScore,
 			"alignment": this.state.alignment
 		}

 		axios.post(apiBaseUrl + 'alignment', payload)
 		.then(function (response) {
 			console.log(response);
 		})
	}
	//CHANGE LAST TEXT FIELD TO RADIO. CHANGE STATE BASE ON IT
	render() {
	  	return (
			<div className="AlignmentForm">
		  		<MuiThemeProvider>
		  			<TextField
		  				hintText="Enter first string for alignment"
		  				floatingLabelText="Query"
		  				onChange = {(event,newValue) => this.setState({query:newValue})}
		  			/>
		  			<TextField
		  				hintText="Enter second string for alignment"
		  				floatingLabelText="Database"
		  				onChange = {(event,newValue) => this.setState({database:newValue})}
		  			/>
		  			<TextField
		  				hintText="Enter gap penalty"
		  				floatingLabelText="Gap"
		  				onChange = {(event,newValue) => this.setState({gap:newValue})}
		  			/>
		  			<TextField
		  				hintText="Enter predicted score"
		  				floatingLabelText="User Score"
		  				onChange = {(event,newValue) => this.setState({userScore:newValue})}
		  			/>
		  			<TextField
		  				hintText="Enter alignment type"
		  				floatingLabelText="alignment"
		  				onChange = {(event,newValue) => this.setState({alignment:newValue})}
		  			/>
		  			<RaisedButton label="Submit" primary={true} onClick={(event) => this.handleSubmit(event)}/>
		  		</MuiThemeProvider>
			</div>
	  	);
	}
}