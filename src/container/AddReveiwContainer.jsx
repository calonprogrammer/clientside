import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {ButtonWhite, InputTextRow, MessageError, MiniLoader} from "../Utility";
import axios from 'axios';

const myAxios = axios.create({validateStatus:false});

const Star = styled('i')`
	width: 40%;
	font-size: 30px;
	margin: 0 auto;
`
const ContainerStar = styled('form')`
	text-align: center;
`

class AddReveiwContainer extends Component {

	state={
		review :{
			cleanliness:null,
			facility:null,
			publicFacility :null,
			security :null
		},
		isValidForm : false,
		loading:false,
		errorMessage:'',
		message:''

	}

	onChangeStar(type,idx){
		console.log(type,idx)
		const review = Object.assign(this.state.review, {
			[type]: idx
		})
		this.setState({ review , isValidForm : true})
		console.log(this.state.review.cleanliness);
	}

	onSubmit(event){
		event.preventDefault();
		let payload = new FormData();
		payload.append('property_id',this.props.item.id);
		payload.append('user_id',this.props.user.id);
		payload.append('cleanliness',this.state.review.cleanliness);
		payload.append('room_facility',this.state.review.facility);
		payload.append('public_facility',this.state.review.publicFacility);
		payload.append('security',this.state.review.security);
		payload.append('contents',event.target.elements['contents'].value);
		this.setState({loading:true});

		let token = JSON.parse(sessionStorage.getItem('credentials'));
		myAxios.post(`http://127.0.0.1:8000/guest/addReview?token=${token}`,payload).then((response)=>{
			if(response.data.message == 'Error'){
				this.setState({errorMessage:response.data.errors.contents,loading:false});
				return;
			}
			this.setState({message:response.data.message,loading:false});
			window.location.reload();
		}).catch((error)=>{
			this.setState({errorMessage: error.response.data.contents});
		})
	}
	render() {
		const cleanStar = [];
		const facilityStar = [];
		const publicFacilityStar = [];
		const securityStar = [];
		for (let idx = 1; idx <= 5; idx++){
			cleanStar.push(<Star key={idx} onClick={()=>this.onChangeStar('cleanliness',idx)}>
				<FontAwesomeIcon icon={faStar} style={{color:this.state.review.cleanliness >= idx? 'green':'grey'}}/>
			</Star>)
		}
		for (let idx = 1; idx <= 5; idx++){
			facilityStar.push(<Star key={idx} onClick={()=>this.onChangeStar('facility',idx)}>
				<FontAwesomeIcon icon={faStar} style={{color:this.state.review.facility >= idx? 'green':'grey'}}/>
			</Star>)
		}

		for (let idx = 1; idx <= 5; idx++){
			publicFacilityStar.push(<Star key={idx} onClick={()=>this.onChangeStar('publicFacility',idx)}>
				<FontAwesomeIcon icon={faStar} style={{color:this.state.review.publicFacility >= idx? 'green':'grey'}}/>
			</Star>)
		}

		for (let idx = 1; idx <= 5; idx++){
			securityStar.push(<Star key={idx} onClick={()=>this.onChangeStar('security',idx)}>
				<FontAwesomeIcon icon={faStar} style={{color:this.state.review.security >= idx? 'green':'grey'}}/>
			</Star>)
		}


		return (
				<ContainerStar onSubmit={(event)=>this.onSubmit(event)}>
					Cleanliness :<br/>
					{cleanStar}<br/>

					Facility :<br/>
					{facilityStar}<br/>

					Public Facility :<br/>
					{publicFacilityStar}<br/>

					Security : <br/>
					{securityStar}<br/>
					<InputTextRow>
						Komentar
						<input type="text" name={'contents'}/>
					</InputTextRow>
					<MessageError errorMessage={this.state.errorMessage}/>
					<div>{this.state.message}</div>
					<MiniLoader visibility={this.state.loading}/>
					<ButtonWhite type={'submit'}> Submit</ButtonWhite>
				</ContainerStar>
		);
	}
}


export default AddReveiwContainer;