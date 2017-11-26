import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './App.css';
import { Redirect } from 'react-router';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            fullName:'',
            email:'',
            password:'',
            verifyPassword:'',
            fireRedirect: false
        }
    }

    handleClick(event){
        var apiBaseUrl = "http://192.168.0.4:4200/";
        
        const regexForFullName = /^[A-z]+$/;
        const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(this.state.fullName !== '' && this.state.email !== '' && this.state.password !== '' && this.state.verifyPassword !== '')
        {
            if(regexForFullName.test(this.state.fullName) && regexForEmail.test(this.state.email))
            {
                if(this.state.password === this.state.verifyPassword)
                {
                    var payload={
                        "fullName": this.state.fullName,
                        "email":this.state.email,
                        "password":this.state.password,
                        "verifyPassword":this.state.verifyPassword
                    }
                    
                    axios.post(apiBaseUrl+'signup', payload)
                    .then((response) => {
                        if(response.status === 200){
                            this.setState({
                                fireRedirect: true
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else
                    alert('Passwords do not match!');
            }
            else
                alert('Full Name can only contain alphabets and/or Email format incorrect');
        }
        else
            alert('Please fill all fields!');
    }

    render() {
        const { from } = this.props.location.state || '/'
        const { fireRedirect } = this.state
        return (
            <div className="Register">
                <MuiThemeProvider>
                    <div>
                       <TextField
                         hintText="Enter your full name"
                         floatingLabelText="Full Name"
                         onChange = {(event,newValue) => this.setState({fullName:newValue})}
                         />
                        <br/>
                        <TextField
                         hintText="Enter your Email"
                         type="email"
                         floatingLabelText="Email"
                         onChange = {(event,newValue) => this.setState({email:newValue})}
                         />
                        <br/>
                        <TextField
                         type = "password"
                         hintText="Enter your Password"
                         floatingLabelText="Password"
                         onChange = {(event,newValue) => this.setState({password:newValue})}
                         />
                        <br/>
                        <TextField
                         type = "password"
                         hintText="Re-enter your Password"
                         floatingLabelText="Re-enter Password"
                         onChange = {(event,newValue) => this.setState({verifyPassword:newValue})}
                         />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
                {fireRedirect && (
                    <Redirect to={from || '/Login'}/>
                )}
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Register;