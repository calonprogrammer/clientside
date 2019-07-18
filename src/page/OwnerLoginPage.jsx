import React, {Component} from 'react';
import {ButtonOrange, GreenFontHover, MessageError, PopMessage} from "../Utility";
import styled from 'styled-components';
import axios from 'axios';
import {connect} from "react-redux";
import UserVerificator from "../UserVerificator";
const myAxios = new axios.create({validateStatus:false});

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
  margin-top: 100px;
  color: #282c34;
`

const InputText = styled('div')`
   &:focus-within{
    color: #27ab27;
   }
  ${'input'}{
    &:focus{  
      border-bottom: solid 2px #27ad27;
    }
    &::-webkit-inner-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
    }
    font-family: Calibri;
    border: none;
    outline: 0;
    border-bottom: solid 2px grey;
    width: 100%;
    font-size: 20px;
    padding-left:10px;
      
  }
  font-size: 20px;
`

class OwnerLoginPage extends Component {
	state={
		phone :'',
		password:'',
		errorPhone:'',
		errorPassword:'',
		popMessage:false,
		message:'',
		valid:false,
		token:null
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.user)window.location.href = '/';
	}
	validate(){
		this.setState({errorPhone:'',errorPassword:''})
		let phone = this.state.phone;
		let password = this.state.password;
		if(phone.trim() === ''){
			this.setState({errorPhone : "Phone cannot be null"});
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
		return true;
	}
	handlePhone(event) {
		this.setState({phone: event.target.value});
	}
	handlePassword(event){
		this.setState({password:event.target.value});
	}

	finishValid(){
		if(this.state.message){
			this.setState({valid:true});
			this.setState({loader:false, popMessage:true});
			if(this.state.token != null) {
				this.setState({loader:false, popMessage:true});
				window.location.href = "/owner-page";
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
		if(!this.validate()) return;
		var payload = {
			"phone" : this.state.phone,
			"password" : this.state.password
		}
		this.setState({loader:true});
		await myAxios.post("http://127.0.0.1:8000/ownerLogin",payload).then(
			(response)=>{
				this.setState({message:response.data.message,token:response.data.token},
					()=>response.data.token?
						sessionStorage.setItem('credentials',JSON.stringify(response.data.token)):console.log('null'));
			}
		).catch((err)=>{
				if(err.response.data.message){
					this.setState({message:err.response.data.message})
				}else{
					this.setState({errorPhone : err.response.data.errors.phone});
					this.setState({errorPassword : err.response.data.errors.password});
				}
			}
		)
		if(this.state.token != null){
			this.finishValid();
			return;
		}
		this.finishInvalid();
	}

	disablePopMessage(){
		this.setState({popMessage:false});
	}

	render() {
		return (
			<Container>
				<UserVerificator notLoged={true}/>
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
				<Leftside>
					<GreenFontHover><a href="/">&lt;Kembali ke Beranda </a></GreenFontHover>
					<LeftInside onSubmit={()=>this.login()}>
						<img src="/assets/mamikos_header_logo_default.svg" alt=""/>
						<span><h1>Login</h1></span>
						<span>Pemilik Kos</span>
						<br/>
						<br/>
						<InputText>
							No.Handphone
							<input type="number" autoFocus="true" onChange={(event)=>this.handlePhone(event)}/>
							<MessageError errorMessage={this.state.errorPhone}/>
						</InputText>
						<InputText>
							Password
							<input type="password" onChange={(event)=>this.handlePassword(event)}/>
							<MessageError errorMessage={this.state.errorPassword} />
						</InputText>
						<GreenFontHover><a href="">Lupa password?</a></GreenFontHover>
						<ButtonOrange onClick={(event)=>this.login(event)}>Login</ButtonOrange>
						<GreenFontHover>Belum punya akun? <a href="/ownerRegister">Yuk Daftar</a></GreenFontHover>
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
export default connect(MapStateToProps,MapDispatchToProps) (OwnerLoginPage);