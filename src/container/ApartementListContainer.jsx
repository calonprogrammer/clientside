import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from "../components/Loader";
import ApartementContainer from "./ApartementContainer";
import {ButtonRed, ButtonWhite, ConfirmModal, PopMessage} from "../Utility";
import Breadcrumb from "../components/Breadcrumb";
const Container = styled('div')`
	${'#title'}{
		width: 100%;
		text-align: center;
		font-size: 30px;
		line-height: 50px;
	}
	width: 100%;
	margin: 30px auto;
	background: whitesmoke;
  	box-shadow:
    0 1px 1px rgba(0,0,0,0.15),
    0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0,0,0,0.15),
    0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0,0,0,0.15);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;
const CurrentPage = styled('div')`
	background-color: #27ad27;
	width: 50px;
	border-radius: 5px;
	color: white;
	font-size: 20px;
	text-align: center;
	line-height: 50px;	
`

class ApartementListContainer extends Component {
	state = {
		isLoading : true,
		apartements : [],
		paginate: null,
		popModal : false,
		popMessage:false,
		valid :false,
		message:null,
		currentId : null,
	}

	componentWillMount() {
		this.fetchApartement();
	}

	fetchApartement(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`http://127.0.0.1:8000/owner/getAllApartement`,config).then((response)=>{
			const {data, ...paginate} = response.data.apartements;
			this.setState({apartements: data ,paginate: paginate,isLoading: false});
		}).catch((error)=>{
			console.log(error);
		})
	}
	delete(id){
		this.setState({currentId : id});
		this.setState({popModal: true});
	}
	update(id){
		console.log(id)
	}
	agreeDeleted(id){
		this.setState({isLoading : true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = {
			id :id
		}
		let config = {
			headers: {
				Authorization: "Bearer " + token
			}
		}
		axios.post(`http://127.0.0.1:8000/owner/deleteProperty`,payload,config).then((response)=>{
			this.setState({message:response.data.message,valid:true,isLoading:false,popMessage:true});
		}).catch((error)=>{
			console.log(error);
		});
	}
	next(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));

		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`${this.state.paginate.next_page_url}`,config).then((response)=>{
			const {data, ...paginate} = response.data.apartements;
			this.setState({apartements: data ,paginate: paginate,isLoading: false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false})
		});
	}
	prev(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));

		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`${this.state.paginate.prev_page_url}`,config).then((response)=>{
			const {data, ...paginate} = response.data.apartements;
			this.setState({apartements: data ,paginate: paginate,isLoading: false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false})
		});
	}
	render() {
		return (
			<Fragment>
				<ConfirmModal  visibility={this.state.popModal} action={'Hapus'} agree={(id)=>this.agreeDeleted(this.state.currentId)} cancel={()=>this.setState({popModal:false})}/>
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.setState({popMessage:false})}/>
				{this.state.isLoading && <Loader/>}
				<Container>
					<div id={'title'}>Your Apartement</div>
					{this.state.apartements && this.state.apartements.map((key)=>
						(<ApartementContainer property={key} delete={(id)=>this.delete(id)} update={(id)=>this.update(id)}/>))}
				</Container>
				<div style={{background:'whitesmoke',margin:'0 auto', width:'50%',display:'flex',justifyContent:'space-between'}}>
					<ButtonRed onClick={()=>this.prev()}>Prev</ButtonRed>
					<CurrentPage>
						{this.state.paginate && this.state.paginate.current_page}
					</CurrentPage>
					<ButtonWhite onClick={()=>this.next()}>Next</ButtonWhite>
				</div>
			</Fragment>
		);
	}
}


export default ApartementListContainer;