import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {Link,Switch,Route,withRouter,Redirect} from "react-router-dom";
import {ButtonRed, ButtonWhite} from "../Utility";
import ApartementContainer from "./ApartementContainer";
import KostContainer from "./KostContainer";
import axios from "axios";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
const myAxios = axios.create({validateStatus:false});

const Container = styled('div')`
	@media only screen and (max-width: 991px){
		display: block;
		width: 100%;
		margin: 0 auto;
	}
	width: 80%;
	margin: 0 auto;
	text-align: center;
`


const ProfilePicture = (props) =>{
	const Picture = styled('div')`
		${'img'}{
			height: 100%;
			width: 100%;
		}
		width: 13em;
		height: 13em;
		border-radius: 100%;
		overflow: hidden;
		background-color: white;
		margin: 0 auto;
	`
	return(
		<Picture>
			{props.image && <img src={"http://localhost:8000/"+props.image} alt=""/>}
			{!props.image && <img src={"http://localhost:8000/"+props.image} alt=""/>}
		</Picture>
	);
};

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
`;

const NameContainer = styled('div')`
	text-align: center;
	color: tomato;
	font-size: 30px;
	width: 100%;
	min-width: 90px ;
`;
const Detail = styled('div')`
	text-align: center;
	margin: 0 auto;
	${'div'}{
		font-size: 20px;
		line-height: 30px;
	}
	
`;
const CurrentPage = styled('div')`
	background-color: #27ad27;
	width: 50px;
	border-radius: 5px;
	color: white;
	font-size: 20px;
	text-align: center;
	line-height: 50px;	
`
class ProfileContainer extends Component {
	state ={
		user : null,
		apartements : null,
		kosts : null,
		favorites : [],
		paginate : null,
		isLoading:true
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.user){
			window.location.href = '/';
		}
		if(nextProps.user){
			if(nextProps.user.type != 1){
				window.location.href = '/';
			}
		}
	}

	componentWillMount() {
		this.getUser()

	}
	getUser(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		myAxios.post(`http://127.0.0.1:8000/guest/getPropertyFavorite/${this.props.match.params.id}`,null,config).then((response)=>{
			const {data, ...paginate} = response.data.favorite;
			this.setState({user:response.data.user,isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
		});
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
		myAxios.post(`${this.state.paginate.next_page_url}`,null,config).then((response)=>{
			const {data, ...paginate} = response.data.favorite;
			this.setState({user:response.data.user,
				favorites: data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
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
		myAxios.post(`${this.state.paginate.prev_page_url}`,null,config).then((response)=>{
			const {data, ...paginate} = response.data.favorite;
			this.setState({user:response.data.user,
				favorites: data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
		});
	}

	handleProperty(key){
		if(key.property.propertiable_type===`App\\Apartement`){
			return <ApartementContainer property={key.property}/>
		}else{
			return <KostContainer property={key.property}/>
		}
	}
	showData(){
		this.setState({isLoading:true})
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		myAxios.post(`http://127.0.0.1:8000/guest/getPropertyFavorite/${this.props.match.params.id}`,null,config).then((response)=>{
			const {data, ...paginate} = response.data.favorite;
			this.setState({user:response.data.user,
				favorites: data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
		});
	}


	render() {
		return (
			<React.Fragment>{this.state.isLoading && <Loader/> }
				<Container>

							{(this.state.user && this.state.user.picture_id) &&
							<ProfilePicture image={this.state.user.picture_id}/>
							}
							<NameContainer>
								{this.state.user && this.state.user.name}
								<br/>
								{this.state.user && this.props.user.id == this.state.user.id && <Link to={'/edit-profile'}>
									<ButtonWhite>
										Edit Profile
									</ButtonWhite>
								</Link>
								}
							</NameContainer>
					{this.props.user &&
						<Detail>
							<div>
								Email : {this.state.user && this.state.user.email}
							</div>
							<div>
								Phone : {this.state.user && this.state.user.phone}
							</div>
							<div>
								Follower : {this.state.user && this.state.user.follower.length}
							</div>

						</Detail>
					}
					{this.state.user && this.props.user.id == this.state.user.id &&
						<div style={{margin:'0 auto'}}>
							<ButtonWhite onClick={()=>this.state.favorites.length == 0 ?this.showData():this.setState({favorites:[],paginate:null})}>Show Your Favorite</ButtonWhite>
						</div>
					}
					<div style={{textAlign:'center'}}>
						<ContainerProperty>
							{this.state.favorites.map((key)=>(
								this.handleProperty(key)
							))}
						</ContainerProperty>
					</div>
					{
						this.state.paginate &&
							<div style={{
								background: 'whitesmoke',
								margin: '0 auto',
								width: '50%',
								display: 'flex',
								justifyContent: 'space-between'
							}}>
								<ButtonRed onClick={() => this.prev()}>Prev</ButtonRed>
								<CurrentPage>
									{this.state.paginate.current_page}
								</CurrentPage>
								<ButtonWhite onClick={() => this.next()}>Next</ButtonWhite>
							</div>
					}
				</Container>
				<Footer/>
			</React.Fragment>
		);
	}
}


const MapStateToProps = state => {
	return{
		user:state.user
	}
}
const MapDispatchToProps = dispatch =>{
	return{
		update_user : key =>dispatch({
			type:"update_user",
			value:key
		})
	}
}

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(ProfileContainer));