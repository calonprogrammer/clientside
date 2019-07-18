import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled('div')`
	${'a'}{
		color: #27ad27;
		text-decoration: none;
	}
	width: 100%;
	font-size: 20px;
	background: white;
	color: #ad0900;
	line-height: 40px;
	size: 20px;
`
class Breadcrumb extends Component {

	linkHandler(){
		let link = this.props.location.pathname;
		let spliter = link.split('/');
		let elements = [];
		let path = ''
		elements.push(
			<span key={path}>
					<Link to={'/'}>Home</Link>
				</span>
		)
		for(let i = 1 ; i < spliter.length ; i++){
			path+= '/'+spliter[i];
			elements.push(
				<span key={path}>
					<span> > </span>
					<Link to={path}>{spliter[i]}</Link>
				</span>
			);
		}
		return elements;
	}
	render() {

		return (
			<Container>
				{this.linkHandler()}
			</Container>
		);
	}
}

export default withRouter(Breadcrumb);