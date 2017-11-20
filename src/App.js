import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './App.css';
import login from './Login';
import Signup from './Register';
import { Link } from 'react-router-dom'

class App extends Component {
   

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
                            <MenuItem name='Login' primaryText='Login' containerElement={<Link to='/Login' />}/>
                            <MenuItem name='Sign up' primaryText='Sign up' containerElement={<Link to='/Signup'/>}/>
                            <MenuItem name='Help' primaryText='Help' />
                            
                            {this.props.isAuthenticated ?
                            <MenuItem name='logout' primaryText='Logout' />
                            : ''}
                          </IconMenu>}
                          />

           </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
