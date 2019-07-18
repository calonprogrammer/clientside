import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import Loader from "./components/Loader";
import {withRouter} from 'react-router-dom';
class UserVerificator extends Component {

	state = {
		isLoading : true,
		loader : true,
		user: null
	}

	async componentDidMount() {
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		await axios.get( "http://127.0.0.1:8000/initial", config).then(
			(response)=>{
				this.setState({user:response.data.user});
				this.props.update_user(response.data.user)
				this.setState({isLoading: false},()=>this.checkRole())
			})
			.catch((err) => {
					console.log(err.response)
					this.setState({isLoading: false});
				}
			)
		;
	}
	checkRole(){
		if(this.props.role == null)return;
		if(this.props.role != this.props.user.type) window.location.href = '/';
	}

	handleLoading(){
		if(this.state.isLoading===true){
			return <Loader />
		}else{
			return null;
		}
	}
	authorized(){
		if(this.props.user == null)window.location.href = '/';
	}
	unauthorized(){
		if(this.props.user)window.location.href = '/';
	}
	specialRole(){
		if(this.props.role == 3) window.location.href = '/';
	}
	render() {
		return (
			<React.Fragment>
				{this.handleLoading()}
				{this.props.loged && this.authorized()}
				{this.props.notLoged && this.unauthorized()}
				{this.props.user && this.props.specialRole && this.specialRole()}
			</React.Fragment>
		);
	}
}
const MapStateToProps = state => {
	return{
		user:state.user
	}
}
const MapDispatchToProps = dispatch =>{
	return{
		update_user : key =>dispatch({
			type:"update_user",
			value:key
		})
	}
}

export default connect(MapStateToProps,MapDispatchToProps) (UserVerificator);