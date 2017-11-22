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

class Leaderboard extends Component {

constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
}
componentDidMount()
{
	var apiBaseUrl = "http://192.168.0.4:4200/";
	axios.get(apiBaseUrl+'leaderboard')
	.then(function (response) {
	console.log(response);
	if(response.status == 200){
	console.log("Successful");
	const posts = response.data.map(obj => obj.data);
        this.setState({ posts });
	}
	else if(response.status == 204){
	console.log("ERROR");
	alert("ERROR");
	}
	else{
		console.log("ERROR");
	alert("ERROR");
	}
	})
	.catch(function (error) {
	console.log(error);
	});
}

render() {
  const data = [{
    name: 'ABC',
    score: 26
  }];

  const columns = [{
    Header: 'Name',
    accessor: 'name'
  }, {
    Header: 'Score',
    accessor: 'score'
  }];

return (
  <ReactTable className="-highlight" defaultPageSize={10} style={styles} data={this.state.posts} columns={columns} />
  );
	}
}
export default Leaderboard;