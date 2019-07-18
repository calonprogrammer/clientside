import React, {Component} from 'react';
import Breadcrumb from "../components/Breadcrumb";
import styled from 'styled-components';
import {connect} from "react-redux";


const Container = styled('div')`
	width: 100%;
	background-color: #61dafb;
	height: 100%;
`
const Profile = styled('div')`
	line-height: 40px;
	width: 100%;
	display: flex;
	font-size: 20px;
	font-weight: bold;	
	padding-top: 20px;
	padding-bottom: 20px;
`
const ProfilePicture = (props) =>{
	const Picture = styled('div')`
		${'img'}{
			height: 100%;
			width: 100%;
		}
		width: 13em;
		height: 13em;
		border-radius: 100%;
		overflow: hidden;
		background-color: white;
		margin-right:20px;
	`
	return(
		<Picture>
			{props.image && <img src={"http://localhost:8000/"+props.image} alt=""/>}
			{!props.image && <img src={"http://localhost:8000/"+props.image} alt=""/>}
		</Picture>
	);
}
class OwnerProfilePage extends Component {
	render() {
		return (
			<Container>
				<Breadcrumb/>
				<Profile>
					{(this.props.user && this.props.user.picture_id) &&
					<ProfilePicture image={this.props.user.picture_id}/>
					}
				</Profile>
			</Container>
		);
	}
}
const MapStateToProps = state => {
	return{
		user:state.user
	}
}
const MapDispatchToProps = dispatch =>{
	return{
		update_user : key =>dispatch({
			type:"update_user",
			value:key
		})
	}
}
export default connect(MapStateToProps,MapDispatchToProps) (OwnerProfilePage);