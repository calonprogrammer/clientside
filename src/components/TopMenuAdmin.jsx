import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


const Container = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	position: sticky;
	
`

const Item = styled('div')`
	${'a'}{
		text-decoration: none;
		color: white;
		width: 100%;
		text-align: center;
	}
	&:hover{
		background-color: rgba(255,255,255,0.5);
		transition: 0.4s;
		cursor: pointer;
	}
	height:50px;
	color: white;
	font-size: 20px;
	width: 100%;
	background-color: rgba(0,0,0,0.2);
	justify-content: center;
	display: flex;
	align-items: center;
	
`

class TopMenuAdmin extends Component {
	render() {
		const menus = this.props.item;
		return(
			<Container>
				{menus.map((key)=>(
						<Item><Link to={key.link}>{key.value}</Link></Item>
					)

				)
				}
			</Container>
		);
	}
}

export default TopMenuAdmin;