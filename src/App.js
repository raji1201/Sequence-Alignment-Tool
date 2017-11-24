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

class App extends Component {
  
  constructor(props){
  super(props);
  this.state={
     isAuthenticated: false,
     id: ''
  };
 }


  render() {

    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Home"
             showMenuIconButton={false}
              iconElementRight={
                          <IconMenu
                            iconButtonElement={<IconButton name='menu'><MoreVertIcon /></IconButton>}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                            <MenuItem name='Login' primaryText='Login' containerElement={<Link to={{ pathname:'/Login', props: this.state.isAuthenticated }} />}/>
                            <MenuItem name='Sign up' primaryText='Sign up' containerElement={<Link to='/Signup' />}/>
                            <MenuItem name='Help' primaryText='Help' containerElement={<Link to='/Help'/>} />
                            <MenuItem name='Leaderboard' primaryText='Leaderboard' containerElement={<Link to='/Leaderboard'/>} />
                            {this.props.isAuthenticated ?
                              <MenuItem name='Leader Board' primaryText='Leader Board' />
                            : ''}
                            {this.props.isAuthenticated ?
                              <MenuItem name='Logout' primaryText='Logout' />
                            : ''}
                          </IconMenu>}
                          />
              <AlignmentForm />
           </div>
           
         </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
