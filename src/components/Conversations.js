import * as React from 'react';

class Conversations extends React.Component {

	static propTypes = {
	    convos: React.PropTypes.array,
	    setCurrentConvo: React.PropTypes.func,
	};

	setCurrentConvo(convo) {
		this.props.setCurrentConvo(convo.sessionID)
	}

	renderConvos() {
		let convos = this.props.convos,
			setCurrentConvo = this.setCurrentConvo;
		if (convos.length > 0) {
			return (
				<ul className='collection'>
					{ convos.map((convo, i) => {
						let imgURL = '//robohash.org/' + convo.sessionID + '?set=set2&bgset=bg2&size=70x70';
						return (
							<li key={ convo.id } onClick={ setCurrentConvo.bind(this, convo) }
								className={ 'collection-item avatar' + (convo.unread ? ' unread' : '')}>

              					<img src={ imgURL } alt={ convo.name } className="circle" />
								<p><span>{ convo.name.toUpperCase() }</span></p>
							</li> 
						);
					})}
				</ul>
			);
		} else {
			return ( <div className="valign-wrapper note">
				<p className="valign center-align">No Conversations</p>
			</div>);
		}
	}

	render() {
	    return (
	      	<div className="wrapper">
	      		{ this.renderConvos() }
            </div>
	    );
	}
}

export default Conversations;