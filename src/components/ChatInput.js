import * as React from 'react';
export default class ChatInput extends React.Component {
	    static propTypes = {
      userID: React.PropTypes.string,
      sendMessage: React.PropTypes.func,
    };
  render() {
    return (<footer className="teal">
      <form className="container">
        <div className="row">
          <div className="input-field col s10">
            <i className="prefix mdi-communication-chat" />
            <input type="text" placeholder="Type your message" />
          </div>
          <div className="input-field col s2">
            <button type="submit" className="waves-effect waves-light btn-floating btn-large">
              <i className="mdi-content-send" />
            </button>
          </div>
        </div>
      </form>
    </footer>);
  }
}