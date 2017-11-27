import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.css';
import axios from 'axios';

const styles = {
	width: 1400,
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
			var scores = response.data;
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
			Header: 'Sequence 1',
			accessor: 'query'
		}, {
			Header: 'Sequence 2',
			accessor: 'database'
		}, {
			Header: 'Alignment Type',
			accessor: 'alignmentType'
		}, {
			Header: 'Seq 1 Alignment',
			accessor: 'queryAlignment'
		}, {
			Header: 'Seq 2 Alignment',
			accessor: 'databaseAlignment'
		}, {
			Header: 'Date',
			accessor: 'date'
		}, {
			Header: 'Seq 1 Start',
			accessor: 'queryStart'
		}, {
			Header: 'Seq 2 Start',
			accessor: 'databaseStart'
		}, {
			Header: 'Alignment Score',
			accessor: 'score'
		}, {
			Header: 'User Score',
			accessor: 'userScore'
		}];

	return (
		<ReactTable className="-highlight" pageSize={10} showPagination={true} style={styles} data={this.state.posts} columns={columns} />
		);
	}
}
