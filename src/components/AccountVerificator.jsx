import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import ItemAccountVerificator from "./ItemAccountVerificator";
import axios from 'axios';
import {MessageError} from "../Utility";
const Container = styled('div')`
	border-radius: 2px;
	border: 0.5px grey solid;
	
`
const Title= styled('div')`
	background-color: rgba(113, 235, 164, 0.1);
	width: 100%;
	color: black;
	font-weight: bold;
	font-size: 20px;
	border-bottom: 1px black solid;
`

class AccountVerificator extends Component {

	emailVerification(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.post('http://127.0.0.1:8000/emailVerification',null,config).then((response)=>{
			console.log(response)
		}).catch((error)=>{
			console.log(error)
		});
	}

	phoneVerification(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.post('http://127.0.0.1:8000/phoneVerification',null,config).then((response)=>{
			console.log(response)
		}).catch((error)=>{
			console.log(error)
		});
	}
	render() {
		return (
			<Container>
				<Title>Email and Phone</Title>
				{this.props.user&&<ItemAccountVerificator icon={faEnvelope} value={this.props.user.email} click={()=>this.emailVerification()}name="Email" statusVerified={this.props.user.email_verified_at?true:false}/>}
				{this.props.user && <ItemAccountVerificator icon={faPhone} value={this.props.user.phone} click={()=>this.phoneVerification()} name="Nomor Handphone" statusVerified={this.props.user.phone_verified_at?true:false}/>}
			</Container>
		);
	}
}

const MapStateToProps = state => {
	return{
		user:state.user,
		coords:state.coords
	}
}
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
}

export default connect(MapStateToProps,MapDispatchToProps)(AccountVerificator);