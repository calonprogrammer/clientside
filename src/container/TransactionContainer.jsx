import React, {Component} from 'react';
import styled from "styled-components";

var moment = require('moment');
const Container= styled('div')`
	${'h4'}{
		text-align: center;
	}
  &:hover{
    box-shadow: 0px 2px 5px 2px #888888;
    cursor: pointer;
    transition: 0.2s;
  }
  background-color: antiquewhite;
  margin-left:15px ;
  margin-bottom:15px ;
  width: 300px;
  display: inline-block;
  transition: 0.2s;
  box-shadow: 0px 0.3px 0.3px 0.3px #888888;
  box-sizing: border-box;
  border-radius: 5px;
`;
const ImageContainer = styled('div')`
	${'img'}{
		height: 100%;
		width: 100%;
		margin: 0 auto;
	}
	height: 150px;
	margin:0 auto;
	overflow: hidden;
	display: flex;
`;
const Detail = styled('div')`
	text-align: center;
	width: 100%;
	background-color: #27ad27;
	color: whitesmoke;
	font-size: 20px;
`;
class TransactionContainer extends Component {
	render() {
		let transaction = this.props.transaction;
		return (
			<Container>
				<ImageContainer>
					<img src={`http://localhost:8000/`+ transaction.user.picture_id} alt=""/>
				</ImageContainer>
				<Detail>
					User Name <br/>
					{transaction.user.name} <br/>
					Premium Type <br/>
					{transaction.premium.name} <br/>
				</Detail>
				Start Date {moment(transaction.start_date).format('LL')} <br/>
				End Date {moment(transaction.end_date).format('LL')} <br/>
			</Container>
		);
	}
}

export default TransactionContainer;