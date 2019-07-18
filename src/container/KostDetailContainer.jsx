import React, {Component} from 'react';
import styled from "styled-components";
import LeafletMap from "../components/LeafletMap";
import ReviewContainer from "./ReviewContainer";
import Footer from "../components/Footer";
import {ButtonOrange, ButtonWhite, ConfirmModal, InputTextRow, MessageError, MiniLoader, PopMessage} from "../Utility";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faPlus} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import axios from "axios";
import AddReveiwContainer from "./AddReveiwContainer";
import AverageReview from "./AverageReview";
const myAxios = axios.create({validateStatus:false});

const Container = styled('div')`
	${'#report'}{
		text-align: right;
		margin: 10px 0;
		${'button'}{
			&:hover{
				cursor: pointer;
				background-color: grey;
			}
			background-color: darkgrey;
			color: black;
			font-weight: bold;
			border: none;
			border-radius: 2px;
			line-height: 20px;
		}
	}	
	${'#image'}{
		margin: 0 auto;
		height: 50vh;
		padding: 10px;
		border: 1px skyblue solid;
		border-radius: 10px;
		background-color: honeydew;
		${'img'}{
			width: 100%;
			height: 100%;
		}
	}
	margin: 0 auto;
	width: 80%;
`;

const Content = styled('div')`
	${'#left'}{
		${'#title'}{
			display: flex;
			justify-content: space-between;
			font-weight: bold;
			font-size: 30px;
			margin: 20px auto;
			flex-direction: column;
			-webkit-box-orient: vertical;
    		-webkit-box-direction: normal;
			${'#premium'}{
				${'img'}{
					width: 30px;
				}
				font-size: 20px;
				color:#dda34b ;
			}
			${'#verified'}{
				${'img'}{
					width: 30px;
				}
				font-size: 20px;
				color:#27ad27 ;
			}
		}
		${'#owner'}{
				&:hover{
					cursor: pointer;
					color: #d24f38;
				}
				font-size: 20px;
				color: tomato;
				
		}
		width: 70%;
	}
	${'#right'}{
	    box-shadow: 0 3px 20px 0 rgba(0,0,0,.07);
    	border-radius: 3px;
    	width: 305px;
    	padding: 2.5rem;
	}
	display: flex;
	justify-content: center;
	align-items: center;
`;



const Facility = (props) =>{
	const Container = styled('div')`
	margin-left: 10px;
	text-align: center;
	border-radius: 4px;
	`;
	let facilities = props.facility !== undefined ? props.facility.filter(
		(key) => (
			key.type === props.type
		)
	):null;
	return(
		<React.Fragment>
			{facilities && facilities !== undefined ? Array.isArray(facilities) ?
				facilities.map((key)=>(
					<Container>
						<div>
							<img src={`http://127.0.0.1:8000/`+key.link} alt=""/>
						</div>
						<div>
							{key.name}
						</div>
					</Container>
				)):
				<Container>
					<img src={`http://127.0.0.1:8000/`+facilities.link} alt=""/>
					{facilities.name}
				</Container> : null
			}
		</React.Fragment>
	);
}

const Report = styled('form')`
	${"#title"}{
		font-size: 20px;
		color: #27ad27;
	}
	width: 100%;
	margin: 0 auto;
	background-color: whitesmoke;
	border-radius: 2px;
`
const Review = styled('form')`
	${"#title"}{
		font-size: 20px;
		color: #27ad27;
	}
	width: 100%;
	margin: 0 auto;
	background-color: whitesmoke;
	border-radius: 2px;
`

class KostDetailContainer extends Component {

	state = {
		miniLoader : false,
		message: '',
		popMessage : false,
		valid :false,
		popModal:false,
		currentId:'',
		report:false,
		errorContents:'',
		average:null,
		favorite: null
	}
	handleReviewPage(value){
		this.props.history.push('/detail-page/'+value+'/review-page');
	}

	doReport(id) {
		this.setState((prevState)=>({report: !prevState.report}));
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}

	submitReport(event){
		event.preventDefault();
		this.setState({errorContents:''});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let contents = event.target.elements['content'].value;
		let user_id = this.props.property.user.id;
		let property_id = this.props.property.id;
		let payload = new FormData();
		payload.append('contents', contents);
		payload.append('user_id',user_id);
		payload.append('property_id',property_id);
		this.setState({miniLoader:true});
		myAxios.post(`http://127.0.0.1:8000/guest/addReport?token=${token}`,payload).then((response)=>{
			if(response.data.message === 'Error'){
				this.setState({
					miniLoader:false,
					message: response.data.message,
					errorContents:response.data.errors.contents,
					popMessage : true,
					valid :false});
				return;
			}
			this.setState({
				miniLoader:false,
				message: response.data.message,
				popMessage : true,
				valid :true});
		}).catch((error)=>{
			console.log(error)
		});
	}

	componentWillMount() {
		this.getAverage();

	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(this.props.user){
			console.log(this.props.user)
			this.getAverage();
			this.checkLiked();
		}
	}

	checkLiked(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = new FormData();
		payload.append('user_id',this.props.user.id);
		payload.append('property_id',this.props.property.id);
		let favorite = null;
		myAxios.post(`http://127.0.0.1:8000/guest/getFavorite?token=${token}`,payload).then((response)=>{
			this.setState({favorite : response.data.favorite});
		}).catch((error)=>{
			console.log(error);
		});
		return favorite;
	}

