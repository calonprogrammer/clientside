import React, {Component} from 'react';
import CompNavigationBar from "../components/CompNavigationBar";
import Breadcrumb from "../components/Breadcrumb";
import {withRouter} from 'react-router-dom';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {faPercent} from "@fortawesome/free-solid-svg-icons/faPercent";
import axios from 'axios';
import {ButtonRed, ButtonWhite, MiniLoader, PopMessage} from "../Utility";
import {connect} from "react-redux";
import UserVerificator from "../UserVerificator";

const Container = styled('div')`

	${'#content'}{
		&:hover{
		    box-shadow: 0px 2px 5px 2px #888888;
		    cursor: pointer;
		    transition: 0.2s;
	  	}
		text-align: center;
		line-height: 50px;
		${'#name'}{
			color: #2b5dc7;
		font-size: 20px;
		font-weight: bold;
	}
	${'#price'}{
	color: #27ad27;
	font-size: 15px;
}
width: 40%;
margin: 0 auto;
box-shadow:
0 1px 1px rgba(0,0,0,0.15),
	0 10px 0 -5px #eee,
	0 10px 1px -4px rgba(0,0,0,0.15),
	0 20px 0 -10px #eee,
	0 20px 1px -9px rgba(0,0,0,0.15);	
}
height: 85vh;
width: 100%;
margin: 30px auto;
background: #fff;
display: flex;
justify-content: center;
align-items: center;
`;

class BuyPremiumPage extends Component {
	state={
		miniLoader:false,
		valid:false,
		message :'',
		popMessage:false
	}
	componentDidMount() {

	}
	buyPremium(id){
		this.setState({miniLoader:true});
		let premium_id = id;
		let user_id = this.props.user.id;
		let token = JSON.parse(sessionStorage.getItem('credentials'));

		let payload = {
			'premium_id' : premium_id,
			'user_id' : user_id
		}
		axios.post(`http://127.0.0.1:8000/owner/buyPremium?token=${token}`,payload).then((response)=>{
			if(response.data.status === 'Success'){
				this.setState({miniLoader:false, message:response.data.message,valid:true,popMessage:true})
			}else{
				this.setState({miniLoader:false, message:response.data.message,valid:false,popMessage:true})
			}
			this.fetch();
		}).catch((error)=>{
			console.log(error)
		});
	}

	render() {

		let premium = this.props.location.state;
		return (
			<React.Fragment>
				<UserVerificator loged={true} role={'2'}/>
				<PopMessage visibility={this.state.popMessage} valid={this.state.valid} message={this.state.message} click={()=>this.setState({popMessage:false})}/>
				{console.log(premium)}
					<Container>

						<div id={'content'}>
							<h1>Buy Premium</h1>
							<div id={'name'}>{premium.name}</div>
							<div id={'price'}>Price : {premium.price}<FontAwesomeIcon icon={faMoneyBill}/></div>
							<div>Duration : {premium.duration}<FontAwesomeIcon icon={faClock}/></div>
							<div> Discount : {premium.discount} <FontAwesomeIcon icon={faPercent}/></div>
							<MiniLoader visibility={this.state.miniLoader}/>
							{this.props.user && <ButtonWhite type={'button'} onClick={(premiumId,userID)=>this.buyPremium(premium.id,this.props.id)}>Buy</ButtonWhite>}
						</div>
					</Container>
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

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(BuyPremiumPage));