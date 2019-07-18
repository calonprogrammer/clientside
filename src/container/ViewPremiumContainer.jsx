import React, {Component} from 'react';
import axios from 'axios';
import styled from "styled-components";
import Loader from "../components/Loader";
import {ButtonRed, ButtonWhite, ConfirmModal, MiniLoader, PopMessage} from "../Utility";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faCoins, faRecycle} from "@fortawesome/free-solid-svg-icons";
import InsertPremiumContainer from "./InsertPremiumContainer";
import PopUpdateContainer from "./PopUpdateContainer";
import SearchBarContainer from "./SearchBarContainer";
import {connect} from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import {Link} from 'react-router-dom';

const myAxios = axios.create({validateStatus:false});

const Container = styled('div')`
	@media only screen and (max-width: 991px){
		display: block;
		text-align: center;
	}
	width: 80%;
	display: flex;
	margin: 30px auto;
	justify-content: center;
	background: #fff;
  	box-shadow:
    0 1px 1px rgba(0,0,0,0.15),
    0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0,0,0,0.15),
    0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0,0,0,0.15);
    padding: 30px;
    flex-wrap: wrap;
`

const InsideContainer = styled('div')`
	@media only screen and (max-width: 991px){
		background-color: whitesmoke;
		width: 80%;
		margin: 20px auto;
	}
	${'#name'}{
		font-size: 20px;
		color: #282c34;
	}
	${'#discount'}{
		color: tomato;
		font-weight: bold;
	}
	${'#duration'}{
		color: saddlebrown;
	}
	${'#action'}{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	${'#price'}{
		width: 100%;
		color: red;
	}
	margin-left: 10px;
	margin-bottom: 10px;
	width: 200px;
	background-color: beige;
	border-radius: 5px;
	&:hover{ 
		background-color: rbga(0,0,0,0.2);
		cursor: pointer;
	}
`
const CurrentPage = styled('div')`
	background-color: #27ad27;
	width: 50px;
	border-radius: 5px;
	color: white;
	font-size: 20px;
	text-align: center;
	line-height: 50px;	
`


class ViewPremiumContainer extends Component {
	state = {
		popDelete:false,
		isLoading:true,
		premiums: null,
		currentPage:'',
		lastPage:'',
		currentId: '',
		miniLoader:false,
		valid:false,
		popMessage:false,
		message:'',
		currentObject : null,
	}

	done(response){
		this.setState({premiums:response.data.premiums.data,currentPage:response.data.premiums.current_page,lastPage:response.data.premiums.last_page});
		this.setState({isLoading:false});
	}
	componentWillMount() {
		this.fetch();
	}
	fetch(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		myAxios.get(`http://127.0.0.1:8000/admin/getAllPremium?token=${token}`).then((response)=>{
			this.done(response)
		})
	}
	delete(id){
		this.setState({currentId:id,popDelete:true});
	}
	update(id) {
		this.setState({currentId:id});
		let test = this.state.premiums.find(function (f) {
			return f.id == id;
		});
		let object = {
			update :{
				input : [
					{type : 'text' , value: test.name ,name:'name', readOnly:false},
					{type : 'number', value: test.discount , name:'discount', readOnly:false},
					{type : 'number', value: test.duration, name:'duration', readOnly:false},
					{type:'number', value:test.price, name:'price', readOnly:false}
				]
			}
		}
		this.setState({currentObject:object},()=>this.setState({popUpdate:true}));
	}
	buy(id){
		this.setState({currentId:id});
		let test = this.state.premiums.find(function (f) {
			return f.id == id;
		});
		console.log(test);

	}
	disablePopUpdate(){
		this.setState({popUpdate:false});
	}
	sentUpdate(event){
		event.preventDefault();
		this.setState({popUpdate:false,miniLoader:true});
		let id = this.state.currentId;
		let name = event.target.elements["name"].value;
		let duration = event.target.elements["duration"].value;
		let discount = event.target.elements["discount"].value;
		let price = event.target.elements["price"].value;

		let token = JSON.parse(sessionStorage.getItem('credentials'));


		let payload = {
			'id' : id,
			'name' : name,
			'duration' : duration,
			'discount' : discount,
			'price' :price
		}
		myAxios.post(`http://127.0.0.1:8000/admin/updatePremium?token=${token}`,payload).then((response)=>{
			if(response.data.message === 'Success'){
				this.setState({miniLoader:false, message:response.data.message,valid:true,popMessage:true})
			}else{
				this.setState({miniLoader:false, message:response.data.message,valid:false,popMessage:true})
			}
			this.fetch();
		}).catch((error)=>{
			console.log(error)
		});
	}
	finishDelete(response){
		this.setState({valid:true,miniLoader:false,popMessage:true,message:response.data.message});
		this.fetch();
	}
	agree(id){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		this.setState({miniLoader:true,popModal:false});
		myAxios.delete(`http://127.0.0.1:8000/admin/deletePremium/${id}?token=${token}`).then((response)=>{
			this.finishDelete(response)
		}).catch((error)=>{
			console.log(error);
		});
		this.setState({popDelete:false});
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}
	next(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let currentPage = this.state.currentPage;
		let lastPage = this.state.lastPage;
		let i;
		if(currentPage < lastPage){
			i = currentPage+1;
		}else{
			i = lastPage;
		}
		myAxios.get(`http://127.0.0.1:8000/admin/getAllPremium?page=${i}&token=${token}`).then((response) => {
			this.done(response)

		}).catch((error) => {
			console.log(error.response);
		})
	}

