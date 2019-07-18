import React, {Component} from 'react';
import styled from 'styled-components';
import CompNavigationBar from "../components/CompNavigationBar";
import Breadcrumb from "../components/Breadcrumb";
import axios from "axios";
import PostContainer from "../container/PostContainer";
import {ButtonRed, ButtonWhite} from "../Utility";
import TagsComponent from "../components/TagsComponent";

const Container = styled('div')`
	@media only screen and (max-width: 991px){
		width: 100%;
	}
	${'#judul'}{
		text-align: center;
		font-size: 40px;
		width: 100%;
	}
	display: flex;
	margin: 30px auto;
	justify-content: space-around;
	flex-wrap: wrap;
	background: #fff;
	width: 60%;
  	box-shadow:
    0 1px 1px rgba(0,0,0,0.15),
    0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0,0,0,0.15),
    0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0,0,0,0.15);
`;
const CurrentPage = styled('div')`
	background-color: #27ad27;
	width: 50px;
	border-radius: 5px;
	color: white;
	font-size: 20px;
	text-align: center;
	line-height: 50px;	
`;
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
class UserPostPage extends Component {
	state = {
		posts : [],
		paginate : null,
		isLoading:true,
		currentId: null,
		popModal :false,
		popMessage:false,
		message:'',
		valid:false,
		dataTag :[]
	}
	componentDidMount() {
		this.fetchData();
		this.getTags();
	}
	search(id){
		this.setState({isLoading:true})
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				Authorization : 'Bearer '+token,
			}
		};
		axios.get(`http://127.0.0.1:8000/getPostWithTag/`+id,config).then((response)=>{
			this.setState({posts:response.data.posts,isLoading:false});
		}).catch((error)=>{
			console.log(error)
		})
	}
	fetchData(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				Authorization : 'Bearer '+token,
			}
		}
		axios.get(`http://127.0.0.1:8000/getPosts`,config).then((response)=>{
			const{data,...paginate} = response.data.posts;
			this.setState({posts:data,paginate:paginate,isLoading:false});
			console.log(response)
		}).catch((error)=>{
			console.log(error)
		})
	}
	next(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));

		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`${this.state.paginate.next_page_url}`,config).then((response)=>{
			const {data, ...paginate} = response.data.posts;
			this.setState({posts: data ,paginate: paginate,isLoading: false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false})
		});
	}
	prev(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));

		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`${this.state.paginate.prev_page_url}`,config).then((response)=>{
			const {data, ...paginate} = response.data.posts;
			this.setState({posts: data ,paginate: paginate,isLoading: false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false})
		});
	}
	getTags(){
		axios.get(`http://127.0.0.1:8000/getTags`).then((response)=>{
			this.setState({dataTag:response.data.tags,isLoading:false});
		}).catch((error)=>{
			this.setState({isLoading:false});
			console.log(error);
		})
	}
	render() {
		return (
			<React.Fragment>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}></div>
				<Breadcrumb/>
				<TagContainer>
					<div style={{margin:'0 auto', width:'100%',textAlign:'center'}}><h2>Tags</h2></div>
					{this.state.dataTag.map((key)=>
						(<TagsComponent tags={key} checked={this.state.dataTag} click={(id)=>this.search(id)}/>))}
				</TagContainer>
				<Container>
					{this.state.posts && this.state.posts.map((key)=>[
						<PostContainer post={key} update={(id)=>this.update(id)} delete={(id)=>this.delete(id)}/>
					])}
				</Container>
				<div style={{background:'whitesmoke',margin:'0 auto', width:'50%',display:'flex',justifyContent:'space-between'}}>
					<ButtonRed onClick={()=>this.prev()}>Prev</ButtonRed>
					<CurrentPage>
						{this.state.paginate && this.state.paginate.current_page}
					</CurrentPage>
					<ButtonWhite onClick={()=>this.next()}>Next</ButtonWhite>
				</div>
			</React.Fragment>
		);
	}
}
export default UserPostPage;