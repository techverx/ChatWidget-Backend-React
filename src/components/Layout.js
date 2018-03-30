import * as React from 'react';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';
import Conversations from './Conversations';
import SignIn from './SignIn';


class Layout extends React.Component {

	render() {
	    const { props } = this;
	    const { currentUser } = props;
	    if (currentUser.isLoading) {
	    	return <div className="container main teal valign-wrapper loader">
		    	<div className="sk-three-bounce valign center-align">
			        <div className="sk-child sk-bounce1"></div>
			        <div className="sk-child sk-bounce2"></div>
			        <div className="sk-child sk-bounce3"></div>
		      	</div>
	      	</div>

	    } else if(currentUser.isSignedIn) {
		    return (
		      <div className="container main">
		      	<div className="row teal header center">
	      			<header className="title">
	      				<div className="col s3">
	      					<h5>Conversations</h5>
	      				</div>
	      				<div className="col s8">
	      					<h5>Messages</h5>
	      				</div>
	      				<div className="col s1">
	      					<nav>
							    <div className="nav-wrapper">
								    <ul id="nav-mobile" >
								    	<li><a onClick={ props.signOut }>SignOut</a></li>
								    </ul>
							    </div>
							</nav>
	      				</div>
	      			</header>
		      	</div>
		        <div className="row">
		          <div className="col s6 m3 convos">
		            <Conversations convos={ props.convos } setCurrentConvo={ props.setCurrentConvo }
		            	getHistory={ props.getHistory } />
		          </div>
		          <div className="col s6 m9 current">
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

	    } else {
	    	return (
	    		<SignIn user={ props.user } signin={ props.signin } updateAttr={ props.updateAttr }
	    			   redirectToConvo={ props.redirectToConvo }/>
	    	);
	    }
	}
}

export default Layout;