import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.css';
import axios from 'axios';

const styles = {
	width: 400,
	overflow: 'hidden',
	margin: '20px auto 0'
};

export default class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			id: ''
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
	componentDidMount()
	{	
		var payload = {
			"userId" : this.state.id
		};
		console.log(payload);
		var apiBaseUrl = "http://192.168.0.4:4200/";
		axios.get(apiBaseUrl+`profile?userId=${this.state.id}`)
		.then((response) => {
		if(response.status === 200){
			console.log(response);
			var scores = response.data.history;
			this.setState({ posts: scores });
		}
		else if(response.status === 204){
            alert("ERROR");
		}
		else{
			alert("ERROR");
		}
		})
		.catch((error) => {
            console.log(error);
		});
	}

	render() {
		const columns = [{
			Header: 'Query',
			accessor: 'query'
		}, {
			Header: 'Database',
			accessor: 'database'
		}, {
			Header: 'Date',
			accessor: 'date'
		}, {
			Header: 'Database Start',
			accessor: 'databaseStart'
		}, {
			Header: 'Query Start',
			accessor: 'queryStart'
		}, {
			Header: 'Alignment Score',
			accessor: 'score'
		}, {
			Header: 'User Score',
			accessor: 'userScore'
		}];

	return (
		<ReactTable className="-highlight" pageSize={10} showPagination={false} style={styles} data={this.state.posts} columns={columns} />
		);
	}
}
