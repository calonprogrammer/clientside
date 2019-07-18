import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PostContainer from "./PostContainer";
import {ButtonRed, ButtonWhite, ConfirmModal, PopMessage} from "../Utility";
import Loader from "../components/Loader";
const Container = styled('div')`
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


class ViewPostContainer extends Component {
	state = {
		posts : [],
		paginate : null,
		isLoading:true,
		currentId: null,
		popModal :false,
		popMessage:false,
		message:'',
		valid:false
	}
	componentDidMount() {
		this.fetchData();
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
	update(id){
		console.log(id);
	}
	delete(id){
		this.setState({currentId : id});
		this.setState({popModal: true});
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
	agreeDeleted(id){
		this.setState({isLoading : true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = {
			id :id
		}
		let config = {
			headers: {
				Authorization: "Bearer " + token
			}
		}
		axios.post(`http://127.0.0.1:8000/admin/deletePost`,payload,config).then((response)=>{
			this.setState({message:response.data.message,valid:true,isLoading:false,popMessage:true},()=>this.fetchData());
		}).catch((error)=>{
			this.setState({message:error.response.data.message,valid:false,isLoading:false,popMessage:true});
		});
	}
	render() {
		return (
			<React.Fragment>
				<ConfirmModal  visibility={this.state.popModal} action={'Delete Post'} agree={(id)=>this.agreeDeleted(this.state.currentId)} cancel={()=>this.setState({popModal:false})}/>
				{this.state.isLoading && <Loader/>}
				<Container>
					<div id={'judul'}>View Post</div>
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

export default ViewPostContainer;