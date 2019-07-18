import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import {withRouter} from 'react-router-dom';
import moment from "moment";


const Container = styled('div')`
	${'img'}{
		width: 200px;
		height: 100%;
	}
	${'#name'}{
		color: tomato;
		font-size: 20px;
	}
	${'#since'}{
		color: white;
		font-weight: bold;
		font-style: italic;
	}
	background-color: greenyellow;
	border-radius: 10px;
	&:hover{
	    box-shadow: 0px 2px 5px 2px #888888;
	    cursor: pointer;
	    transition: 0.2s;
  	}
  	width: 90%;
  	
  	margin: 20px auto;
  	display: flex;
  	justify-content: space-around;
  	align-items: center;
`

class Channel extends Component {

	gotoChat(id){
		this.props.history.push('/chat/'+this.props.chat.id+'/'+id);
	};

	render() {
		let chat = this.props.chat;
		return (
			<Fragment >
				{this.props.guest ?
					<Container onClick={(id)=>this.gotoChat(chat.owner.id)}>
						<div>
							<img src={'http://127.0.0.1:8000/' + chat.owner.picture_id} alt=""/>
						</div>
						<div id={'name'}>
							{chat.owner.name}
						</div>
						<div id={'since'}>
							Start Date : {moment(chat.created_at).format("dddd,D MMMM YYYY")}
						</div>
					</Container>:
					<Container onClick={(id)=>this.gotoChat(chat.guest.id)}>
						<div>
							<img src={'http://127.0.0.1:8000/' + chat.guest.picture_id} alt=""/>
						</div>
						<div id={'name'}>
							{chat.guest.name}
						</div>
						<div id={'since'}>
							Start Date : {moment(chat.created_at).format("dddd,D MMMM YYYY")}
						</div>
					</Container>
				}
			</Fragment>

		);
	}
}

export default withRouter(Channel);