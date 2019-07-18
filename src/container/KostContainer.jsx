import React, {Component} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltH} from "@fortawesome/free-solid-svg-icons/faArrowsAltH";
import {withRouter} from 'react-router-dom';
import {ButtonRed, ButtonWhite} from "../Utility";
import {connect} from "react-redux";
const Container= styled('div')`
  @media only screen and (max-width: 991px){
  	min-width: 200px;
  }
  &:hover{
    box-shadow: 0px 2px 5px 2px #888888;
    cursor: pointer;
    transition: 0.2s;
  }
  margin-left:15px ;
  margin-bottom:15px ;
  min-width: 300px;
  width: 300px;
  display: inline-block;
  transition: 0.2s;
  box-shadow: 0px 0.3px 0.3px 0.3px #888888;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
`
const Picture = styled('div')`
	${'img'}{
		height: 100%;
		width: 100%;
	}
	width: 100%;
	margin: 0 auto;
`
const TextArea  = styled('div')`
	${'#name'}{
		color: #27ad27;
		font-weight: bold;
	}
	${'#city'}{
		font-weight: bold;
	}
	${'#area'}{
		background-color: rgba(0,0,0,0.4);
		border-radius: 2px;
	}
	${'#address'}{
		background-color: antiquewhite;
	}
	${'#roomLeft'}{
		color: green;
	}
	margin: 0 auto;
	width: 90%;
	font-size: 15px;
`
const Action = styled(`div`)`
	display: flex;
	justify-content: space-around;
	align-items: center;
`
class KostContainer extends Component {

	toDetailPage(value){
		this.props.history.push('/detail-page/'+value);

	}
	render() {
		let property = this.props.property;
		let child = property.propertiable;
		return (
			<Container >
				<div onClick={(value)=>this.toDetailPage(property.slug)}>
				<Picture>
					<img src={'http://127.0.0.1:8000/' + property.pict_id} alt=""/>
				</Picture>
				<TextArea>
					<span id='name'>{property.name}<br/></span>
					<span id='city'>{property.city.name}<br/></span>
					<span id='price'>Rp {property.price}/ {property.period} <br/></span>
					<span id='gender'>{child.gender_type}</span> <br/>
					<span id='area'>Luas <FontAwesomeIcon icon={faArrowsAltH}/>{property.area}m<sup>2</sup></span> <br/>
					<br/>
					<span id='address'>{property.address}</span> <br/>
					<span id='roomLeft'>{child.room_remaining}</span>
				</TextArea>
				</div>
				{this.props.user && this.props.user.type == 2
				&&
				<Action>
					<ButtonWhite onClick={(id)=>this.props.update(property.id)}>Update</ButtonWhite>
					<ButtonRed onClick={(id)=>this.props.delete(property.id)}>Delete</ButtonRed>
				</Action>
				}
			</Container>
		);
	}
}

const MapStateToProps = state => {
	return{
		user:state.user,
		coords:state.coords
	}
}
const MapDispatchToProps = dispatch =>{
	return{
		update_user : key =>dispatch({
			type:"update_user",
			value:key
		}),
		update_coords: key=>dispatch({
			type :"update_coords",
			value:key
		})
	}
}

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(KostContainer));