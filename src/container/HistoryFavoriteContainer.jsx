import React, {Component} from 'react';
import styled from "styled-components";
import Loader from "../components/Loader";
import axios from "axios";
import ApartementContainer from "./ApartementContainer";
import KostContainer from "./KostContainer";
import {ButtonRed, ButtonWhite} from "../Utility";


const Container = styled('div')`
	width: 100%;
	margin-top: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
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
class HistoryFavoriteContainer extends Component {
	state  ={
		favorites : [],
		paginate : null,
		isLoading : true
	}
	componentDidMount() {
		this.fetchData();
	}

	fetchData(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`http://127.0.0.1:8000/guest/getFavoriteHistory`,config).then((response)=>{
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
			const {data, ...paginate} = response.data.favorite;
			this.setState({favorites: data,paginate:paginate,isLoading:false});
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
		axios.get(`${this.state.paginate.prev_page_url}`,config).then((response)=>{
			const {data, ...paginate} = response.data.favorite;
			this.setState({favorites: data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
		});
	}
	render() {
		return (
			<React.Fragment>
				{this.state.isLoading && <Loader/>}
				<Container>
						{this.state.favorites.map((key)=>(
							this.handleProperty(key)
						))}
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
			</React.Fragment>
		);
	}
}

export default HistoryFavoriteContainer;