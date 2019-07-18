import React, {Component} from 'react';
import styled from 'styled-components';
import {ButtonRed, ButtonWhite, InputTextRow, MessageError, MiniLoader, PopMessage} from "../Utility";
import axios from 'axios';
const myAxios = new axios.create({validateStatus:false});

const Container = styled('div')`
	width: 80%;

	display: flex;
	margin: 30px auto;
	background: #fff;
  	box-shadow:
    0 1px 1px rgba(0,0,0,0.15),
    0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0,0,0,0.15),
    0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0,0,0,0.15);
    padding: 30px;
`

const Form = styled('form')`
	padding: 10px 20px;
	width: 80%;
	margin: auto auto;
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
const ResultPicture = styled('div')`
	${'output'}{
		width: 100%;
		display: flex;
		overflow-x: auto;
		${'img'}{
			border: 1px black solid;
			padding: 1px;
			width: 200px;
			margin-left:5px ;
		}
	}
	width: 100%;
`

class InsertNewFacilityContainer extends Component {
	state = {
		name : '',
		errorName : '',
		type : 1,
		icon : null,
		errorIcon :'',

		popMessage:false,
		message:'',
		valid:false
	}
	handleName(event){
		this.setState({name: event.target.value});
	}
	handleType(event){
		this.setState({type: event.target.value});
	}
	handleIcon (event){
		this.setState({errorIcon:''});
		let file = event.target.files[0];
		let output = document.getElementById('iconResult');
		if(file.type !== 'image/png'){
			this.setState({errorIcon : "Icon harus berupa gambar"});
			return;
		}
		let picReader = new FileReader();
		picReader.addEventListener('load',(event)=>{
			var picFile = event.target;
			let div = document.createElement('div');
			div.innerHTML = '<img src="' + picFile.result + '"' +
				"title=’" + picFile.name + "'/>";
			output.insertBefore(div,null);
		});
		picReader.readAsDataURL(file);
		this.setState({icon:file});
	}
	validate(){
		this.setState({errorName:'',errorIcon:''});
		if(this.state.name.trim() == ''){
			this.setState({errorName : 'Masukan nama fasilitas'});
			return false;
		}
		if(this.state.icon  == null){
			this.setState({errorIcon : 'Masukan icon dari fasillitas'});
			return false;
		}
		return true;
	}

	submit(event){
		event.preventDefault();
		if(!this.validate()) return;
		this.setState({miniLoader:true})
		console.log(this.state.icon);
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		const config = {
			headers: {
				Authorization: 'Bearer ' + token,
				'content-type': 'multipart/form-data'
			}
		}
		let payload = new FormData()
		payload.append('name' ,this.state.name);
		payload.append('type' ,this.state.type);
		payload.append('file' ,this.state.icon);

		myAxios.post('http://127.0.0.1:8000/admin/storeFacility',payload,config).then((response)=>{
			if(response.data.message == 'Success'){
				this.setState({valid:true,message:response.data.message,popMessage:true,miniLoader:false});
				window.location.reload();
			}else{
				this.setState({errorName:response.data.errors.name})
				this.setState({errorIcon:response.data.errors.file,miniLoader:false})
			}
		}).catch((error)=>{
			console.log(error);
		})
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}
	render() {
		return (
			<React.Fragment>
			<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
			<Container>
				<Form onSubmit={(event)=>this.submit(event)}>
					<InputTextRow>
						Name<span style={{color: 'red'}}>*</span>
						<input type="text" onChange={(event)=>this.handleName(event)} value={this.state.name}/>
						<MessageError errorMessage={this.state.errorName}/>
					</InputTextRow>
					<InputTextRow>
						Type<span style={{color: 'red'}}>*</span> <br/>
						<select onChange={(event)=>this.handleType(event)} style={{width:'50%',
							borderRadius: '5px', color:'#27ad27', fontSize:'15px',height:'30px'}}>
							<option value={1}> Unit </option>
							<option value={2}> Public </option>
							<option value={3}> Parking </option>
						</select>
					</InputTextRow>
					<InputTextRow>
						Image file (.png)<span style={{color: 'red'}}>*</span><br/>
					<File>
						<input type="file" onChange={(event)=>this.handleIcon(event)}/>
					</File>
					</InputTextRow>
					<ResultPicture>
						<output id='iconResult'></output>
					</ResultPicture>
					<MiniLoader visibility={this.state.miniLoader}/>
					<ButtonRed type={'reset'}>Reset</ButtonRed>
					<ButtonWhite type={'submit'}>Submit</ButtonWhite>
				</Form>
			</Container>
			</React.Fragment>
		);
	}
}


export default InsertNewFacilityContainer;