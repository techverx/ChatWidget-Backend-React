import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app';

import { generateRequireSignInWrapper } from 'redux-token-auth'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/',
})

export default function(){
	return (
	    <div>
		  <Route exact={true} path="/" component={App}/>
		</div>
	);
} 
