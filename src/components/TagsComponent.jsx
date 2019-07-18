import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled('div')`
	&:hover{
		cursor: pointer;
		background-color: #c7271a;
	}
	background-color: #ff20d5;
	border-radius: 10px;
	padding: 20px;
	text-align: center;
	word-wrap: unset;
	color: whitesmoke;
	font-weight: bold;
	margin: 5px;
`
class TagsComponent extends Component {
	render() {
		return (
			<Container style={{
				backgroundColor:this.props.checked.indexOf(this.props.tags.id)!== -1?'#c7271a':"#ff20d5"}}
			           onClick={(id)=>this.props.click(this.props.tags.id)}>
				{this.props.tags.name}
			</Container>
		);
	}
}

export default TagsComponent;