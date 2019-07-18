import React, {Component} from 'react';
import styled from "styled-components";
import Breadcrumb from "../components/Breadcrumb";
import {connect} from "react-redux";
import {ButtonRed, ButtonWhite, InputTextRow, MessageError, MiniLoader, PopMessage} from "../Utility";
import axios from 'axios';
import ItemAccountVerificator from "../components/ItemAccountVerificator";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import AccountVerificator from "../components/AccountVerificator";
import CompNavigationBar from "../components/CompNavigationBar";
import {Redirect} from 'react-router-dom';
import UserVerificator from "../UserVerificator";
const myAxios = new axios.create({validateStatus:false});

const ProfileContainer = styled('div')`
	@media only screen and (max-width: 991px){
		width: 90%;
		border: none;
	}
	border-radius: 2px;
	border: 0.5px grey solid;
	width: 70%;
	margin:40px auto;
`
const Title= styled('div')`
	@media only screen and (max-width: 991px){
		background-color: white;
	}
	background-color: rgba(113, 235, 164, 0.1);
	width: 100%;
	color: black;
	font-weight: bold;
	font-size: 20px;
	border-bottom: 1px black solid;
`
const ImageContainer = styled('div')`
	${'img'}{
		height: 100%;
		width: 100%;
		margin: 0 auto;
	}
	width: 200px;
	height: 200px;
	border-radius: 100%;
	margin:40px auto;
	border: 1px rgba(0,0,0,0.5) solid;
	overflow: hidden;
`

const Form = styled('form')`
	width: 80%;
	margin: 0 auto;
`
const File = styled('div')`
	margin:  0 auto;	
	${'input'}{
		background-color: white;
		color: #27ad27;
		border: 1px #27ad27 solid;
		border-radius: 5px;
	}
	display: flex;
	justify-content: center;
`
const Verification = styled('div')`
	
`
class EditProfilePage extends Component {

	state = {
		user :null,
		name :'',
		username :'',
		email:'',
		phone:'',
		image:null,
		errorName:'',
		errorEmail:'',
		errorPhone:'',
		errorImage:'',
		errorUsername:'',
		loader :false,
		popMessage:false,
		valid:false,
		messsage :'',
		password:'',
		newPassword:'',
		confPassword:'',
		errorPassword:'',
		errorNewPassword:'',
		errorConfPassword:'',
		loaderPassword:false
	}

	initial(){
		if(this.props.user){
			this.setState({name:this.props.user.name});
			this.setState({email: this.props.user.email});
			this.setState({phone: this.props.user.phone});
			this.setState({username: this.props.user.username});
		}

	}

	handleEmail(event) {
		this.setState({email: event.target.value});
	}

	handleName(event){
		this.setState({name: event.target.value});
	}

	handleUsername(event){
		this.setState({username: event.target.value});
	}

	handlePhone(event){
		this.setState({phone: event.target.value});
	}
	handlePassword(event){
		this.setState({password: event.target.value});
	}
	handleNewPassword(event){
		this.setState({newPassword: event.target.value});
	}
	handleConfPassword(event){
		this.setState({confPassword: event.target.value});
	}
	handleImage(event){
		this.setState({errorImage:''});

		if(event.target.files[0].type != 'image/jpeg') {
			this.setState({errorImage: 'File harus berupa image/jpeg'});
			return;
		}
		this.setState({image:event.target.files[0]});
	}

	disablePopMessage(){
		this.setState({popMessage:false});
	}

	validate(){
		this.setState({errorEmail:'',errorPassword:'',errorName:'',errorPhone:'',errorUsername:''})
		let name = this.state.name;
		let email = this.state.email;

		if(name.trim() == ''){
			this.setState({errorName:'Nama tidak boleh kosong'});
			return false;
		}
		if(email.trim() === ''){
			this.setState({errorEmail : "Email tidak boleh kosong"});
			return false;
		}
		return true;
	}

	finishValid(response){
		this.setState({message:response.data.message});
		this.setState({valid:true,loader:false,popMessage:true});
		window.location.reload();
	}
	finishInvalid(response){
		this.setState({errorEmail:'',errorImage:'',errorName:'',errorPhone:''});
		this.setState({message:response.data.message});
		this.setState({valid:false,loader:false,popMessage:true});
		this.setState({errorEmail : response.data.errors.email});
		this.setState({errorImage : response.data.errors.image});
		this.setState({errorName : response.data.errors.name});
		this.setState({errorPhone : response.data.errors.phone});
	}
	finishInvalidPassword(response){
		this.setState({errorPassword:response.data.message,loaderPassword:false});
	}

	formSubmit(event){
		event.preventDefault();
		if(!this.validate()) return;
		this.setState({loader:true});
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}

