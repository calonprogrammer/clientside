import React, {Component} from 'react';
import styled from 'styled-components';
import {ButtonRed, ButtonWhite, InputText, InputTextRow, MessageError, MiniLoader} from "../Utility";
import {Link} from "react-router-dom";



const MainContainer = styled('div')`
	position: fixed;
	width: 80%;
	display: flex;
	justify-content: center;
`
const Container = styled('div')`
	padding: 5%;
	width: 50%;
	background: white;
  	box-shadow:
    0 1px 1px rgba(0,0,0,0.15),
    0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0,0,0,0.15),
    0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0,0,0,0.15);
    overflow-y: auto;
    position: fixed;
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
class UpdateFacilityContainer extends Component {
	state = {
		name : '',
		errorName:'',
		type :'',
		errorType:'',
		file:null,
		errorFile:''

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
		this.setState({file:file});
	}

	handler(event){
		if(event.target.name == 'name'){
			this.setState({name:event.target.value});
		}
		if(event.target.name == 'type'){
			this.setState({type:event.target.value});
		}
	}
	render() {
		return (
			<MainContainer style={{display:this.props.visibility?'block':'none'}}>
				<Container>
					<Form onSubmit={(event)=>this.submit(event)}>
						<InputTextRow>
							Name<span style={{color: 'red'}}>*</span>
							<input type="text" name='name' onChange={(event)=>this.handler(event)} value={this.state.name}/>
							<MessageError errorMessage={this.state.errorName}/>
						</InputTextRow>
						<InputTextRow>
							Type<span style={{color: 'red'}}>*</span> <br/>
							<select value={this.props.type} name='type' onChange={(event)=>this.handler(event)} style={{width:'50%',
								borderRadius: '5px', color:'#27ad27', fontSize:'15px',height:'30px'}}>
								<option value={1}> Unit </option>
								<option value={2}> Public </option>
								<option value={3}> Parking </option>
							</select>
						</InputTextRow>
						<InputTextRow>
							Icon<span style={{color: 'red'}}>*</span> (.png)
							<File>
								<input type="file"  onChange={(event)=>this.handleIcon(event)}/>
								<MessageError errorMessage={this.state.errorIcon}/>
							</File>
							<ResultPicture>
								<img src={this.props.link} alt=""/>
								<output id='iconResult'/>
							</ResultPicture>
						</InputTextRow>
						<MiniLoader visibility={this.state.miniLoader}/>
						<Link to={'/admin-page/manage-facility/view-facility'} ><ButtonRed >Back</ButtonRed></Link>
						<ButtonWhite type={'submit'}>Submit</ButtonWhite>
					</Form>

				</Container>
			</MainContainer>
		);
	}
}

export default UpdateFacilityContainer;