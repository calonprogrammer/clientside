import React, {Component} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
const Container = styled('div')`
	min-width:300px;
	width: 300px;
	background-color: lightblue;
	border-radius: 5px;
	margin: 10px;
`;
const ImageContainer = styled('div')`
	${'img'}{
		height: 100%;
		width: 100%;
		margin: 0 auto;
	}
	width: 100px;
	height: 100px;
	border-radius: 100%;
	margin:40px auto;
	border: 1px rgba(0,0,0,0.5) solid;
	overflow: hidden;
`;
const UserDetail = styled('div')`
	${'#name'}{
		cursor: pointer;
		color: darkgrey;
		font-size: 20px;
	}
	width: 100%;
	background-color: #27ad27;
	text-align: center;
	color: whitesmoke;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;
const ButtonFollowing = styled('button')`
	&:hover{
		cursor: pointer;	
	}
	width: 50%;
	color: whitesmoke;
	font-weight: bold;
	line-height: 30px;
	border-radius: 40px;
	background-color: red;

`;
class UserComponents extends Component {

	render() {
		let user = this.props.users;
		let follower = this.props.users.follower;
		return (
			<Container>
				<ImageContainer onClick={(id)=>this.props.redirect(follower.id)}>
				{
					<img src={`http://localhost:8000/`+ user.follower.picture_id} alt="Image Not Found"/>
				}
				</ImageContainer>
				<UserDetail>
					<ButtonFollowing  onClick={(id)=>this.props.unfollow(user.id)}>Unfollow</ButtonFollowing> <br/>
					<div id={'name'} onClick={()=>this.props.history.push('/owner-detail/'+follower.id)}>Name : {follower.name} </div>
					Follower : {follower.follower.length}
				</UserDetail>
			</Container>
		);
	}
}

export default withRouter(UserComponents);