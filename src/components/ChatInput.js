import * as React from 'react';

class ChatInput extends React.Component {
  static propTypes = {
    currentConvo: React.PropTypes.string,
    sendMessage: React.PropTypes.func,
    updateAttr: React.PropTypes.func,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.currentConvo) {

      const message = this.refs.txtMessage.value;
      if ( message.length === 0 ) { return; }
      
      const messageObj = {
        sessionID: this.props.currentConvo,
        body: message,
        createdAt: new Date().valueOf(),
      };
      this.props.sendMessage(messageObj);
    }
    this.refs.txtMessage.value = '';
    this.refs.txtMessage.focus();
    
  };

  render() {
    const { props, onSubmit } = this;

    return (
      <footer className='teal'>
        <form className="container" onSubmit={ onSubmit }>
          <div className="row">
            <div className="input-field col s10">
              <i className="prefix mdi-communication-chat" />
              <input ref="txtMessage" type="text" placeholder="Type your message" />
            </div>
            <div className="input-field col s2">
              <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    );
  }
}

export default ChatInput;