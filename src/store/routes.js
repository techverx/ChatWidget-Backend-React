import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app';
import SignInPage from '../containers/signin'

import { generateRequireSignInWrapper } from 'redux-token-auth'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/signin',
})

export default (
    <div>
	  <Route exact={true} path="/" component={App}/>
	  <Route path="/signin" component={SignInPage} />
	</div>
);
