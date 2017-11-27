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
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(this.state.email !== '' && this.state.password !== '')
    {
        if(regexForEmail.test(this.state.email))
        {
            var payload={
                "email":this.state.email,
                "password":this.state.password
            }
            console.log(payload);
            
            axios.post(apiBaseUrl+'login', payload)
            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    var storage = window.localStorage;
                    storage.setItem('id', response.data._id);
                    this.setState({
                        id: storage.id
                    });
                    this.setState({
                        fireRedirect: true
                    });
                    
                }
                else if(response.status === 401){
                    alert("Incorrect username and password!");
                }
                else{
                    alert("Username does not exist");
                }
            })
            .catch((error) => {
                alert("Incorrect username and password!");
                console.log(error);
            });
        }
        else
            alert('Incorrect email format!');
    }
    else
        alert('Please fill all the fields!');
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