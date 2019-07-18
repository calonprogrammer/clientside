import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import axios from 'axios';
import Loader from "../components/Loader";


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
	overflow-y: auto;
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

class AdminMainPage extends Component {
	state ={
		isLoading :true,
		data : null
	}
	componentWillMount() {
		this.fetchData();
	}
	fetchData(){

		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers : {
				Authorization :'Bearer ' +token
			}
		}
		axios.get(`http://127.0.0.1:8000/admin/analysisAdmin`,config).then((response)=>{
			this.setState({isLoading :false})
			this.setState({data:response.data})
		});
	}

	render() {
		return (
			<Fragment>
				{this.state.isLoading && <Loader/>}
				{this.state.data &&
					<Container>
						<div id={'content'}>
							<Content>
								<div id={'title'}>Jumlah User Aktif</div>
								<div id={'focus'}>{this.state.data.users.length}</div>
							</Content>
							<Content>
								<div id={'title'}>Jumlah Properties </div>
								<div id={'focus'}>{this.state.data.properties.length}</div>
							</Content>
							<Content>
								<div id={'title'}>Jumlah Premium</div>
								<div id={'focus'}>{this.state.data.premiums.length}</div>
							</Content>
							<Content>
								<div id={'title'}>Jumlah Reviews</div>
								<div id={'focus'}>{this.state.data.reviews.length}</div>
							</Content>
							<Content>
								<div id={'title'}>Jumlah Data Facilty</div>
								<div id={'focus'}>{this.state.data.facilities.length}</div>
							</Content>
							<Content>
								<div id={'title'}>Jumlah Laporan</div>
								<div id={'focus'}>{this.state.data.reports.length}</div>
							</Content>
							<Content>
								<div id={'title'}>Jumlah User Premium</div>
								<div id={'focus'}>{this.state.data.userPremiums.length}</div>
							</Content>
						</div>
					</Container>
				}

			</Fragment>
		);
	}
}

export default AdminMainPage;