import React, {Component} from 'react';
import CompNavigationBar from "../components/CompNavigationBar";
import {connect} from "react-redux";
import Jumbotron from "../container/Jumbotron";
import ApartementContainer from "../container/ApartementContainer";
import styled from 'styled-components';
import axios from 'axios';
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import {MiniLoader} from "../Utility";
import KostContainer from "../container/KostContainer";

const myAxios = axios.create({validateStatus:false});
const Container = styled('div')`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	overflow-x: revert;
	align-items: center;
`
const Dropdown = styled('div')`
	margin: 15px;
	width:90%;
`
const Message= styled('div')`
	width: 100%;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #27ad27;
	font-size: 20px;
	font-weight: bold;
`
const ContainerProperty = styled('div')`
	@media only screen and (max-width: 991px){
		overflow-x: auto;
	}
	justify-content: center;
	flex-wrap: nowrap;
	width: 90%;
	display: flex;
	overflow-x: auto;
`
class RootPage extends Component {
	state = {
		apartements : null,
		city : '',
		dataCities : [],
		longitude: '',
		latitude: ''
	}


	componentWillMount() {
		this.getLocation();
		this.fetchCity();
	}

	fetchProperties(){
		let longitude = this.state.longitude;
		let latitude = this.state.latitude;
		let payload = {
			'longitude':longitude,
			'latitude':latitude
		}
		myAxios.post(`http://localhost:8000/getFourApartement`,payload).then((response)=>{
			this.setState({apartements:response.data.apartements});
			console.log(payload)
		}).catch((error)=>{
			console.log(error)
		});
		myAxios.post(`http://localhost:8000/getFourKost`,payload).then((response)=>{
			this.setState({kosts:response.data.kosts});
		}).catch((error)=>{
			console.log(error)
		});
	}

	fetchCity(){
		myAxios.get(`http://127.0.0.1:8000/getAllCity`).then((response)=>{
			this.setState({dataCities:response.data.cities})
		}).catch((error)=>{
			console.log(error)
		});
	}
	checkAdmin(){
		const user = this.props.user;
		if(user.type == 2){
			window.location.href = '/owner-page'
		}
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				this.setState({longitude:position.coords.longitude,latitude:position.coords.latitude},()=>this.fetchProperties());
			});
		} else {
			console.log('Geolocation is not supported by this browser.')
		}
	}

	handleCityApart(event){

		let city = event.target.value;
		let payload = {
			'city_id' :city
		}

		this.setState({apartements:[]},
			()=>{
				myAxios.post(`http://localhost:8000/getFourApartement`,payload).then((response)=>{
					this.setState({apartements:response.data.apartements});
				}).catch((error)=>{
					console.log(error);
				});
			});
	}
	handleCityKost(event){
		let city = event.target.value;
		let payload = {
			'city_id' :city
		}
		this.setState({kosts:[]},
			()=>{
				myAxios.post(`http://localhost:8000/getFourKost`,payload).then((response)=>{
					this.setState({kosts:response.data.kosts});
				}).catch((error)=>{
					console.log(error);
				});
			});
	}
	render() {
		return (
			<Container >
				{this.props.user && this.checkAdmin()}
				<CompNavigationBar/>
				<Jumbotron/>
				<Dropdown>
					Rekomendasi Apartement untuk Anda di
					<br/>
					<select onChange={(event)=>this.handleCityApart(event)} style={{width:'30%',
						borderRadius: '5px', color:'#27ad27', fontSize:'15px',height:'30px'}}   >
						{
							this.state.dataCities && this.state.dataCities.map((key)=>(
									<option value={key.id}>{key.name}</option>
								)
							)
						}
					</select>
				</Dropdown>
				<ContainerProperty>
				{this.state.apartements && this.state.apartements.map((key)=>(
					<ApartementContainer property={key}/>
				))}
				</ContainerProperty>
				<Dropdown>
					Rekomendasi Kamar untuk Anda di
					<br/>
					<select onChange={(event)=>this.handleCityKost(event)} style={{width:'30%',
						borderRadius: '5px', color:'#27ad27', fontSize:'15px',height:'30px'}}   >
						{
							this.state.dataCities && this.state.dataCities.map((key)=>(
									<option value={key.id}>{key.name}</option>
								)
							)
						}
					</select>
				</Dropdown>
				<ContainerProperty>
					{this.state.kosts && this.state.kosts.map((key)=>(
						<KostContainer property={key}/>
					))}
				</ContainerProperty>
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


export default connect(MapStateToProps,MapDispatchToProps)(RootPage);