import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import Breadcrumb from "../components/Breadcrumb";
import CompNavigationBar from "../components/CompNavigationBar";
import axios from 'axios';
import Loader from "../components/Loader";
import ApartementContainer from "../container/ApartementContainer";
import LeafletMap from "../components/LeafletMap";
import KostContainer from "../container/KostContainer";

const Container = styled('div')`
	width: 100%;
	display: flex;
	@media only screen and (max-width: 991px){
		display: block;
	}
	${'#left'}{
		${'#leafletContainer'}{
			width: 100%;
			height: 100%;
		}
		@media only screen and (max-width: 991px){
			width: 100%;
			height: 30vh;
		}
		position: sticky;
		top: 0;
		height: 100vh;
		width: 40%;
		background-color: #61dafb;
	}
	${'#right'}{
		@media only screen and (max-width: 991px){
			width: 100%;
			height: 70vh;
		}
		padding: 20px;
		width: 60%;
		background-color: #27ad27;	
		overflow-y: auto;
		box-sizing: border-box;
		text-align: center;
	}
	
	
`
class SearchingKostPage extends Component {
	state = {
		properties :[],
		isLoading :true,
		coords: [0,0],
		paginate:null
	};

	componentWillMount() {
		window.addEventListener("scroll", ()=>this.scrollfetch());
	}

	componentDidMount() {
		this.getLocation();
	}

	scrollfetch(){
		if (window.scrollY + window.innerHeight >= document.body.offsetHeight-50) {
			if(!this.state.isLoading && this.state.paginate.next_page_url !== null){
				this.fetchMore();
			}
		}
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
					this.setState({coords:[position.coords.latitude,position.coords.longitude]},()=>this.fetchNearby())},
				()=>this.setState({coords:[-6.2026 ,106.776]}));
		} else {
			console.log('Geolocation is not supported by this browser.')
		}
	}

	fetchNearby(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers: {
				Authorization : 'Bearer '+token
			}
		}
		let payload = new FormData();
		payload.append('latitude',this.state.coords[0]);
		payload.append('longitude',this.state.coords[1]);

		axios.post(`http://127.0.0.1:8000/getNearbyKost`,payload,config).then((response)=>{
			const{data,...paginate} = response.data.properties;
			this.setState({properties:data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			console.log(error)
		})
	}
	fetchMore(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		let payload = new FormData();
		payload.append('latitude',this.state.coords[0]);
		payload.append('longitude',this.state.coords[1]);
		axios.post(`${this.state.paginate.next_page_url}`,payload,config).then((response)=>{
			const{data,...paginate} = response.data.properties;
			this.setState({properties:this.state.properties.concat(data),paginate:paginate,isLoading:false});
		}).catch((error)=>{
			this.setState({isLoading:false})
		})
	};

	handleMap(event){
		this.setState({coords:[event.latlng.lat,event.latlng.lng]},()=>this.fetchNearby());
	}
	render() {
		return (
			<Fragment>
				{this.state.isLoading &&<Loader/>}
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}></div>
				<Breadcrumb/>
				<Container>
					<div id={'left'}>
						{this.state.coords &&<LeafletMap coords={this.state.coords} zoom={17} click={(event)=>this.handleMap(event)}/>}
					</div>
					<div id={'right'}>
						{this.state.properties && this.state.properties.map((key)=>(
							<KostContainer property={key}  />
						))}
					</div>
				</Container>
			</Fragment>
		);
	}
}

export default SearchingKostPage;