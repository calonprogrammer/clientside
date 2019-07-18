import React, {Component} from 'react';
import styled from 'styled-components';
import {Link,Switch,Route} from 'react-router-dom';
import ManageFacilityContainerPage from "./ManageFacilityContainerPage";
import axios from "axios";
import ManageGuestContainerPage from "./ManageGuestContainerPage";
import ManagePremiumPage from "./ManagePremiumPage";
import ManageOwnerContainer from "./ManageOwnerContainer";
import AdminMainPage from "./AdminMainPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHamburger} from "@fortawesome/free-solid-svg-icons/faHamburger";
import {connect} from "react-redux";
import ManagePostPage from "./ManagePostPage";
import ManageReportPage from "./ManageReportPage";
import ManageTransactionPage from "./ManageTransactionPage";
import UserVerificator from "../UserVerificator";
import CompNavigationBar from "../components/CompNavigationBar";
import Breadcrumb from "../components/Breadcrumb";

const Container = styled('div')`
	width: 100%;
	height: 100vh;
	overflow: hidden;
	display: flex;
`

const Leftside = styled('div')`
	@media only screen and (max-width: 991px){
		position: fixed;
	}
	${'a'}{
		text-decoration: none;
	}
	transition: 0.2s;
	min-width: 250px;
	height: 100vh;
	display: flex;
	overflow-y: auto;
	flex-direction: column;
	background-color: #27ad27;
`
const Menu = styled('div')`
	${'a'}{
		color: white;
	}
	&:hover{
		background-color: rgba(0,0,0,0.7);
		transition: 0.5s;
		cursor: pointer;
	}
	text-decoration: none;
	background-color: #27ad27;
	color: whitesmoke;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
`
const RightSide = styled('div')`
	box-sizing: border-box;
	border: 2px black solid;
	overflow-y: auto;
	overflow-x: revert;
	width: 100%;
	background-color: #219521;
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
class AdminPage extends Component {
	state ={
		mobileMode :false
	};


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
	render() {
		return (
			<React.Fragment>
				<UserVerificator loged={true} role={'3'}/>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}/>
				<Breadcrumb/>
				<Container>
					<Hamburger click={()=>this.handleMobile()} style={{left:this.state.mobileMode ? '0px':'-250px'}}/>
					<Leftside style={{left:this.state.mobileMode ? '0px':'-250px'}}>
						<Link to={'/admin-page'}><Menu>Admin</Menu></Link>
						<Link to={'/admin-page/manage-post'}><Menu>Manage Post</Menu></Link>
						<Link to={'/admin-page/manage-facility'}><Menu>Manage Facility</Menu></Link>
						<Link to={'/admin-page/manage-guest'}><Menu>Manage Guest</Menu></Link>
						<Link to={'/admin-page/manage-owner'}><Menu>Manage Owner</Menu></Link>
						<Link to={'/admin-page/manage-premium'}><Menu>Manage Premium Product</Menu></Link>
						<Link to={'/admin-page/manage-transaction'}><Menu>Manage Transaction</Menu></Link>
						<Link to={'/admin-page/manage-report'}><Menu>Manage Report</Menu></Link>
						<Menu onClick={()=>this.logOut()}>Log Out</Menu>
					</Leftside>

					<RightSide onClick={()=>this.setState({mobileMode:false})}>
						<Switch>
							<Route path={'/admin-page'} component={AdminMainPage} exact/>
							<Route path={'/admin-page/manage-premium'} component={ManagePremiumPage}/>
							<Route path={'/admin-page/manage-facility'} component={ManageFacilityContainerPage}/>
							<Route path={'/admin-page/manage-guest'} component={ManageGuestContainerPage} exact/>
							<Route path={'/admin-page/manage-owner'} component={ManageOwnerContainer} exact/>
							<Route path={'/admin-page/manage-report'} component={ManageReportPage} exact/>
							<Route path={'/admin-page/manage-transaction'} component={ManageTransactionPage} exact/>
							<Route path={'/admin-page/manage-post'} component={ManagePostPage} />
						</Switch>
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


export default connect(MapStateToProps,MapDispatchToProps) (AdminPage) ;