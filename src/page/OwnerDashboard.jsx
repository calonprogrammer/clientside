import React, {Component} from 'react';
import styled from 'styled-components';
import {Link, Route} from 'react-router-dom';
import EditProfilePage from "./EditProfilePage";
import InsertApartContainer from "../container/InsertApartContainer";
import InserKostContainer from "../container/InserKostContainer";
import OwnerDashboardContainer from "../container/OwnerDashboardContainer";
import axios from "axios";
import ViewPremiumContainer from "../container/ViewPremiumContainer";
import ApartementListContainer from "../container/ApartementListContainer";
import HouseListContainer from "../container/HouseListContainer";
import {withRouter} from 'react-router-dom';
import BuyPremiumPage from "./BuyPremiumPage";
import HistoryPremiumPage from "./HistoryPremiumPage";
import {connect} from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import CompNavigationBar from "../components/CompNavigationBar";
import ChatContainer from "../container/ChatContainer";
import HistoryChatPage from "./HistoryChatPage";
import ChatPageOwner from "./ChatPageOwner";
const Container = styled('div')`
	width: 100%;
	display: flex;
`
const Leftside = styled('div')`
	transition: 0.2s;
	@media only screen and (max-width: 991px){
		position: fixed;
		width: 30%;
	}
	${'a'}{
		text-decoration: none;
	}
	left: 0;
	width: 15%;
	height: 100vh;
	display: flex;
	overflow-y: auto;
	flex-direction: column;
	background-color: #27ad27;
`
const ItemLogo = styled('div')`
	
  @media only screen and (max-width: 991px){
    width: 80%;
    background-size: 50%;
    background-position: left;
  }
  &:hover{
  	cursor: pointer;
  	background-color: rgba(0,0,0,0.2);
  }
  background: url(${process.env.PUBLIC_URL + "/assets/logo_mamikos_white.svg"}) no-repeat center;
  background-size: 80%;
  width: 100%;
  height: 50px;
`;
const Menu = styled('div')`
	&:hover{
		background-color: rgba(0,0,0,0.7);
		transition: 0.5s;
		cursor: pointer;
	}
	text-decoration: none;
	color: whitesmoke;
	font-size: 20px;
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
`
const RightSide = styled('div')`
	box-sizing: border-box;
	border: 2px black solid;
	overflow-y: auto;
	width: 100%;
	height: 100vh;
	overflow-y: auto;
`

const Hamburger = (props) => {
	const ContainerBurger = styled('div')`
        @media only screen and (max-width: 991px){
          	display: block;
          	
        }
        padding-right: 10px;
        transition: 0.2s;
        display: none;
        position: fixed; 
        padding: 10px;
        background-color: #282c34;
    `;
	const Buger = styled('div')`
      width: 35px;
      height: 5px;
      background-color: white;
      margin-top: 6px;
      margin-bottom: 6px;
    `;

	return (
		<ContainerBurger id='burger' onClick={props.click}>
			<Buger/>
			<Buger/>
			<Buger/>
		</ContainerBurger>
	);
};
class OwnerDashboard extends Component {

	state ={
		mobileMode :false
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.user)
			if(nextProps.user.type != 2)
				window.location.href = '/';
	}
	logOut(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers: {
				Authorization: 'Bearer' + token
			}
		};
		axios.get('http://127.0.0.1:8000/logout', config).then((response) => window.location.href = "/");
	}
	handleMobile(){
		this.setState((prevState)=>({mobileMode:!prevState.mobileMode}));
	}
	gotoChat(id){
		this.props.history.push('/chat/'+this.props.chat.id+'/'+id);
	};
	render() {
		return (
			<React.Fragment>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}/>
				<Breadcrumb/>
			<Container>
				<Hamburger click={()=>this.handleMobile()} style={{left:this.state.mobileMode ? '0px':'-250px'}}/>
				<Leftside style={{left:this.state.mobileMode ? '0px':'-250px'}}>
					<ItemLogo onClick={()=>window.location.href='/owner-page'}></ItemLogo>
					<Link to={'/owner-page/profile'}><Menu>Update Profile</Menu></Link>
					<Link to={'/owner-page/insert-apartement'}><Menu>Add Apartemen</Menu></Link>
					<Link to={'/owner-page/insert-kost'}><Menu>Add Kost</Menu></Link>
					<Link to={'/owner-page/view-apartement'}><Menu>View Apartement</Menu></Link>
					<Link to={'/owner-page/view-kost'}><Menu>View Kost</Menu></Link>
					<Link to={'/owner-page/view-premium'}><Menu>View Premium</Menu></Link>
					<Link to={'/owner-page/view-history-premium'}><Menu>View History Premium</Menu></Link>
					<Link to={'/owner-page/view-chat'}><Menu>View Chat</Menu></Link>
					<Menu onClick={()=>this.logOut()}>Log Out</Menu>
				</Leftside>
				<RightSide onClick={()=>this.setState({mobileMode:false})}>
					<Route path={'/owner-page'} component={OwnerDashboardContainer} exact/>
					<Route path={'/owner-page/profile'} component={EditProfilePage} exact/>
					<Route path={'/owner-page/insert-apartement'} component={InsertApartContainer}/>
					<Route path={'/owner-page/insert-kost'} component={InserKostContainer}/>
					<Route path={'/owner-page/view-premium'} component={ViewPremiumContainer} exact/>
					<Route path={'/owner-page/view-premium/buy'} component={BuyPremiumPage} exact/>
					<Route path={'/owner-page/view-apartement'} component={ApartementListContainer} exact/>
					<Route path={'/owner-page/view-history-premium'} component={HistoryPremiumPage} exact/>
					<Route path={'/owner-page/view-kost'} component={HouseListContainer} exact/>
					<Route path={'/owner-page/view-chat'} component={ChatPageOwner} exact/>
				</RightSide>
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
export default withRouter(connect(MapStateToProps,MapDispatchToProps) (OwnerDashboard));