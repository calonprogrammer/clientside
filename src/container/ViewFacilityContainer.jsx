import React, {Component} from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import {ButtonRed, ButtonWhite, ConfirmModal, MiniLoader, PopMessage} from "../Utility";
import styled from 'styled-components';
import FacilityAction from "../components/FacilityAction";
import SearchBarContainer from "./SearchBarContainer";
import PopUpdateContainer from "./PopUpdateContainer";


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

class ViewFacilityContainer extends Component {

	state = {
		isLoading : true,
		facilities : null,
		popMessage :false,
		message : '',
		valid :false,
		popModal : false,
		currentId :'',
		currentPage : '',
		lastPage:'',
		miniLoader:false,
	}

	done(response){
		this.setState({facilities:response.data.facilities.data,currentPage:response.data.facilities.current_page,lastPage:response.data.facilities.last_page},()=>console.log(this.state.facilities));
		this.setState({isLoading:false});
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}
	componentWillMount() {
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		myAxios.get(`http://127.0.0.1:8000/admin/getAllFacility?token=${token}`).then((response) => {
			console.log(response.data)
			this.done(response)

		}).catch((error) => {
			console.log(error);
		})
	}

	delete(id) {
		this.setState({currentId:id,popModal:true});
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
		myAxios.get(`http://127.0.0.1:8000/admin/getAllFacility?page=${i}&token=${token}`).then((response) => {
			this.done(response)

		}).catch((error) => {
			console.log(error.response);
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
		myAxios.get(`http://127.0.0.1:8000/admin/getAllFacility?page=${i}&token=${token}`).then((response) => {
			this.done(response)

		}).catch((error) => {
			console.log(error.response);
		})
	}

	finishDelete(response){
		this.setState({valid:true,miniLoader:false,popMessage:true,message:response.data.message});
		window.location.reload();
	}
	agree(id){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		this.setState({miniLoader:true,popModal:false});
		myAxios.delete(`http://127.0.0.1:8000/admin/deleteFacility/${id}?token=${token}`).then((response)=>{
			this.finishDelete(response)
			// console.log(payload)
		}).catch((error)=>{
			console.log(error);
		});
	}
	search(value){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config={
			Authorization : 'Bearer ' + token
		}
		myAxios.get(`http://127.0.0.1:8000/admin/searchFacility?token=${token}&key=${value}`).then((response)=>{
			this.setState({facilities:response.data});
		}).catch((error)=>{
			console.log(error)
		});
	}
	render() {

		return (
			<Container>
				<ConfirmModal  visibility={this.state.popModal} action={'Hapus'} agree={(id)=>this.agree(this.state.currentId)} cancel={()=>this.setState({popModal:false})}/>
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
				{this.state.isLoading && <Loader />}
				{this.state.miniLoader?<MiniLoader visibility={true}/> : null}
				<SearchBarContainer search={(value)=>this.search(value)}/>
				{this.state.facilities &&
					<FacilityAction item={this.state.facilities} delete={(id)=>this.delete(id)}/>
				}
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


export default ViewFacilityContainer;


