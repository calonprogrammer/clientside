import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import axios from 'axios';
import Loader from "../components/Loader";
import Breadcrumb from "../components/Breadcrumb";

const Container = styled('div')`
	${'#content'}{
		&:hover{
		    box-shadow: 0px 2px 5px 2px #888888;
		    transition: 0.2s;
	  	}
		text-align: center;
		line-height: 50px;
		width: 80%;
		margin: 0 auto;
		box-shadow:
		0 1px 1px rgba(0,0,0,0.15),
		0 10px 0 -5px #eee,
		0 10px 1px -4px rgba(0,0,0,0.15),
		0 20px 0 -10px #eee,
		0 20px 1px -9px rgba(0,0,0,0.15);	
	}
height: 85vh;
width: 100%;
margin: 30px auto;
background: #fff;
display: flex;
justify-content: center;
align-items: center;
`;

const Content= styled('div')`
	${'#title'}{
		text-align: center;
		color: #999999;
		font-size: 20px;
	}
	${'#focus'}{
		text-align: center;
		font-size: 30px;
	}
		
  @media only screen and (max-width: 991px){
  	min-width: 200px;
  }
  &:hover{
    box-shadow: 0px 2px 5px 2px #888888;
    transition: 0.2s;
    background-color: white;
  }
  background-color: lavender;
  margin-left:15px ;
  margin-bottom:15px ;
  min-width: 300px;
  display: inline-block;
  transition: 0.2s;
  box-shadow: 0px 0.3px 0.3px 0.3px #888888;
  box-sizing: border-box;
  border-radius: 5px;
`;
class OwnerDashboardContainer extends Component {
	state = {
		user : '',
		isLoading : true
	}
	componentDidMount() {
		this.fetchData();
	}

	fetchData(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config ={
			headers :{
				Authorization : 'Bearer '+token
			}
		}
		axios.get(`http://127.0.0.1:8000/owner/getOwnerDetail`,config).then((response)=>{
			this.setState({user:response.data.user,isLoading:false})
		}).catch((error)=>{
			this.setState({isLoading:false});
		});
	}
	handleReview(){
		let a = 0;
		this.state.user.properties.map((key)=>{
			a+=key.review.length;
		});
		return a;
	}
	handleTotalViewed(){
		let a = 0;
		this.state.user.properties.map((key)=>{
			a+=key.total_view;
		});
		return a;
	}

	render() {
		let user = this.state.user;
		return (
			<Fragment>
				{this.state.isLoading && <Loader/>}
				{user &&
					<Container>
						<div id={'content'}>
								<Content>
									<div id={'title'}>Your Follower</div>
									<div id={'focus'}>{user.follower.length}</div>
								</Content>

								<Content>
									<div id={'title'}>Your Review</div>
									<div id={'focus'}>{this.handleReview()}</div>
								</Content>
								<Content>
									<div id={'title'}>Your Properties</div>
									<div id={'focus'}>{user.properties.length}</div>
								</Content>
								<Content>
									<div id={'title'}>Total Viewed Properties</div>
									<div id={'focus'}>{this.handleTotalViewed()}</div>
								</Content>
						</div>
					</Container>}
			</Fragment>
		);
	}
}


export default OwnerDashboardContainer;