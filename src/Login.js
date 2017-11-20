import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './App.css';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:''
  }
 }

handleClick(event){
 var apiBaseUrl = "http://192.168.0.4:4200/";
 var payload={
 "email":this.state.email,
 "password":this.state.password
 }
 console.log(payload);
 axios.post(apiBaseUrl+'login', payload)
 .then(function (response) {
 console.log(response);
 if(response.status == 200){
 console.log("Login successful");
 }
 else if(response.status == 204){
 console.log("Username password do not match");
 alert("username password do not match")
 }
 else{
 console.log("Username does not exists");
 alert("Username does not exist");
 }
 })
 .catch(function (error) {
 console.log(error);
 });
 }

render() {
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
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;