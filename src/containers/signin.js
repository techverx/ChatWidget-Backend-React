import * as React from 'react';
import { connect } from 'react-redux'
import { signInUser } from '../utils/token-auth';
import SignIn from '../components/SignIn';
import { updateAttr } from '../actions';
import { push } from 'react-router-redux'

function mapStateToProps(state) {
  return {
    user: state.user.get('user').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signin: (user) => dispatch(signInUser(user)),
    updateAttr: (user) => dispatch(updateAttr(user)),
    redirectToConvo: (path) => dispatch(push('/')),
  };
}

class SignInPage extends React.Component {

	static propTypes = {
	    user: React.PropTypes.object,
	};

	render() {
		const { props } = this;
		return (
		  <SignIn user={ props.user } signin={ props.signin } updateAttr={ props.updateAttr }
		   redirectToConvo={ props.redirectToConvo }/>
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInPage);