import React, {Component} from 'react';
import styled from 'styled-components';
import {ButtonRed, ButtonWhite, InputTextRow} from "../Utility";
import {divIcon} from "leaflet/dist/leaflet-src.esm";

const Container = styled('form')`
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;	
		background-color: rgba(121,121,121,0.52);
		${'#container'}{
			border-radius: 10px;
			background-color: white;
			padding: 50px 80px;
			${'#title'}{
				text-align: center;
				font-weight: bold;
				font-size: 20px;
			}
			${'#name'}{
				font-size: 18px;
				
			}
			${'#input'}{
				width: 100%;
				border: 1px #27ad27 solid;
				border-radius: 5px;
				background-color: whitesmoke;
			}
		}
		
	`
class PopUpdateContainer extends Component {

	state ={
		object : {
			title :'',
			input :[]
		}
	}
	componentWillMount() {
		let title = this.props.title;
		let input = this.props.object.input;
		this.setState({object:{
			title :title,
			input : input
		}});
	}

	render() {
		return (
			<Container onSubmit={(event)=>this.props.submit(event)}>
				{ this.state.object &&
					<div id='container'>
						<div id='title'>{this.state.object.title}</div>
						{this.state.object.input.map((key)=>(
							<div>
								<span id='name'>{key.name}
								<input id='input' name={key.name} type={key.type} defaultValue={key.value} readOnly={key.readOnly}/></span>
							</div>
						))}
						<div>
							<ButtonRed onClick={()=>this.props.cancel()} >Cancel</ButtonRed>
							<ButtonWhite type='submit' >Submit</ButtonWhite>
						</div>
					</div>
				}
			</Container>
		);
	}
}


export default PopUpdateContainer;