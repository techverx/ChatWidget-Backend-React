import * as React from 'react';

class ChatHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
  };

  humanizedDate = (message) => {
    let messageDate = new Date(message.createdAt);
    let messageDateTime = messageDate.toLocaleDateString() +
            ' at ' + messageDate.toLocaleTimeString();
  }

  render() {
    const { props } = this;
    return (
      <ul className="collection">
        { props.history.map((messageObj, i) => {
          const messageDate = new Date(messageObj.createdAt);
          const messageDateTime = messageDate.toLocaleTimeString();
          return (
            <li className="item-wrapper" key={ i }>
              <div className="collection-item avatar message">
                <span className="user-title">{messageObj.name}</span>
                  &nbsp;
                  <i className="prefix mdi-action-alarm" />
                  <span className="user-title">{messageDateTime}</span>
                  <p>
                    <span>{ messageObj.body }</span>
                  </p>
              </div>
            </li>
          );
        }) }
      </ul>
    );
  }
}

export default ChatHistory;
