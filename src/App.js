import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AlignmentForm from './AlignmentForm';
import './App.css';
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';

class App extends Component {
  
  constructor(props){
  super(props);
  this.state={
     isAuthenticated: false,
     id: '',
     isVisible: true
  };

  this.hideForm = this.hideForm.bind(this);
  this.showForm = this.showForm.bind(this);
}
 hideForm() {
  this.setState({
      isVisible: false
  });
 }

 showForm() {
  this.setState({
      isVisible: true
  });
 }
  render() {
    console.log(this.state.isVisible);
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <AppBar title="SEQUENCE ALIGNMENT TOOL"
              iconElementLeft={
                <FlatButton label="Home" backgroundColor="white" onClick={this.showForm} containerElement={<Link to='/' />} />
              }
              iconElementRight={
                <IconMenu iconButtonElement={<IconButton name='menu'><MoreVertIcon /></IconButton>}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
              
                <MenuItem name='Login' primaryText='Login' onClick={this.hideForm} containerElement={<Link to={{ pathname:'/Login', props: this.state.isAuthenticated }} />}/>
                <MenuItem name='Sign up' primaryText='Sign up' onClick={this.hideForm} containerElement={<Link to='/Signup' />}/>
                <MenuItem name='Help' primaryText='Help' onClick={this.hideForm} containerElement={<Link to='/Help'/>} />
                <MenuItem name='Leaderboard' onClick={this.hideForm} primaryText='Leaderboard' containerElement={<Link to='/Leaderboard'/>} />
                {this.props.isAuthenticated ?
                  <MenuItem name='Leader Board' primaryText='Leader Board' />
                : ''}
                
                {this.props.isAuthenticated ?
                  <MenuItem name='Logout' primaryText='Logout' />
                : ''}
                </IconMenu>
              }
            />
            
            {this.state.isVisible ? <AlignmentForm /> : ''}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
