import React from 'react';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';
class App extends React.Component {
  state = {
    userID: Math.round(Math.random() * 1000000).toString(),
    history: [],
  };

  sendMessage = (message) => {
    // for now this will let us know things work.  `console` will give us a
    // warning though
    console.log('sendMessage', message);
  }

  render() {
    return (
      <div>
        <ChatHistory history={ state.history } />
        <ChatInput userID={ state.userID } sendMessage={ sendMessage } />
      </div>
    );
  }
}

export default App;
