import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';
import Register from './Register';

import { BrowserRouter, Link, Route } from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
	<div>
    	<Route path="/" component={App} />
    	<Route path="/Login" component={Login} />
    	<Route path="/Signup" component={Register} />
    </div>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
