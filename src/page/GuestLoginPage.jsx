import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {ButtonOrange, GreenFontHover, InputText, MessageError, MiniLoader, PopMessage} from "../Utility";
import axios from 'axios';
import {connect} from "react-redux";
import UserVerificator from "../UserVerificator";
const myAxios = new axios.create({validatesettings:false});
const Container = styled('div')`
  width: 100%;
   display: flex;
   justify-content: center;
   height: 100vh;
`;
const Leftside = styled('form')`
   
   box-sizing: border-box;
   width: 100%;
   padding: 2% 8%;
`
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
  color: #282c34;
`
const Rightside = styled('div')`
  ${'img'}{
    width: 100%;
    height: 100%;
  }
  display: flex;
  justify-content:center ;
  align-items: center;
  width: 100%;
  background-color:#27ab27 ;
  @media only screen and (max-width: 991px){
    display: none;
  }
`
class GuestLoginPage extends Component {
	state = {
		token:null,
		email:'',
		password:'',
		errorEmail:'',
		message:'',
		errorPassword:'',
		loader : false,
		popMessage : false,
		valid :false
	};

	disablePopMessage(){
		this.setState({popMessage:false});
	}
	handleEmail(event) {
		this.setState({email: event.target.value});
	}
	handlePassword(event){
		this.setState({password:event.target.value});
	}
	validate(){
		this.setState({errorEmail:'',errorPassword:''})
		let email = this.state.email;
		let password = this.state.password;
		if(email.trim() === ''){
			this.setState({errorEmail : "Email tidak boleh kosong"});
			return false;
		}
		if( password.trim() === ''){
			this.setState({errorPassword:"Password tidak boleh kosong"});
			return false;
		}
		if(password.length < 8){
			this.setState({errorPassword:"Password harus mengandung minimal 8 karakter"});
			return false;
		}
		return true;
	}

	finishValid(){
		if(this.state.message){
			this.setState({valid:true});
			this.setState({loader:false, popMessage:true});
			if(this.state.token != null) {
				this.setState({loader:false, popMessage:true});
				window.location.href = "/";
			}
		}
	}

	finishInvalid(){
		this.setState({valid:false});
		if(this.state.message) {
			this.setState({loader: false, popMessage: true});
		}
	}

	async login(event) {
		event.preventDefault();

		let validate = this.validate();
		if(!validate) return;
		let payload = {
			"email" : this.state.email,
			"password" : this.state.password
		}
		this.setState({loader:true});
		await myAxios.post("http://127.0.0.1:8000/guestLogin",payload).then(
			(response)=>{
				this.setState({message:response.data.message,token:response.data.token},
					()=>response.data.token?
						sessionStorage.setItem('credentials',JSON.stringify(response.data.token)):console.log('null'));

			}
		).catch((error)=> {
				if (error.response.data.message) {
					this.setState({message: error.response.data.message})
				} else {
					this.setState({errorPhone: error.response.data.errors.phone});
					this.setState({errorPassword: error.response.data.errors.password});
				}
			}
		)
		if(this.state.token != null){

			this.finishValid();
			return;
		}
		this.finishInvalid();
	}

	render() {
		return (
			<Container>
				<UserVerificator notLoged={true}/>
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
				<Leftside>
					<GreenFontHover><a href="/">&lt;Kembali ke Beranda </a></GreenFontHover>
					<LeftInside onSubmit={(event)=>this.login(event)}>
						<img src="/assets/mamikos_header_logo_default.svg" alt=""/>
						<span><h1>Login</h1></span>
						<span>Pencari</span>
						<br/>
						<br/>
						<InputText>
							Email
							<input type="email" autoFocus={true} onChange={(event)=>this.handleEmail(event)}/>
							<MessageError errorMessage={this.state.errorEmail}/>
						</InputText>
						<InputText>
							Password
							<input type="password" onChange={(event)=>this.handlePassword(event)}/>
							<MessageError errorMessage={this.state.errorPassword}/>
						</InputText>
						<GreenFontHover><a href="">Lupa password?</a></GreenFontHover>
						<MiniLoader visibility={this.state.loader}/>
						<ButtonOrange onClick={(event)=>this.login(event)}>Login</ButtonOrange>
						<GreenFontHover>Belum punya akun? <a href="/guestRegister">Yuk Daftar</a></GreenFontHover>
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
export default connect(MapStateToProps,MapDispatchToProps) (GuestLoginPage);