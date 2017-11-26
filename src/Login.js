import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './App.css';
import { Redirect } from 'react-router';

class Login extends Component {
constructor(props){
    super(props);
    this.state={
    email:'',
    password:'',
    id: '',
    fireRedirect: false
    }
}


handleClick(event){
    event.preventDefault()
    var apiBaseUrl = "http://192.168.0.4:4200/";
    var payload={
        "email":this.state.email,
        "password":this.state.password
    }
    console.log(payload);
    
    axios.post(apiBaseUrl+'login', payload)
    .then((response) => {
        console.log(response);
        if(response.status === 200){
            console.log("Login successful");
            var storage = window.localStorage;
            storage.setItem('id', response.data._id);
            this.setState({
                id: storage.id
            }); 
            console.log(this.state.id);
            this.setState({
                fireRedirect: true
            });
            console.log(storage.getItem('id'));
            
        }
        else if(response.status === 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
            console.log("Username does not exists");
            alert("Username does not exist");
        }
    })
    .catch((error) => {
        console.log(error);
    });

}

render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    return (
      <div className="Login">
        <MuiThemeProvider>
          <div className="Login">
          
           <TextField
             hintText="Enter your email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
         {fireRedirect && (
          <Redirect to={from || '/'}/>
        )}
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;