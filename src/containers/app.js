import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { updateAttr, addMessage, newMessage, getHistory, getConvos, 
  selectConvo, addConvo } from '../actions';


function mapStateToProps(state) {
  return {
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
  };

  componentDidMount() {
    this.subscribeToChannel('admin', this.props.addConvo);
    this.props.getConvos();
    if( this.props.currentConvo ) {
      this.subscribeToChannel(this.props.currentConvo)
      this.getHistory();
    }
  }

  componentWillReceiveProps(props){
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
          subscribe_key: 'sub-c-cf1638ea-210f-11e8-97e5-2e7e45341bc1',
          publish_key: 'pub-c-6f9c68de-6653-4653-96fb-9b6565ec6b01',
          ssl: (location.protocol.toLowerCase() === 'https:'),
        });
      }
      this.PubNub.subscribe({
        channel: channel,
        message: f || this.props.addMessage,
      });
    }
  }

  // setCurrentConvo(convo) {
  //   console.log(this.props)
  //   this.props.selectConvo(convo.sessionID)
  // }

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