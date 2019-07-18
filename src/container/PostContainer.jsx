import React, {Component} from 'react';
import styled from 'styled-components';
import {ButtonRed, ButtonWhite} from "../Utility";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import TagsComponent from "../components/TagsComponent";
import axios from "axios";
const Container = styled('div')`
	&:hover{
    box-shadow: 0px 2px 5px 2px #888888;
    cursor: pointer;
    transition: 0.2s;
    
  }
	@media only screen and (max-width: 991px){
		min-width: 200px;
	}
	background-color: white;
  	margin-left:15px ;
  	margin-bottom:15px ;
  	min-width: 300px;
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
	width: 200px;
	height: 200px;
	border-radius: 100%;
	margin:40px auto;
	border: 1px rgba(0,0,0,0.5) solid;
	overflow: hidden;
`;
const Action = styled(`div`)`
	display: flex;
	justify-content: space-around;
	align-items: center;
`;
const TextArea  = styled('div')`
	${'#title'}{
		font-size: 20px;
		text-align: center;
		color: #27ad27;
		font-weight: bold;
	}
	${'#content'}{
		&:hover{
		box-shadow:
	        0 1px 1px rgba(0,0,0,0.15),
	        0 10px 0 -5px #eee,
	        0 10px 1px -4px rgba(0,0,0,0.15),
	        0 20px 0 -10px #eee,
	        0 20px 1px -9px rgba(0,0,0,0.15);
		}
		background-color: white;
		border: 0.2px grey solid;
		margin: 20px auto;
	}
	margin: 0 auto;
	width: 90%;
	font-size: 15px;
`;

class PostContainer extends Component {
	push(slug){
		this.props.history.push('/detail-post/'+slug);
	}
	render() {
		let post = this.props.post;
		return (
			<Container>
				<ImageContainer onClick={(slug)=>this.push(post.slug)}>
					<img src={'http://127.0.0.1:8000/' + post.picture_id} alt={post.title}/>
				</ImageContainer>
				<TextArea onClick={(slug)=>this.push(post.slug)}>
					<div id={'title'}>{post.title}</div>
					<div id={'content'}dangerouslySetInnerHTML={ {__html: post.contents}}></div>
				</TextArea>
				{this.props.user.type == 3 &&
				<Action>
					<ButtonWhite onClick={(id)=>this.props.update(post.id)}>Update</ButtonWhite>
					<ButtonRed onClick={(id)=>this.props.delete(post.id)}>Delete</ButtonRed>
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
export default withRouter(connect(MapStateToProps,MapDispatchToProps) (PostContainer));