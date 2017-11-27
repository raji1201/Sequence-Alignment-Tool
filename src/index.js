import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';
import Register from './Register';
import Help from './Help';
import Leaderboard from './Leaderboard';
import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './Profile';

ReactDOM.render(<BrowserRouter>
	<div>
    	<Route path="/" component={App} />
    	<Route path="/Login" component={Login} />
    	<Route path="/Signup" component={Register} />
    	<Route path="/Help" component={Help} />  
    	<Route path="/Leaderboard" component={Leaderboard} />  	
    	<Route path="/Profile" component={Profile} />  	
    </div>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
