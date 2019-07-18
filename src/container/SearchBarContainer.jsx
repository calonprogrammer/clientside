import React, {Component} from 'react';
import styled from 'styled-components';
import {ButtonWhite} from "../Utility";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const Container = styled('div')`
	@media only screen and (max-width: 991px){
		min-width: 500px;
	}
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	${'input'}{
		@media only screen and (max-width: 991px){
			background-color: rgba(0,0,0,0.1);
			width: 50%;
			color: tomato;
			font-size: 20px;
		}
		text-align: center;
		color: #0b8e05;
		line-height: 20px;
		width: 30%;
		background-color: whitesmoke;
		border: 1px black solid;
		border-radius: 5px;
	}
	
`
class SearchBarContainer extends Component {
	state = {
		value :''
	}
	handleValue(event){
		this.setState({value:event.target.value});
	}
	render() {
		return (
			<Container>
				<input type="text" onChange={(event)=>this.handleValue(event)}/>
				<ButtonWhite onClick={(value)=>this.props.search(this.state.value)}> <FontAwesomeIcon icon={faSearch}/> </ButtonWhite>
			</Container>
		);
	}
}


export default SearchBarContainer;