	getAverage(){
		let payload = new FormData();
		payload.append('property_id',this.props.property.id);
		myAxios.post(`http://127.0.0.1:8000/getAverageReview`,payload).then((response)=>{
			this.setState({average:response.data.average});
		}).catch((error)=>{
			console.log(error)
		});
	}
	handleFavorite(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let payload = new FormData();
		payload.append('user_id',this.props.user.id);
		payload.append('property_id',this.props.property.id);
		myAxios.post(`http://127.0.0.1:8000/guest/handleFavorite?token=${token}`,payload).then((response)=>{
			this.setState({favorite : response.data.favorite.liked == 1 ? true :false});
		}).catch((error)=>{
			console.log(error);
		});
	}
	favorite(){
		const Container = styled('div')`
			color: pink;
			font-size: 40px;
		`
		return(
			<Container onClick={()=>this.handleFavorite()}>
				{this.state.favorite ? <FontAwesomeIcon icon={faHeart}/> : <FontAwesomeIcon style={{color:'grey'}} icon={faHeart}/>}
			</Container>
		);
	}

	render() {
		let kost = this.props.property;
		let review = this.props.review;
		return (
			<Container>
				<PopMessage click={()=>this.disablePopMessage()} message={this.state.message} valid={this.state.valid} visibility={this.state.popMessage} />
				{this.props.user && this.props.user.type == 1 ?<div id={'report'}>
					<button onClick={(id) => this.doReport(kost.id)}>
						Laporkan Apartement
					</button>
				</div>:null}
				{this.state.report &&
				<Report onSubmit={(event)=>this.submitReport(event)}>
					<span id={'title'}> Report {kost.name} Apartemetnt</span>
					<InputTextRow>
						Content
						<input type="text" name="content" id=""/>
						<MessageError errorMessage={this.state.errorContents}/>
					</InputTextRow>
					<MiniLoader visibility={this.state.miniLoader}/>
					<ButtonWhite type={'submit'}>Submit</ButtonWhite>
				</Report>}
				<div id={'image'}>
					<img src={"http://localhost:8000/" + kost.pict_id} alt=""/>
				</div>
				<Content>
					<div id={'left'}>
						<div id='title'>
							<div>{kost.name}</div>
							<div>{kost.user && kost.user.premium_id &&
							<div id='premium'>
								<img src={process.env.PUBLIC_URL + "/assets/image/icon/ic_u_premium.svg"} alt=""/>
								Premium
							</div>
							}
								<div>{kost.user && kost.user.email_verified_at &&
								<div id='verified'>
									<img src={process.env.PUBLIC_URL + "/assets/image/icon/ic_u_promoted.svg"} alt=""/>
									Verified
								</div>
								}
								</div>
							</div>
							{kost.user && kost.user.name &&
							<span>
							Owner :
									<span id={'owner'} onClick={()=>this.props.history.push(`/owner-detail/${kost.user.id}`)}>
										 {kost.user.name}
									</span>
								</span>
							}
							{this.props.user && this.favorite()}
						</div>
						<div>
							<table>
								<tr>
									<td>Deskripsi :</td>
									<td>{kost.description}</td>
								</tr>
								<tr>
									<td>Fasilitas Unit</td>
									<td>
										<div style={{display:'flex'}}>
											<Facility facility={kost.facility} type={1}/>
										</div>
									</td>
								</tr>
								<tr>
									<td>Fasilitas Public</td>
									<td>
										<div style={{display:'flex'}}>
											<Facility facility={kost.facility} type={2}/>
										</div>
									</td>
								</tr>
								<tr>
									<td>Fasilitas Parkir</td>
									<td>
										<div style={{display:'flex'}}>
											<Facility facility={kost.facility} type={3}/>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<div>
							{kost.latitude && <LeafletMap id='picture' coords={[kost.latitude,kost.longitude]} zoom={17} click={(event)=>console.log(event)} />}
						</div>
					</div>
					<div id='right'>
						<div id='desciption'>
							<table>
								<thead>UNIT KOST</thead>
								<tr>
									<td>Price</td>
									<td>Rp.{kost.price}</td>
									<td>/{kost.period}</td>
								</tr>
								{kost.propertiable && <tr>
									<td>Room Remaining</td>
									<td>{kost.propertiable.room_remaining}</td>
								</tr>}
								<tr>
									<td>Room Area</td>
									<td>{kost.area}</td>
									<td>/m<sup>2</sup></td>
								</tr>
								<tr>
									<td>{kost.additional_information}</td>
									<td>{kost.additional_fees}</td>
								</tr>
							</table>
						</div>
					</div>
				</Content>
				{this.state.average && <AverageReview average={this.state.average}/>}
				{review && <ReviewContainer review={review.data}/>}
				{this.props.user && <ButtonWhite onClick ={()=>this.setState((prevState) =>({popReview : !prevState.popReveiw}))}><FontAwesomeIcon icon={faPlus}/> Review</ButtonWhite>}
				{this.state.popReview && <AddReveiwContainer item={kost} user={this.props.user} refresh={this.props.referesh}/>}
				{review !== null ?
					<ButtonOrange onClick={(value)=>this.handleReviewPage(kost.slug)}>Lihat lebih banyak Review</ButtonOrange>
					:null}
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

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(KostDetailContainer));