		let payload = new FormData();
		payload.append('token',JSON.parse(sessionStorage.getItem('credentials')));
		payload.append('name' ,this.state.name);
		payload.append('username' ,this.state.username);
		payload.append('email' ,this.state.email);
		payload.append('phone' ,this.state.phone);
		payload.append('image' ,this.state.image);
		console.log(this.state.image);
		myAxios.post('http://127.0.0.1:8000/updateProfile',payload,config)
			.then((response)=>{
				if(response.data.message == 'Success'){
					this.finishValid(response);
				}else{
					this.finishInvalidPassword(response);
				}
			})
			.catch((error)=>{
				console.log(error.response)
			});
	}

	componentWillUpdate(nextProps, nextState, nextContext) {
		if(this.props !== nextProps){
			this.initial();
		}
	}

	validatePassword(){
		this.setState({errorPassword:'',errorNewPassword:'',errorConfPassword:''});
		let password = this.state.password;
		let newPassword = this.state.newPassword;
		let confPassword = this.state.confPassword;

		if( password.trim() === ''){
			this.setState({errorPassword:"Password cannot be empty"});
			return false;
		}

		if( newPassword.trim() === ''){
			this.setState({errorNewPassword:"New Password cannot be empty"});
			return false;
		}

		if(password.length < 8){
			this.setState({errorPassword:"Password must contain 8 characters"});
			return false;
		}
		if(newPassword != confPassword){
			this.setState({erroNewPassword:"Password and Confirmation Password are not same"});
			this.setState({errorConfPassword:"Password and Confirmation Password are not same"});
			return false;
		}
		return true;
	}
	changePassword(event){
		event.preventDefault();
		if(!this.validatePassword())return;
		this.setState({loaderPassword:true});
		let payload = {
			token : JSON.parse(sessionStorage.getItem('credentials')),
			password :this.state.password,
			newPassword : btoa(this.state.newPassword),
			password_confirmation : btoa(this.state.confPassword)
		}
		myAxios.post('http://127.0.0.1:8000/changePassword',payload).then((response)=>{
			if(response.data.message == 'Success'){
				this.finishValid(response)
			}else{
				this.finishInvalidPassword(response);
			}
		}).catch((error)=>{
			console.log(error)
		})
	}
	handleAuthorization(){
		if(this.props.user && this.props.user.type == 3){
			return <Redirect to={"/"}/>
		}
	}
	render() {
		return (
			<React.Fragment>
				<UserVerificator loged={true} specialRole={true}/>
				{this.props.user && this.handleAuthorization()}
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}></div>
				<Breadcrumb/>
			<ProfileContainer>
				<Title>Data Pribadi</Title>
				<ImageContainer>
					{
						this.props.user &&
						<img src={"http://localhost:8000/"+this.props.user.picture_id} alt="Image Not Found"/>
					}
				</ImageContainer>
				{this.props.user &&
				<Form onSubmit={(event)=>this.formSubmit(event)}>
					<File>
						<input type="file" name='imageProfile' onChange={(event)=>this.handleImage(event)} />
						<MessageError errorMessage={this.state.errorImage} />
					</File>
					<MiniLoader visibility={this.state.loader}/>
					<InputTextRow>
						Nama Lengkap <span style={{color: 'red'}}>*</span>
						<input type="text" value={this.state.name} autoFocus={true} onChange={(event)=>this.handleName(event)}/>
						<MessageError errorMessage={this.state.errorName} />
					</InputTextRow>
					<InputTextRow>
						Username
						<input type="text" value={this.state.username} onChange={(event)=>this.handleUsername(event)}/>
						<MessageError errorMessage={this.state.errorUsername} />
					</InputTextRow>
					<InputTextRow>
						Email <span style={{color: 'red'}}>*</span>
						<input type="email" value={this.state.email} onChange={(event)=>this.handleEmail(event)}/>
						<MessageError errorMessage={this.state.errorEmail} />
					</InputTextRow>
					<InputTextRow>
						Phone
						<input type="number" value={this.state.phone} onChange={(event)=>this.handlePhone(event)}/>
						<MessageError errorMessage={this.state.errorPhone} />
					</InputTextRow>
					<Verification>
						<AccountVerificator/>
					</Verification>
					<div style={{display:'flex', justifyContent:'flex-end' }}>
						<ButtonWhite type='submit'> Simpan </ButtonWhite>
					</div>
				</Form>
				}
			</ProfileContainer>
				<ProfileContainer>
					<Title>Update Password</Title>
					<Form onSubmit={(event)=>this.changePassword(event)}>
						<MiniLoader visibility={this.state.loaderPassword}/>
						<InputTextRow>
							Current Password <span style={{color: 'red'}}>*</span>
							<input type="password" onChange={(event)=>this.handlePassword(event)}/>
							<MessageError errorMessage={this.state.errorPassword} />
						</InputTextRow>
						<InputTextRow>
							New Password <span style={{color: 'red'}}>*</span>
							<input type="password" onChange={(event)=>this.handleNewPassword(event)}/>
							<MessageError errorMessage={this.state.errorNewPassword} />
						</InputTextRow>
						<InputTextRow>
							Confirmation Password <span style={{color: 'red'}}>*</span>
							<input type="password" onChange={(event)=>this.handleConfPassword(event)}/>
							<MessageError errorMessage={this.state.errorConfPassword} />
						</InputTextRow>
						<div style={{display:'flex', justifyContent:'flex-end' }}>
							<ButtonWhite type='submit'> Simpan </ButtonWhite>
						</div>
					</Form>
				</ProfileContainer>
			</React.Fragment>
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
export default connect(MapStateToProps,MapDispatchToProps)(EditProfilePage);