	prev(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let currentPage = this.state.currentPage;
		let i;
		if(currentPage > 1){
			i = currentPage-1;
		}else{
			i = 1;
		}
		myAxios.get(`http://127.0.0.1:8000/admin/getAllPremium?page=${i}&token=${token}`).then((response) => {
			this.done(response)

		}).catch((error) => {
			console.log(error.response);
		})
	}
	search(value){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config={
			Authorization : 'Bearer ' + token
		}
		myAxios.get(`http://127.0.0.1:8000/admin/searchPremium?token=${token}&key=${value}`).then((response)=>{
			this.setState({premiums:response.data});
		}).catch((error)=>{
			console.log(error)
		});
	}
	render() {
		return (
			<React.Fragment>
				<SearchBarContainer search={(value)=>this.search(value)}/>
				<ConfirmModal visibility={this.state.popDelete} action={'Hapus'} agree={(id)=>this.agree(this.state.currentId)} cancel={()=>this.setState({popDelete:false})}/>
				{this.state.popUpdate &&
				<PopUpdateContainer cancel={()=>this.disablePopUpdate()} submit={(event)=>this.props.user.type ==3 ?this.sentUpdate(event):this.buyPremium(event)}  title={this.props.user.type ==3 ?'Update':'Buy'} object={this.state.currentObject.update}/>}
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.disablePopMessage()}/>
				{this.state.isLoading && <Loader />}
			<Container>
				{this.state.miniLoader?<MiniLoader visibility={true}/> : null}
				{this.state.premiums && this.state.premiums.map((key)=>(
					<InsideContainer>
						<span id='name'>{key.name}<br/></span>
						Discount :<span id='discount'> {key.discount} % <br/> </span>
						Duration :<span id='duration'> {key.duration} day(s) <br/></span>
						Price : <span id={'price'}>{key.price}</span>
						{this.props.user && this.props.user.type ==3 ?<div id='action'>
							<ButtonRed onClick={(id)=>this.delete(key.id)}><FontAwesomeIcon icon={faTrash}/></ButtonRed>
							<ButtonWhite onClick={(id)=>this.update(key.id)}><FontAwesomeIcon icon={faRecycle}/></ButtonWhite>
						</div>:
							<Link id='action'
							      to={{
							      	pathname: '/owner-page/view-premium/buy',
								      state:key
							      }}>
								<ButtonRed ><FontAwesomeIcon icon={faCoins}/></ButtonRed>
							</Link>}
					</InsideContainer>
				))}
			</Container>
				<div style={{background:'whitesmoke',margin:'0 auto', width:'50%',display:'flex',justifyContent:'space-between'}}>
					<ButtonRed onClick={()=>this.prev()}>Prev</ButtonRed>
					<CurrentPage>
						{this.state.currentPage}
					</CurrentPage>
					<ButtonWhite onClick={()=>this.next()}>Next</ButtonWhite>
				</div>
			</React.Fragment>
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

export default connect(MapStateToProps,MapDispatchToProps) (ViewPremiumContainer);