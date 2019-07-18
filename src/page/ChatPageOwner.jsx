import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from "../components/Loader";
import Channel from "../components/Channel";
import {connect} from "react-redux";

const Container = styled('div')`
	overflow-y: auto;
	margin: 0 auto;
	width: 80%;
	background-color: whitesmoke;
`


class ChatPageOwner extends Component {
	state = {
		isLoading:true,
		channels : []
	};

	componentWillMount() {
		this.fetchData();
	}

	fetchData(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config ={
			headers :{
				Authorization : 'Bearer '+token
			}
		};
		axios.get(`http://127.0.0.1:8000/owner/getAllChat`,config).then((response)=>{
			this.setState({channels:response.data.channel})
			this.setState({isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
		});
	}

	render() {
		return (
			<Fragment>
				{this.state.isLoading && <Loader/>}
				<Container>
					{this.state.channels.map((key)=>(
						<Channel chat={key} />
					))}
				</Container>
			</Fragment>
		);
	}
}
const MapStateToProps = state => {
	return{
		user:state.user,
		coords:state.coords
	}
};
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
};
export default connect(MapStateToProps,MapDispatchToProps) (ChatPageOwner);
