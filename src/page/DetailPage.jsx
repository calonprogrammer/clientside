import React, {Component} from 'react';
import styled from 'styled-components';
import Breadcrumb from "../components/Breadcrumb";
import CompNavigationBar from "../components/CompNavigationBar";
import axios from 'axios';
import ApartementDetailContainer from "../container/ApartementDetailContainer";
import KostDetailContainer from "../container/KostDetailContainer";
import ApartementContainer from "../container/ApartementContainer";
import KostContainer from "../container/KostContainer";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
const myAxios = axios.create({validateStatus:false});

const Container = styled('div')`
	width: 100%;
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
	margin: 0 auto;
`

class DetailPage extends Component {
	state = {
		property : '',
		reviews : '',
		apartements:[],
		kosts :[],
		isLoading:false
	}


	componentDidMount() {
		this.getProperty(this.props.match.params.slug);
		this.getRandomProperty()
	}
	getProperty(slug){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				authorization : 'Bearer ' + token
			}
		}

		this.setState({isLoading:true})
		myAxios.get(`http://127.0.0.1:8000/getPropertyWithSlug?slug=${slug}`,config).then((response)=>{
			this.setState({property:response.data.property});
			this.setState({reviews:response.data.review,isLoading:false});
		}).catch((error)=>{
			console.log(error)
		})
	}

	getRandomProperty(){
		myAxios.get(`http://127.0.0.1:8000/getRandomApartement`).then((response)=>
			this.setState({apartements:response.data.apartements})).catch((error)=>console.log(error));
		myAxios.get(`http://127.0.0.1:8000/getRandomKost`).then((response)=>
			this.setState({kosts:response.data.kosts})).catch((error)=>console.log(error));
	}


	componentWillReceiveProps(nextProps, nextContext) {
		this.getProperty(nextProps.match.params.slug);
	}

	render() {
		let property = this.state.property;
		let review = this.state.reviews;
		return (
			<Container>
				{this.state.isLoading &&<Loader/>}
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}></div>
				<Breadcrumb/>
				{
					review && property && property.propertiable_type === "App\\Apartement"?
						<div>
							<ApartementDetailContainer property={property} review={review} refresh={()=>this.getProperty()}/>
							<center><h2>Rekomendasi Apartement untuk anda</h2></center>
							<ContainerProperty>
								{this.state.apartements && this.state.apartements.map((key)=>(
									<ApartementContainer property={key}/>
								))}
							</ContainerProperty>
						</div>:
						<div>
							<KostDetailContainer property={property} review={review}/>
							<center><h2>Rekomendasi Kamar untuk anda</h2></center>
							<ContainerProperty>
								{this.state.kosts && this.state.kosts.map((key)=>(
									<KostContainer property={key}/>
								))}
							</ContainerProperty>
						</div>
				}
				<Footer/>
			</Container>
		);
	}
}

export default DetailPage;