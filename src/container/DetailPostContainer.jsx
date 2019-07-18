import React, {Component} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

import axios from 'axios';
import Loader from "../components/Loader";
import CompNavigationBar from "../components/CompNavigationBar";
import Breadcrumb from "../components/Breadcrumb";
import TagsComponent from "../components/TagsComponent";
import PostContainer from "./PostContainer";

const Container = styled('div')`
	width: 80%;
	margin: 0 auto;
`
const ImageContainer = styled('div')`
		
		margin: 0 auto;
		height: 50vh;
		padding: 10px;
		border: 1px skyblue solid;
		border-radius: 10px;
		background-color: honeydew;
		${'img'}{
			width: 100%;
			height: 100%;
		}
`;
const TextArea  = styled('div')`
	${'#title'}{
		font-size: 30px;
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
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30vh;
		background-color: white;
		border: 0.2px grey solid;
		margin: 20px auto;
	}
	margin: 0 auto;
	width: 90%;
	font-size: 15px;
`
const TagContainer = styled('div')`
	${'#newTag'}{
		width: 100%;
		background-color: darkgrey;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	width: 80%;
	overflow-y: auto;
	height: 300px;
	margin: 0 auto;
	background-color: whitesmoke;	
`;
const RecomentConteiner = styled('div')`
	width: 80%;
	display: flex;
	justify-content: space-aroun 	d;
	overflow-y: auto;
	align-items: center;
	margin: 0 auto;
`
class DetailPostContainer extends Component {
	state = {
		recoment:[],
		post:null,
		isLoading: true
	}
	componentDidMount() {
		this.fetchSlug(this.props.match.params.slug);
		this.fetchRecoment();
	}
	search(id){
		console.log(id)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		this.fetchSlug(nextProps.match.params.slug);
	}

	fetchSlug(slug){
		this.setState({isLoading:true})
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				Authorization : 'Bearer '+token,
			}
		};
		let payload = new FormData();
		payload.append('slug',slug);
		axios.post(`http://127.0.0.1:8000/getPostWithSlug`,payload,config).then((response)=>{
			this.setState({post:response.data.posts,isLoading:false});
		}).catch((error)=>{
			console.log(error)
		})
	}

	fetchRecoment(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				Authorization : 'Bearer '+token,
			}
		};
		axios.get(`http://127.0.0.1:8000/getFourPost`,config).then((response)=>{
			this.setState({recoment:response.data.posts});
		}).catch((error)=>{
			console.log(error)
		})
	}
	render() {
		return (
			<React.Fragment>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}></div>
				<Breadcrumb/>
				{this.state.isLoading && <Loader/>}
				<Container>
					<ImageContainer>
						{this.state.post && <img src={"http://localhost:8000/" + this.state.post.picture_id} alt=""/>}
					</ImageContainer>
					<TextArea>
						{this.state.post &&<div id={'title'}>{this.state.post.title}</div>}
						{this.state.post && <div id={'content'}dangerouslySetInnerHTML={ {__html: this.state.post.contents}}></div>}
					</TextArea>
					<TagContainer>
						<div style={{margin:'0 auto', width:'100%',textAlign:'center'}}><h2>Tags</h2></div>
						{this.state.post && this.state.post.tags.map((key)=>
							(<TagsComponent tags={key} checked={this.state.post.tags} click={(id)=>this.search(id)}/>))}
					</TagContainer>
					<RecomentConteiner>
						{this.state.recoment && this.state.recoment.map((key)=>[
							<PostContainer post={key} update={(id)=>this.update(id)} delete={(id)=>this.delete(id)}/>
						])}
					</RecomentConteiner>
				</Container>
			</React.Fragment>
		);
	}
}

export default withRouter(DetailPostContainer);