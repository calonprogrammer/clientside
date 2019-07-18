import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {ButtonOrange, GreenFontHover, InputText, MessageError, PopMessage} from "../Utility";
import {connect} from "react-redux";
import UserVerificator from "../UserVerificator";

const myAxios = new axios.create({validateStatus:false});

const Container = styled('div')`
 width: 100%;
 display: flex;
 justify-content: center;
`;
const Leftside = styled('form')`
   ${'a'}{
    &:hover{
      text-decoration: underline #27ab27;
    }  
    font-size: 20px;
    text-decoration: none;
    color:#27ab27;
   }
   box-sizing: border-box;
   width: 100%;
   padding: 2% 8%;
`;
const Rightside = styled('div')`
  ${'img'}{
    width: 100%;
    height: 100%;
  }
  display: flex;
  justify-content:center ;
  align-items: center;
  width: 100%;
  padding: 5%;
  background-color:#27ab27 ;
  @media only screen and (max-width: 991px){
    display: none;
  }
`;
const LeftInside = styled('div')`
  ${'img'}{
    height: 50px;
  } 
  ${'h1'}{
    margin: 0;
  }
  ${'p'}{
    text-align: right;
  }
  ${'a'}{
    color: grey;
    font-size: 15px;
  }
  margin-top: 20px;
  color: #282c34;
`;




class OwnerRegisterPage extends Component {
	state ={
		name: '',
		email: '',
		password: '',
		confPassword: '',
		phone: '',
		errorName:'',
		errorEmail:'',
		errorPassword:'',
		errorConfPassword:'',
		errorPhone:'',
		message: '',
		valid :false,
		popMessage:false
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.user)window.location.href = '/';
	}

	validate(){
		this.setState({errorEmail:'',errorPassword:'',errorName:'',errorConfPassword:'',errorPhone:''})
		let name = this.state.name;
		let email = this.state.email;
		let phone = this.state.phone;
		let password = this.state.password;
		let confPassword = this.state.confPassword;

		if(name.trim() === ''){
			this.setState({errorName: "Name cannot be null"});
			return false;
		}
		if(email.trim() === ''){
			this.setState({errorEmail : "Email cannot be null"});
			return false;
		}
		if( password.trim() === ''){
			this.setState({errorPassword:"Password cannot be null"});
			return false;
		}
		if(password.length < 8){
			this.setState({errorPassword:"Password must contain 8 characters"});
			return false;
		}
		if(password != confPassword){
			this.setState({errorPassword:"Password and Confirmation Password are not same"});
			this.setState({errorConfPassword:"Password and Confirmation Password are not same"});
			return false;
		}
		if(phone.trim() == ''){
			this.setState({errorPhone:"Phone cannot be null"});
			return false;
		}
		return true;
	}
	async register(event) {
		event.preventDefault();
		if(!this.validate())return;
		var payload = {
			"name": this.state.name,
			"email" : this.state.email,
			"password" : btoa(this.state.password),
			"phone" : this.state.phone
		}
		await myAxios.post('http://127.0.0.1:8000/ownerRegister',payload).
		then((response)=> {
			this.setState({message:response.data.message})
			this.setState({errorName:response.data.errors.name})
			this.setState({errorEmail:response.data.errors.email})
			this.setState({errorPassword:response.data.errors.password})
			this.setState({errorPhone :response.data.errors.phone})
			}).catch((err)=>{
				console.log(err.response)
		});

		if(this.state.message == 'Success'){
			this.finishValid();
			return;
		}
		this.finishInvalid();
	}

	finishValid(){
		this.setState({valid:true});
		if(this.state.message){
			this.setState({loader:false, popMessage :true});
			window.location.href = '/ownerLogin';
		}
	}

	finishInvalid(){
		this.setState({valid:false});
		if(this.state.message)this.setState({loader:false, popMessage :true});
	}

	handleName(event) {
		this.setState({name: event.target.value});
	}

	handleEmail(event) {
		this.setState({email: event.target.value});
	}

	handlePassword(event) {
		this.setState({password: event.target.value});
	}

	handleConfPassword(event) {
		this.setState({confPassword: event.target.value});
	}
	handlePhone(event) {
		this.setState({phone: event.target.value});
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}
	render() {
		return (
			<Container>
				<UserVerificator notLoged={true}/>
				<PopMessage visibility={this.state.popMessage} message={this.state.message} valid={this.state.valid}  click={()=>this.disablePopMessage()}/>
				<Leftside onSubmit={(event)=>this.register(event)}>
					<a href="/">&lt;Kembali ke Beranda </a>
					<LeftInside >
						<img src="/assets/mamikos_header_logo_default.svg" alt=""/>
						<span><h1>Pasang Iklan</h1></span>
						<span>Saya ingin memasang iklan</span>
						<br/>
						<InputText>
							FullName
							<input type="text" name="name" value={this.state.name}
							       onChange={(event) => this.handleName(event)} autoFocus="true"/>
							       <MessageError errorMessage={this.state.errorName}/>
						</InputText>
						<InputText>
							Email
							<input type="email" name="email" value={this.state.email}
							       onChange={(event) => this.handleEmail(event)}/>
							<MessageError errorMessage={this.state.errorEmail}/>
						</InputText>
						<InputText>
							Password
							<input type="password" name="password" value={this.state.password}
							       onChange={(event) => this.handlePassword(event)}/>
							<MessageError errorMessage={this.state.errorPassword}/>
						</InputText>
						<InputText>
							Confirm Password
							<input type="password" name="confPassword" value={this.state.confPassword}
							       onChange={(event) => this.handleConfPassword(event)}/>
							<MessageError errorMessage={this.state.errorConfPassword}/>
						</InputText>
						<InputText>
							No.Handphone
							<input type="number" name="phone" value={this.state.phone} onChange={
								(event)=>this.handlePhone(event)}/>
							<MessageError errorMessage={this.state.errorPhone}/>
						</InputText>
						<ButtonOrange onClick={(event)=>this.register(event)}>PASANG IKLAN</ButtonOrange>
						<GreenFontHover>Sudah punya akun? <a href="/ownerLogin">Login Disini</a></GreenFontHover>
					</LeftInside>
				</Leftside>
				<Rightside>
					<img src="/assets/Illustration-slide-2.svg" alt=""/>
				</Rightside>
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
export default connect(MapStateToProps,MapDispatchToProps)(OwnerRegisterPage);