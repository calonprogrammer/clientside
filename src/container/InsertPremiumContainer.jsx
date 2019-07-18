import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {ButtonOrange, ButtonRed, ButtonWhite, InputTextRow, MessageError, MiniLoader, PopMessage} from "../Utility";
const myAxios = axios.create({validateStatus:false});

const Container = styled('div')`
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 50%;
	display: flex;
	margin: 30px auto;
	background: #fff;
	min-width: 350px;
  	box-shadow:
    0 1px 1px rgba(0,0,0,0.15),
    0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0,0,0,0.15),
    0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0,0,0,0.15);
    padding: 30px;
`

class InsertPremiumContainer extends Component {

	state ={
		premiums:null,
		miniLoader:false,
		errorName:'',
		errorDiscount:'',
		errorDuration:'',
		popMessage:'',
		valid:false,
		message:''
	}

	validate(name,discount,duration){
		this.setState({errorName:'',errorDiscount:'',errorDuration:''});
		if(name.trim() === ''){
			this.setState({errorName: 'Nama Premium tidak boleh kosong'});
			return false
		}
		if(discount > 100){
			this.setState({errorDiscount:'Discount harus kurang dari 100'});
			return false;
		}
		if(duration < 1){
			this.setState({errorDuration:'Duration harus lebih dari 1 hari'});
			return false
		}
		return true;
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}
	submit(event){
		event.preventDefault();

		let name =event.target.elements["name"].value;
		let discount = event.target.elements["discount"].value;
		let duration = event.target.elements["duration"].value;
		let validation = this.validate(name,discount,duration);
		if(!validation) return;
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		this.setState({miniLoader:true});
		let payload = {
			'name' : name,
			'duration' : duration,
			'discount' : discount
		}
		myAxios.post(`http://127.0.0.1:8000/admin/addPremium?token=${token}`,payload).then((response)=>{
			if(response.data.message == 'Error') {
				this.setState({
					errorName: response.data.errors.name,
					errorDuration: response.data.errors.duration,
					errorDiscount: response.data.errors.discount,
				})
			}
			if(response.data.message == 'Success'){
				this.setState({miniLoader:false, message:response.data.message,valid:true,popMessage:true})
			}else{
				this.setState({miniLoader:false, message:response.data.message,valid:false,popMessage:true})
			}
			this.fetch();
		}).catch((error)=>{
			console.log(error)
		});
	}
	render() {
		return (
			<React.Fragment>
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
			<Container>
				<h1>Insert Premium</h1>
				<form onSubmit={(event)=>this.submit(event)}>
					<InputTextRow>
						Name<span style={{color: 'red'}}>*</span>
						<input type="text" name='name'/>
						<MessageError errorMessage={this.state.errorName}/>
					</InputTextRow>
					<InputTextRow>
						Discount<span style={{color: 'red'}}>*</span>
						<input type="number" name='discount'/>
						<MessageError errorMessage={this.state.errorDiscount}/>
					</InputTextRow>
					<InputTextRow>
						Duration(day)<span style={{color: 'red'}}>*</span>
						<input type="number" name='duration'/>
						<MessageError errorMessage={this.state.errorDuration}/>
					</InputTextRow>
					<div style={{display:'flex', justifyContent:'space-around'}}>
						<ButtonRed type={'reset'}> Reset </ButtonRed>
						<ButtonWhite type={'submit'}>Submit</ButtonWhite>
					</div>
					<MiniLoader visibility={this.state.miniLoader}/>
				</form>
			</Container>
			</React.Fragment>
		);
	}
}

export default InsertPremiumContainer;


