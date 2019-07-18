import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {faStarHalf} from "@fortawesome/free-solid-svg-icons";
import {faStarHalfAlt} from "@fortawesome/free-solid-svg-icons/faStarHalfAlt";

const Container = styled('div')`
	margin: 30px auto;
	font-size: 25px;
	color: #27ad27;
`


const Stars = (props)=>{
	const result = [];
	let value = props.value;

	return(
		{result}
	);
}
class AverageReview extends Component {

	rendering(value){
		let result = [];

		for(let i = 0; i< 5 ; i++){
			if(value >= 1){
				result.push(<FontAwesomeIcon icon={faStar} style={{color:'gold'}}/>);
			}
			if(value <= 0){
				result.push(<FontAwesomeIcon icon={faStar} style={{color:'grey'}}/>);
			}
			if(value > 0 && value < 1){
				result.push(<FontAwesomeIcon icon={faStarHalfAlt} style={{color:'gold'}}/>);
			}
			value -= 1;
		}
		return result;
	}

	render() {
		const cleanliness = this.rendering( this.props.average.cleanliness);
		const facility = this.rendering( this.props.average.room_facility);
		const public_facility = this.rendering( this.props.average.public_facility);
		const security = this.rendering( this.props.average.security);
		return (
			<Container>
				<table>
					<tr>
						<td>Cleanliness </td>
						<td>{cleanliness}</td>
					</tr>
					<tr>
						<td>Facility </td>
						<td>{facility}</td>
					</tr>
					<tr>
						<td>Public Facility </td>
						<td>{public_facility}</td>
					</tr>
					<tr>
						<td>Security </td>
						<td>{security}</td>
					</tr>
				</table>
			</Container>
		);
	}
}

export default AverageReview;