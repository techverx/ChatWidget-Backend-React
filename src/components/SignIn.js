import * as React from 'react';
import { connect } from 'react-redux'
// import { signInUser } from '../utils/token-auth';

class SignIn extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    let password = this.refs.txtPassword.value,
      email = this.refs.txtEmail.value;
    let redirectToConvo = this.props.redirectToConvo;
    this.props.signin({email, password});
  }


  render() {
    const { props, onSubmit } = this;
    return (
       <div className="container">
        <div className="row">
          <form onSubmit={ onSubmit }>
            <div className="col s6 offset-s3">
              <div className="row valign-wrapper cont">
                <div className="col s12">
                  <div className="card blue-grey darken-1 ">
                    <div className="card-content white-text">
                       <div className="row"> 
                          <div className="input-field col s12">
                            <input ref="txtEmail" id="icon_prefix" type="text" className="validate" />
                            <label htmlFor="icon_prefix">Email</label>
                          </div>
                          <div className="input-field col s12">
                            <input  ref="txtPassword" id="icon_telephone" type="password" className="validate" />
                            <label htmlFor="icon_telephone">Password</label>
                          </div>
                      </div>
                    </div>
                    <div className="card-action">
                      <button className="btn waves-effect waves-light" type="submit" name="action">
                        Submit
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
       
    );
  }
}

export default SignIn;
