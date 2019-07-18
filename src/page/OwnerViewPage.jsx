import React, {Component} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import CompNavigationBar from "../components/CompNavigationBar";
import axios from "axios";
import ApartementContainer from "../container/ApartementContainer";
import KostContainer from "../container/KostContainer";
import Breadcrumb from "../components/Breadcrumb";
import Loader from "../components/Loader";
import {ButtonWhite} from "../Utility";
import {connect} from "react-redux";
import Footer from "../components/Footer";
import UserVerificator from "../UserVerificator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMailBulk} from "@fortawesome/free-solid-svg-icons";
const myAxios = axios.create({validateStatus:false});
const Container = styled('div')`
	
	${'#title'}{
		font-size: 30px;
		font-weight: bold;
		color: tomato;
	}
	width: 100%;
	
`
const ContainerProperty = styled('div')`
	@media only screen and (max-width: 991px){
		overflow-x: auto;
	}
	margin: 0 auto;
	justify-content: center;
	flex-wrap: wrap;
	width: 90%;
	display: flex;
	align-items: center;
	background-color: lightgrey;
`

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
`


const DetailUser = styled('div')`
	@media only screen and (max-width: 991px){
		width: 90%;
	}		
	${'table'}{
		margin: 0 auto;
		font-size: 20px;
	}
	
	width: 50%;
	margin: 0 auto;
	background-color: whitesmoke;
`

const ButtonFollowing = styled('button')`
	&:hover{
		cursor: pointer;	
	}
	width: 50%;
	color: whitesmoke;
	font-weight: bold;
	line-height: 30px;
	border-radius: 40px;
	color: white;
	background-color: cornflowerblue;
`;

class OwnerViewPage extends Component {
	state = {
		followChecked : false,
		user: null,
		properties :null,
		apartements:null,
		kosts:null,
		isLoading:true,
		followed :false,
		channel : null
	}

	componentDidMount() {
		this.getUser(this.props.match.params.id);

	}
	getUser(slug){
		let payload = new FormData();
		payload.append('user_id',slug);
		myAxios.post('http://127.0.0.1:8000/getUser',payload).then((response)=>{
			this.setState({user:response.data.user,
				kosts: response.data.kosts.data,
				apartements:response.data.apartements.data});
			this.setState({isLoading:false});
		}).catch((error)=>console.log(error));
	}
	gotoChat(id){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				Authorization : 'Bearer '+token
			}
		};
		let payload = new FormData();
		payload.append('owner_id',id);
			axios.post(`http://127.0.0.1:8000/guest/checkChannel`,payload,config).then((response)=>{
				this.setState({channel: response.data.channel},
					()=>this.props.history.push('/chat/'+this.state.channel.id+'/'+id));
			}).catch((error)=>{
				console.log(error)
			});
	}
	filter(){
		let kost = this.state.properties.filter(function (f) {
			return f.propertiable_type === "App\\House";
		});

		this.setState({kosts:kost});
		let apart = this.state.properties.filter(function (f) {
			return f.propertiable_type === "App\\Apartement";
		});

		this.setState({apartements:apart});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.user && this.state.followed === false && this.state.followChecked === false){
			this.checkFollowed()
		}
	}

	checkFollowed(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = new FormData();
		payload.append('from_id',this.props.user.id);
		payload.append('to_id',this.state.user.id);
		myAxios.post(`http://127.0.0.1:8000/guest/getFollow?token=${token}`,payload).then((response)=>{
			this.setState({followed : response.data.followed});
		}).catch((error)=>{
			console.log(error);
		});
	}

	follow(id){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = new FormData();
		payload.append('from_id',this.props.user.id);
		payload.append('to_id',id);
		myAxios.post(`http://127.0.0.1:8000/guest/follow?token=${token}`,payload).then((response)=>{
			this.setState({followed : response.data.followed,followChecked:true});
		}).catch((error)=>{
			console.log(error);
		});
	}
	render() {
		return (
				<Container>
					<UserVerificator loged={true} role={'1'}/>
				{this.state.isLoading && <Loader/>}
				<CompNavigationBar green={true}/>
				<div style={{height:'50px'}}></div>
				<Breadcrumb/>
				<DetailUser>
				<ImageContainer>
					{
						this.state.user &&
						<img src={"http://localhost:8000/"+this.state.user.picture_id} alt="Image Not Found"/>
					}
				</ImageContainer>
					{this.state.user &&
					<table>
						<tr>
							<td>Nama</td>
							<td>: {this.state.user.name}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>: {this.state.user.email}</td>
						</tr>
						<tr>
							<td>Phone</td>
							<td>: {this.state.user.phone}</td>
						</tr>
					</table>
					}
					{this.props.user && this.props.user.type == 1 &&
						<div style={{textAlign:'center'}}>
							<div style={{width:'50%', margin: '10px auto',textAlign:'center'}}>
							<ButtonFollowing onClick={(id)=>this.follow(this.state.user.id)}
							                 style={{backgroundColor: this.state.followed ? 'red':'cornflowerblue'}} >
								{this.state.followed ? 'Unfollow': 'Follow'}
								</ButtonFollowing>
							</div>
							<ButtonWhite onClick={(id)=>this.gotoChat(this.state.user.id)}>
								<FontAwesomeIcon icon={faMailBulk}/>
							</ButtonWhite>
						</div>
					}
				</DetailUser>
				<div style={{textAlign:'center'}}>
					<div id={'title'}>Apatement</div>
					<ContainerProperty>
						{this.state.apartements && this.state.apartements.map((key)=>(
							<ApartementContainer property={key}/>
						))}
					</ContainerProperty>
					<div id={'title'}>Kost</div>
					<ContainerProperty>
						{this.state.kosts && this.state.kosts.map((key)=>(
							<KostContainer property={key}/>
						))}
					</ContainerProperty>
				</div>
				<Footer/>
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


export default withRouter(connect(MapStateToProps,MapDispatchToProps) (OwnerViewPage)) ;