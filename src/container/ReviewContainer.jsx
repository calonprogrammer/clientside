import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {divIcon} from "leaflet/dist/leaflet-src.esm";

const Container = styled('div')`
	${'#name'}{
		display: flex;
    	-webkit-box-align: center;
    	-ms-flex-align: center;
    	align-items: center;
	}
	${'#star'}{
		color: #27ad27;
	}
	margin-top: 1rem;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 1.5rem;
`
class ReviewContainer extends Component {

	state = {
		reviews: null
	}

	componentWillMount() {
		this.setState({reviews : this.props.review});
	}

	render() {

		return (
			<React.Fragment>
				{this.props.review ? Array.isArray(this.props.review)?
				this.props.review.map((key)=>(
					<Container>
						<span id='name'>{key.user.name}|{key.created_at}</span>
						<div>
							<span>Cleanliness : <FontAwesomeIcon id={'star'} icon={faStar}/>{key.cleanliness}</span>
							<span>|Room Facility : <FontAwesomeIcon id={'star'} icon={faStar}/>{key.room_facility}</span>
							<span>|Public Facility : <FontAwesomeIcon id={'star'} icon={faStar}/>{key.public_facility}</span>
							<span>|Secutiry : <FontAwesomeIcon id={'star'} icon={faStar}/>{key.security}</span>
						</div>
						<div>
							{key.content}
						</div>
				</Container>)):
					<Container>
						<span id='name'>{this.props.review.user.name}|{this.props.review.created_at}</span>
						<div>
							<span>Cleanliness : <FontAwesomeIcon id={'star'} icon={faStar}/>{this.props.review.cleanliness}</span>
							<span>|Room Facility : <FontAwesomeIcon id={'star'} icon={faStar}/>{this.props.review.room_facility}</span>
							<span>|Public Facility : <FontAwesomeIcon id={'star'} icon={faStar}/>{this.props.review.public_facility}</span>
							<span>|Secutiry : <FontAwesomeIcon id={'star'} icon={faStar}/>{this.props.reviews.security}</span>
						</div>
						<div>
							{this.props.reviews.content}
						</div>
					</Container> :
					<div style={{height:'60px',justifyContent:'center',alignItems:'center',display:this.props.review? 'flex':'none'}}>
						Masih Belum ada Review
					</div>
				}
			</React.Fragment>
		);
	}
}


export default ReviewContainer;