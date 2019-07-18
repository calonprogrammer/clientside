import React, {Component, Fragment} from 'react';
import CompNavigationBar from "../components/CompNavigationBar";
import styled from 'styled-components';
import Breadcrumb from "../components/Breadcrumb";
import {ButtonWhite} from "../Utility";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {setReceive,socket} from "../Api";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import axios from 'axios';

const Container = styled('div')`
	margin: 0 auto;
	width: 80%;
	height: 90vh;
	background-color: honeydew;
`;
const ChatContent = styled('div')`
	overflow-y: auto;
	height: 80vh;
	width: 100%;
	margin: 0 auto;
	background-color: white;
	border: 1px solid black;
`;
const InputContainer = styled('form')`
	${'input'}{
		border: none;
		border-bottom: 1px black solid;
		background-color: whitesmoke;
		height: 30px;
		color: #27ad27;
		font-size: 25px;
		text-align: center;
	}
	text-align: center;
	width: 100%;
	margin: 0 auto;
	background-color: beige;
	
`;
const Bubble = styled('div')`
	${'#message'}{
		width: 50%;
		border-radius: 10px;
		position: absolute;
	}
	margin: 20px;
	position: relative;
	height: 50px;	
	color: white;
	font-size: 20px;
	line-height: 50px;
	text-align: center;
	
`;

class ChatContainer extends Component {
	constructor(){
		super();
		setReceive(this.receive.bind(this));
	}

	state = {
		chat :[],
		dataChat : []
	};
	componentWillMount() {
		this.fetchChat();
	}

	send(event){
		event.preventDefault();
		let message = event.target.elements['chat'].value;
		socket.emit('newMessage',this.props.match.params.toId,this.props.user.id,message);
		let payload = new FormData();
		payload.append('channel_id',this.props.match.params.channelId);
		payload.append('sender',this.props.user.id);
		payload.append('receiver',this.props.match.params.toId);
		payload.append('message',message);
		axios.post(`http://127.0.0.1:8000/sendChat`,payload).then((response)=>{
			console.log(response.data);
		}).catch((error)=>{
			console.log(error);
		});
		this.setState({chat:
			this.state.chat.concat(
				<Bubble>
					<div id={'message'} style={{backgroundColor: '#4251f5', right: '0'}}>
						{message}
					</div>
				</Bubble>
			)});
		event.target.elements['chat'].value = '';
	}

	fetchChat(){
		let payload = new FormData()
		payload.append('channel_id',this.props.match.params.channelId);
		axios.post(`http://127.0.0.1:8000/getChat`,payload).then((response)=>{
				this.setState({dataChat: response.data.chat},()=>this.pushChat());
			}).catch((error)=>{
				console.log(error)
		});
	}

	pushChat(){
		console.log(this.state.dataChat);
		this.state.dataChat.map((key)=>{
			this.state.chat.push(
						key.sender != this.props.match.params.toId ?
							<Bubble>
								<div id={'message'} style={{backgroundColor:'#4251f5',right:'0'}}>
									{key.message}
								</div>
							</Bubble>:
							<Bubble>
								<div id={'message'} style={{backgroundColor:'#2cf50c',left:'0'}}>
									{key.message}
								</div>
							</Bubble>
				)
		});
	}
	receive(message){
		this.setState({
			chat:this.state.chat.concat(
				<Bubble>
					<div id={'message'} style={{backgroundColor: '#2cf50c', left: '0'}}>
						{message}
					</div>
				</Bubble>
			)
		})
	};

	render() {
		return (
			<Fragment>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}/>
				<Breadcrumb/>
				<Container>
					<ChatContent>
						{this.state.chat}
					</ChatContent>
					<InputContainer onSubmit={(event)=>this.send(event)}>
						<input type="text" name={'chat'} />
						<ButtonWhite type={'submit'}><FontAwesomeIcon icon={faArrowUp}/></ButtonWhite>
					</InputContainer>
				</Container>
			</Fragment>
		);
	}
}
const MapStateToProps = state => {
	return{
		user:state.user,
		coords:state.coords
	}
};
const MapDispatchToProps = dispatch =>{
	return{
		update_user : key =>dispatch({
			type:"update_user",
			value:key
		}),
		update_coords: key=>dispatch({
			type :"update_coords",
			value:key
		})
	}
};
export default withRouter(connect(MapStateToProps,MapDispatchToProps)(ChatContainer));