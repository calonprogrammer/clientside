import React, {Component} from 'react';
import styled from 'styled-components';
import Loader from "../components/Loader";
import UserComponents from "../components/UserComponents";
import axios from 'axios';
import CompNavigationBar from "../components/CompNavigationBar";
import Breadcrumb from "../components/Breadcrumb";
import SearchBarContainer from "../container/SearchBarContainer";
import UserVerificator from "../UserVerificator";
const Container = styled('div')`
	@media only screen and (max-width: 991px){
		width: 90%;
	}
	width: 80%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	margin: 0 auto;
`;

class FollowingPage extends Component {
	state ={
		isLoading : true,
		paginate : null,
		users: []
	};

	componentDidMount() {
		this.fetchFollowing();
		window.addEventListener("scroll", ()=>this.scrollfetch());
	};
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.user){
			if(nextProps.user.type !== 1){
				window.location.href = '/';
			}
		}
	};
	search(value){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		let payload = new FormData();
		payload.append('key',value);
		axios.post(`http://127.0.0.1:8000/guest/search`,payload,config).then((response)=>{
			const {data, ...paginate} = response.data.following;
			this.setState({users:data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			this.setState({isLoading:false})
		})
	}
	fetchFollowing(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`http://127.0.0.1:8000/guest/getFollowing`,config).then((response)=>{
			const {data, ...paginate} = response.data.following;
			this.setState({users:data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			this.setState({isLoading:false})
		})
	};

	fetchMore(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`${this.state.paginate.next_page_url}`,config).then((response)=>{
			const {data, ...paginate} = response.data.following;
			this.setState({users:this.state.users.concat(data),paginate:paginate,isLoading:false});
		}).catch((error)=>{
			this.setState({isLoading:false})
		})
	};
	scrollfetch(){
		if (window.scrollY + window.innerHeight >= document.body.offsetHeight-50) {
			if(!this.state.isLoading && this.state.paginate.next_page_url !== null){
				this.fetchMore();
			}
		}
	}
	unfollow(id){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.delete(`http://127.0.0.1:8000/guest/unfollow/${id}`,config).then((response)=>{
			this.fetchFollowing();
		}).catch((error)=>{
			console.log(error);
		})
	};
	render() {
		return (
			<React.Fragment>
				<UserVerificator role={'1'} loged={true}/>
				{this.state.isLoading && <Loader/>}
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}/>
				<Breadcrumb/>
				<Container>
					<SearchBarContainer search={(value)=>this.search(value)}/>
					{
						this.state.users.map((key)=>(
							<UserComponents users={key} unfollow={(id)=>this.unfollow(id)}/>
						))
					}
				</Container>
			</React.Fragment>
		);
	}
}


export default FollowingPage;