import * as React from 'react';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';
import Conversations from './Conversations';


class Layout extends React.Component {

	render() {
	    const { props } = this;
	    return (
	      <div className="container main">
	      	<div className="row teal header center">
      			<header className="title">
      				<div className="col s3">
      					<h5>Conversations</h5>
      				</div>
      				<div className="col s9">
      					<h5>Messages</h5>
      				</div>
      			</header>
	      	</div>
	        <div className="row">
	          <div className="col s3 convos">
	            <Conversations convos={ props.convos } setCurrentConvo={ props.setCurrentConvo }
	            	getHistory={ props.getHistory } />
	          </div>
	          <div className="col s9 current">
	          	<div className='row'>
	          		<div className="col s12">
			            <ChatHistory history={ props.history } />
			            <ChatInput currentConvo={ props.currentConvo }  
		              		updateAttr={ props.updateAttr } sendMessage={ props.sendMessage }
		              		detailsSubmitted={ props.detailsSubmitted }  />
	          		</div>
	          	</div>
          	  </div>
	        </div>
	      </div>
	    );
	}
}

export default Layout;