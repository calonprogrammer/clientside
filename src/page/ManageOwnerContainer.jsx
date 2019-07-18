import React, {Component} from 'react';
import axios from "axios";
import styled from "styled-components";
import {ButtonRed, ButtonWhite, ConfirmModal, PopMessage} from "../Utility";
import Loader from "../components/Loader";
import ViewUserContainer from "../container/ViewUserContainer";
import SearchBarContainer from "../container/SearchBarContainer";
import Breadcrumb from "../components/Breadcrumb";
const myAxios = new axios.create({validateStatus:false});

const Container = styled('div')`
	${'#update'}{
		margin: 0 auto;
	}
`
const CurrentPage = styled('div')`
	background-color: #27ad27;
	width: 50px;
	border-radius: 5px;
	color: white;
	font-size: 20px;
	text-align: center;
	line-height: 50px;	
`

class ManageOwnerContainer extends Component {
	state = {
		owners :null,
		isLoading :true,
		currentPage:'',
		lastPage:'',
		popModal :false,
		currentId:''
	}


	done(response){
		this.setState({owners:response.data.owner.data});
		this.setState({currentPage:response.data.owner.current_page,lastPage:response.data.owner.last_page});
		this.setState({isLoading:false});
	}

	componentWillMount() {
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		myAxios.get(`http://127.0.0.1:8000/admin/getAllOwner?token=${token}`).then((response) => {
			this.done(response)
		}).catch((error) => {
			console.log(error);
		})
	}

	ban(id){
		this.setState({currentId:id,popModal:true});
	}

	resetPassword(id){
		this.setState({currentId:id,popModalPassword:true});
	}

	disablePopMessage(){
		this.setState({popMessage:false});
	}

	next(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let currentPage = this.state.currentPage;
		let lastPage = this.state.lastPage;
		let i;
		if(currentPage < lastPage){
			i = currentPage+1;
		}else{
			i = lastPage;
		}
		myAxios.get(`http://127.0.0.1:8000/admin/getAllOwner?page=${i}&token=${token}`).then((response) => {
			this.done(response)
		}).catch((error) => {
			console.log(error);
		})
	}

	prev(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let currentPage = this.state.currentPage;
		let i;
		if(currentPage > 1){
			i = currentPage-1;
		}else{
			i = 1;
		}
		myAxios.get(`http://127.0.0.1:8000/admin/getAllOwner?page=${i}&token=${token}`).then((response) => {
			this.done(response)

		}).catch((error) => {
			console.log(error);
		})
	}
	agreeReset(id){
		this.setState({popModalPassword:false,isLoading: true,});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = {
			'id' : id
		}
		myAxios.post(`http://127.0.0.1:8000/admin/resetPassword?token=${token}`,payload).then((response)=>{
			this.setState({isLoading:false,message:response.data.message,valid: true},()=>{
				this.setState({popMessage:true})
			});
		}).catch((error)=>{
			this.setState({isLoading:false,message:error.response.data.message,valid: false},()=>this.setState({popMessage:true}));
		})
	}

	agreeBan(id){
		this.setState({popModal:false,isLoading: true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = {
			'id' : id
		}
		myAxios.post(`http://127.0.0.1:8000/admin/banUser?token=${token}`,payload).then((response)=>{
			this.setState({isLoading:false,message:response.data.message,valid: true},()=>{
				this.setState({popMessage:true})
			});
		}).catch((error)=>{
			this.setState({isLoading:false,message:error.response.data.message,valid: false},()=>this.setState({popMessage:true}));
		});
	}
	search(value){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config={
			Authorization : 'Bearer ' + token
		}
		myAxios.get(`http://127.0.0.1:8000/admin/searchOwner?token=${token}&key=${value}`).then((response)=>{
			this.setState({owners:response.data});
		}).catch((error)=>{
			console.log(error)
		});
	}
	render() {
		return (
			<Container>
				<ConfirmModal  action={'Ban'} visibility={this.state.popModal} agree={(id)=>this.agreeBan(this.state.currentId)} cancel={()=>this.setState({popModal:false})}/>
				<ConfirmModal  action={'Reset Password'} visibility={this.state.popModalPassword} agree={(id)=>this.agreeReset(this.state.currentId)} cancel={()=>this.setState({popModalPassword:false})}/>
				<SearchBarContainer search={(value)=>this.search(value)}/>
				{this.state.isLoading && <Loader />}
				{this.state.owners &&
				<ViewUserContainer users={this.state.owners} ban={(id)=>this.ban(id)} resetPassword={(id)=>this.resetPassword(id)} />}
				<PopMessage click={()=>this.disablePopMessage()} message={this.state.message} valid={this.state.valid} visibility={this.state.popMessage} />
				<div style={{background:'whitesmoke',margin:'0 auto', width:'50%',display:'flex',justifyContent:'space-between'}}>
					<ButtonRed onClick={()=>this.prev()}>Prev</ButtonRed>
					<CurrentPage>
						{this.state.currentPage}
					</CurrentPage>
					<ButtonWhite onClick={()=>this.next()}>Next</ButtonWhite>
				</div>
			</Container>
		);
	}
}

export default ManageOwnerContainer;