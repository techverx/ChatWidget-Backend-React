import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { updateAttr, addMessage, newMessage, getHistory, getConvos, 
  selectConvo, addConvo, logoutUser } from '../actions';
import { signInUser, signOutUser } from '../utils/token-auth';
import { PUBNUB_SUBSCRIBE_KEY, PUBNUB_PUBLISH_KEY } from '../constants';

function mapStateToProps(state) {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    history: state.app.get('messages').toJS(),
    message: state.app.get('message').toJS(),
    currentConvo: state.app.get('currentConvo'),
    convos: state.app.get('convos').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    addConvo: (convo) => dispatch(addConvo(convo)),
    newMessage: (message) => dispatch(newMessage(message)),
    selectConvo: (currentConvo) => dispatch(selectConvo(currentConvo)),
    getConvos: () => dispatch(getConvos()),
    getHistory: (sessionID) => dispatch(getHistory(sessionID)),
    signin: (user) => dispatch(signInUser(user)),
    signOut: (user) => dispatch(signOutUser()),
  };
}

class App extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    message: React.PropTypes.object,
    currentConvo: React.PropTypes.string,
    addMessage: React.PropTypes.func,
    newMessage: React.PropTypes.func,
    selectConvo: React.PropTypes.func,
    getConvos: React.PropTypes.func,
    getHistory: React.PropTypes.func,
    signin: React.PropTypes.func,
    signOut: React.PropTypes.func,
    currentUser: React.PropTypes.object,
  };

  componentDidMount() {
    this.subscribeToChannel('admin', this.props.addConvo);
    
    if( this.props.currentUser && this.props.currentUser.isSignedIn ) {
      this.props.getConvos();
    }

    if( this.props.currentConvo ) {
      this.subscribeToChannel(this.props.currentConvo)
      this.getHistory();
    }

    window.addEventListener('beforeunload', this.handleWindowUnload);
  }

  handleWindowUnload(ev){
    ev.preventDefault();
    // logoutUser();
    // return;
  }

  componentWillReceiveProps(props){
    if (!this.props.currentUser.isSignedIn && props.currentUser.isSignedIn) {
      this.props.getConvos();
    } 

    if ( props.currentConvo && props.currentConvo != undefined && 
      this.props.currentConvo != props.currentConvo ) {
      this.subscribeToChannel(props.currentConvo);
      props.getHistory(props.currentConvo);
    }
  }

  subscribeToChannel(sessionID, f=null) {
    if (sessionID) {
      let channel = 'HelpChat/' + sessionID.split('-').join('');
      if( !this.PubNub ) {
        this.PubNub = PUBNUB.init({
          subscribe_key: PUBNUB_SUBSCRIBE_KEY,
          publish_key: PUBNUB_PUBLISH_KEY,
          ssl: (location.protocol.toLowerCase() === 'https:'),
        });
      }
      this.PubNub.subscribe({
        channel: channel,
        message: f || this.props.addMessage,
      });
    }
  }

  getHistory() {
    this.props.getHistory(this.props.currentConvo);
  }

  render() {
    const { props, sendMessage, updateAttr, setCurrentConvo } = this;
    return (
      <Layout { ...props } sendMessage={ sendMessage } updateAttr={ updateAttr } 
      setCurrentConvo={ props.selectConvo } currentConvo={ props.currentConvo } />
    );
  }

  sendMessage = (message) => {
    // this.PubNub.publish({
    //   channel: 'HelpChat/' + message.sessionId,
    //   message: message,
    // });
    this.props.newMessage(message);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);