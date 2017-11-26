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
	.then((response) => {
	if(response.status === 200){
    var scores = response.data;
    this.setState({ posts: scores });
	}
	else if(response.status === 204){
	console.log("ERROR");
	alert("ERROR");
	}
	else{
		console.log("ERROR");
	alert("ERROR");
	}
	})
	.catch((error) => {
	console.log(error);
	});
}

render() {
  const columns = [{
    Header: 'Name',
    accessor: 'fullName'
  }, {
    Header: 'Score',
    accessor: 'highScore'
  }];

return (
  <ReactTable className="-highlight" pageSize={10} showPagination={false} style={styles} data={this.state.posts} columns={columns} />
  );
  }
}
export default Leaderboard;