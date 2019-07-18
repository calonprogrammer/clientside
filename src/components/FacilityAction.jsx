import React, {Component} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {ButtonRed, ButtonWhite, InputTextRow, MessageError, MiniLoader, PopMessage} from "../Utility";
import axios from 'axios';
const myAxios = new axios.create({validateStatus:false});

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
`;
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
`;

const Container = styled('div')`
		width: 90%;
		background: #fff;
  		box-shadow:
    	0 1px 1px rgba(0,0,0,0.15),
    	0 10px 0 -5px #eee,
    	0 10px 1px -4px rgba(0,0,0,0.15),
    	0 20px 0 -10px #eee,
    	0 20px 1px -9px rgba(0,0,0,0.15);
    	padding: 20px;	
    	margin: 0 auto;	
	`;
const IconPart = styled('div')`
		${'img'}{
			width: 50px;
			height: 50px;
		}
		display: flex;
		justify-content: center;
		width: 10%;
	`;

const ContainerInside = styled('div')`
	
		margin-top: 10px;
		background: #fff;
  		border: 1px black solid;
  		display: flex;
	`;
const Text = styled('div')`
		width: 80%;
		color: black;
		font-size: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	`;
const Action = styled('div')`
		
		${'#update'}{
			&:hover{
				background-color: rgba(43,167,255,0.3);
				cursor: pointer;
			}
			background-color: rgba(43,167,255,1);
			width: 100%;
			height: 100%;
			border: 0px;
			color:white;
		}
		${'#delete'}{
			&:hover{
				background-color: rgba(139,0,0,0.3);
				cursor: pointer;

			}
			background-color: rgba(139,0,0,1);
			width: 100%;
			height: 100%;
			border: 0px;
			color:white;
		}
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	`;
const Form = styled('form')`
	background-color: whitesmoke;
	border-left:1px black solid;
	border-right:1px black solid;
	border-bottom:1px black solid;
`;


class FacilityAction extends Component {

	state = {
		visibility : false,
		formVisibility:[],
		miniLoader: false,
		errorName :'',
		errorFile : '',
		file :null,
		popMessage :'',
		valid :false,
		message:''
	};

	// componentWillMount() {
	// 	this.setState({facilities: this.props.item});
	// }
	// componentDidMount() {
	// 	this.setState({facilities: this.props.item});
	// }
	//
	// initialVisibility() {
	// 	this.state.facilities.map((item)=>
	// 	{
	// 		this.state.formVisibility.push({id: item.id, value :false});
	// 	});
	// }

	update(id) {
		this.setState((prevState)=>({visibility:!prevState.visibility}));
	}
	handleIcon (event){
		this.setState({errorFile:''});
		let file = event.target.files[0];
		let output = document.getElementById('iconResult');
		if(file.type !== "image/png"){
			file = null;
			this.setState({errorFile : "Icon harus berupa gambar(.png)",file :null});
			output.innerHTML = null;
			return;
		}
		this.setState({file:file});
		let picReader = new FileReader();
		picReader.addEventListener('load',(event)=>{
			var picFile = event.target;
			let div = document.createElement('div');
			div.innerHTML = '<img src="' + picFile.result + '"' +
				"title=’" + picFile.name + "'/>";
			output.insertBefore(div,null);
		});
		picReader.readAsDataURL(file);

	}

	submit(event,id){
		event.preventDefault();
		this.setState({errorName : ''});
		let name = event.target.getElementsByClassName('name')[0].value;
		let type = event.target.getElementsByClassName('type')[0].value;
		let file = null;
		if(name.trim() === ''){
			this.setState({errorName : 'Nama fasilitas tidak boleh kosong'});
			return;
		}
		this.setState({miniLoader:true});
		if(this.state.file){
			file = this.state.file;
		}
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		const config = {
			headers: {
				Authorization: 'Bearer ' + token,
				'content-type': 'multipart/form-data'
			}
		}
		let payload = new FormData()
		payload.append('id',id);
		payload.append('name' ,name);
		payload.append('type' ,type);
		payload.append('file' ,file);
		myAxios.post('http://127.0.0.1:8000/admin/updateFacility',payload,config).then((response)=>{
			this.setState({miniLoader:false, message:response.data.message,valid : true,popMessage:true});
			window.location.reload();
		}).catch((error)=>{
			console.log(error)
		})
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}

	render() {
		let items = this.props.item;
		return (
			<Container>
				{items.map((key) => (
					<React.Fragment>
						<ContainerInside>
							<IconPart>
								<img src={'http://127.0.0.1:8000/' + key.link} alt={key.name}/>
							</IconPart>
							<Text>
								{key.name}
							</Text>
							<Action>
								<button id='update' onClick={(id) => this.update(key.id)}>
									<FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
								</button>
								<button id='delete' onClick={(id) => this.props.delete(key.id)}>
									<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
								</button>
							</Action>
						</ContainerInside>
						<Form onSubmit={(event,id)=>this.submit(event,key.id)} style={{display: this.state.visibility ? 'block' : 'none'}}>
							<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
							<InputTextRow>
								Name<span style={{color: 'red'}}>*</span>
								<input type="text" defaultValue={key.name} className='name'/>
								<MessageError errorMessage={this.state.errorName}/>
							</InputTextRow>
							<InputTextRow>
								Type<span style={{color: 'red'}}>*</span> <br/>
								<select className='type' defaultValue={key.type} style={{
									width: '50%',
									borderRadius: '5px', color: '#27ad27', fontSize: '15px', height: '30px'
								}}>
									<option value={1}> Unit</option>
									<option value={2}> Public</option>
									<option value={3}> Parking</option>
								</select>
							</InputTextRow>
							<InputTextRow>
								Image file (.png)<span style={{color: 'red'}}>*</span><br/>
								<File>
									<input className='file' type="file" onChange={(event)=>this.handleIcon(event)}/>
									<MessageError errorMessage={this.state.errorFile}/>
								</File>
							</InputTextRow>
							<ResultPicture>
								<output id='iconResult'></output>
							</ResultPicture>
							<MiniLoader visibility={this.state.miniLoader}/>
							<ButtonRed type={'reset'}>Reset</ButtonRed>
							<ButtonWhite type={'submit'}>Submit</ButtonWhite>
						</Form>
					</React.Fragment>
				))}

			</Container>
		);
	}
}



export default FacilityAction;
