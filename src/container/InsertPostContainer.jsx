import React, {Component} from 'react';
import TextEditorComponent from "../components/TextEditorComponent";
import {ButtonOrange, ButtonWhite, MessageError, PopMessage} from "../Utility";
import styled from 'styled-components';
import axios from 'axios';
import Loader from "../components/Loader";
import TagsComponent from "../components/TagsComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const myAxios = axios.create({validateStatus:false});

const InsideContainer = styled('div')`
	width: 80%;
	margin: 0 auto;
	text-align: center;
	background-color: bisque;
	${'output'}{
		${'img'}{
			width: 200px;
		}
	}
	font-size: 20px;
`;
const TagContainer = styled('div')`
	${'#newTag'}{
		width: 100%;
		background-color: darkgrey;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	width: 80%;
	overflow-y: auto;
	height: 300px;
	margin: 0 auto;
	background-color: whitesmoke;	
`;
class InsertPostContainer extends Component {
	state = {
		title:'',
		errorTitle:'',
		picture:null,
		errorPicture:'',
		content : '',
		errorContent:'',
		name:'',
		errorName:'',
		tags :[],
		role :null,
		errorRole:'',
		isLoading:true,
		dataTags : [],
		popMessage:false,
		message:'',
		valid:false
	}
	componentDidMount() {
		this.getTags();
	}

	handlePicture(event){
		this.setState({errorPicture:''});
		let file = event.target.files[0];
		let output = document.getElementById('pictureResult');
		if(file.type != 'image/jpeg'){
			this.setState({errorPicture : "Picture harus bertipe image/jpeg"});
			return;
		}
		let picReader = new FileReader();
		picReader.addEventListener('load',(event)=>{
			let picFile = event.target;
			let div = document.createElement('div');
			div.innerHTML = '<img src="' + picFile.result + '"' +
				"title=’" + picFile.name + "'/>";
			output.insertBefore(div,null);
		});
		picReader.readAsDataURL(file);
		this.setState({picture:file});
	}

	handleContent(editor){
		this.setState({content:editor});
	}

	getTags(){
		axios.get(`http://127.0.0.1:8000/getTags`).then((response)=>{
			this.setState({dataTags:response.data.tags,isLoading:false});
		}).catch((error)=>{
			this.setState({isLoading:false});
			console.log(error);
		})
	}

	handle(event){
		if(event.target.id === 'title'){
			this.setState({title:event.target.value});
		}
		if(event.target.id === 'role'){
			this.setState({role:event.target.value});
		}
		if(event.target.id === 'name') {
			this.setState({name:event.target.value});
		}
	}

	handleTags(id){
		let index = this.state.tags.indexOf(id);
		if(index === -1){
			let temp = this.state.tags.concat(id);
			this.setState({tags:temp});
		}else{
			let temp = this.state.tags;
			temp.splice(index,1);
			this.setState({tags:temp});
		}
	}

	validate(title, role, picture_id,content){
		this.setState({errorTitle:'',errorRole:'',errorPicture:'',errorContent:''});
		if(title === ''){
			this.setState({errorTitle:'Title tidak boleh kosong'});
			return false;
		}
		if(role === ''){
			this.setState({errorRole:'Tentukan role dan tidak boleh kosong'});
			return false;
		}
		if(picture_id === null){
			this.setState({errorPicture:'Upload Gambar!'});
			return false;
		}
		if(content === ''){
			this.setState({errorContent:'Isi Kontent-nya!'});
			return false;
		}
		return true;
	}

	submit(){
		let title = this.state.title;
		let role = this.state.role;
		let picture_id = this.state.picture;
		let contents = this.state.content;
		let tempTags = [];
			this.state.tags.map((key)=>{
			tempTags.push(key)
		});
		let tags = tempTags
		if(!this.validate(title,role,picture_id,contents)) return;
		let payload = new FormData();
		payload.append('title',title);
		payload.append('role',role);
		payload.append('contents',contents);
		payload.append('tags',tags);
		payload.append('picture_id',picture_id);
		let token = JSON.parse(sessionStorage.getItem('credentials'));

		let config = {
			headers :{
				Authorization : 'Bearer '+token,
				'content-type': 'multipart/form-data'
			}
		}
		this.setState({isloadiing:true});
		myAxios.post(`http://127.0.0.1:8000/admin/addPost`,payload,config).then((response)=>{
			if(response.data.message === 'Error'){
				this.setState({
					errorTitle:response.data.errors.title,
					errorRole:response.data.errors.role,
					errorPicture:response.data.errors.picture_id,
					errorContent:response.data.errors.contents,
					isloading:false,
					valid:false,
					message:response.data.message,
					popMessage:true,
				});
				return;
			}
			this.setState({message:response.data.message,valid:true,popMessage:true});
			console.log(response,'response');
		}).catch((error)=>{
			console.log(error,'error');
		})
	}
	disablePopMessage(){
		this.setState({popMessage:false});
		if(this.state.valid == true){
			window.location.reload();
		}
	}
	addTag(){
		if(this.state.name == ''){
			this.setState({errorName:'Isi Dulu!'});
			return;
		}
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				Authorization : 'Bearer '+token,
			}
		}
		let payload = new FormData();
		payload.append('name',this.state.name);
		axios.post(`http://127.0.0.1:8000/admin/addTag`,payload,config).then((response)=>{
			this.setState({message:response.data.message,valid:true,popMessage:true,isLoading:false},
				()=>this.getTags());
		}).catch((error)=>{
			this.setState({message:error.response.data.message,valid:false,popMessage:true,isLoading:false});
		})
	}
	render() {
		return (
			<React.Fragment>
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.setState({popMessage:false})}/>
				{this.state.isLoading && <Loader/>}
				<InsideContainer>
					Title <br/>
					<input type="text" id={'title'} onChange={(event)=>this.handle(event)} /><br/>
					<MessageError errorMessage={this.state.errorTitle}/>
					Role <br/>
					<select name="" id="role" onChange={(event)=>this.handle(event)}>
						<option value="all">All</option>
						<option value="guest">Guest</option>
						<option value="owner">Owner</option>
					</select>
					<MessageError errorMessage={this.state.errorRole}/>
					<div>Upload Gambar</div>
					<input type="file" onChange={(event)=>this.handlePicture(event)} />
					<MessageError errorMessage={this.state.errorPicture}/>
					<output id='pictureResult' />
				<TextEditorComponent handleContent={(editor)=> this.handleContent(editor)}/>
					<MessageError errorMessage={this.state.errorContent}/>
				<TagContainer>
					<div id={'newTag'}>
						Tambah Tag: <input type="text" id={'name'} onChange={(event)=>this.handle(event)}/>
						<ButtonWhite type={'button'} onClick={()=>this.addTag()}><FontAwesomeIcon icon={faPlus}/></ButtonWhite>
						<MessageError errorMessage={this.state.errorName}/>
					</div>
					<div style={{margin:'0 auto', width:'100%',textAlign:'center'}}><h2>Tags</h2></div>
					{this.state.dataTags.map((key)=>
						(<TagsComponent tags={key} checked={this.state.tags} click={(id)=>this.handleTags(id)}/>))}
				</TagContainer>
					<ButtonOrange onClick={()=>this.submit()}>Submit</ButtonOrange>
				</InsideContainer>
			</React.Fragment>
		);
	}
}

export default InsertPostContainer;