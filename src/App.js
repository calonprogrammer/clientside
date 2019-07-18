import React from 'react';
import RootPage from "./page/RootPage";
import {Switch,Route} from 'react-router-dom';
import {connect} from "react-redux";
import GuestLoginPage from "./page/GuestLoginPage";
import OwnerLoginPage from "./page/OwnerLoginPage";
import OwnerRegisterPage from "./page/OwnerRegisterPage";
import GuestRegisterPage from "./page/GuestRegisterPage";
import ProfilePage from "./page/ProfilePage";
import EditProfilePage from "./page/EditProfilePage";

import {Component} from 'react';
import axios from "axios";
import AdminPage from "./page/AdminPage";
import {PopMessage} from "./Utility";
import OwnerDashboard from "./page/OwnerDashboard";
import DetailPage from "./page/DetailPage";
import ReviewPage from "./page/ReviewPage";
import OwnerViewPage from "./page/OwnerViewPage";
import HistoryPage from "./page/HistoryPage";
import FollowingPage from "./page/FollowingPage";
import PostContainer from "./container/PostContainer";
import UserPostPage from "./page/UserPostPage";
import DetailPostContainer from "./container/DetailPostContainer";
import SearchingApartemtentPage from "./page/SearchingApartemtentPage";
import SearchingKostPage from "./page/SearchingKostPage";
import ChatContainer from "./container/ChatContainer";
import {connectSocket} from "./Api";
require('leaflet/dist/leaflet.css');


class App extends Component {



	componentWillMount() {
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get( "http://127.0.0.1:8000/initial",config).then(
			(response)=>{
				if(response.data.status == 'ban'){
					this.setState({message:response.data.message,popMessage:true})
					sessionStorage.clear();
				}
				this.setState({user:response.data.user},()=>connectSocket(response.data.user.id));
				this.props.update_user(response.data.user)
				this.setState({isLoading: false})
			})
			.catch((err) => {
					console.log(err.response)
					this.setState({isLoading: false});
				}
			)
		;
	}

	disablePopMessage(){
		this.setState({popMessage:false});
	}

	state={
		popMessage: false,
		message : ''
	}
	render() {
		return (
			<React.Fragment>
				{/*///popBanned*/}
				<PopMessage click={()=>this.disablePopMessage()}  visibility={this.state.popMessage} message={this.state.message} valid={false}/>
				<Switch>
					<Route path="/" component={RootPage} exact/>
					<Route path="/owner-page" component={OwnerDashboard}/>
					<Route path="/guestLogin" component={GuestLoginPage} exact/>
					<Route path="/guestRegister" component={GuestRegisterPage} exact/>
					<Route path="/ownerLogin" component={OwnerLoginPage} exact/>
					<Route path="/ownerRegister" component={OwnerRegisterPage} exact/>
					<Route path="/profile/:id" component={ProfilePage}/>
					<Route path='/edit-profile' component={EditProfilePage} exact/>
					<Route path='/admin-page'  component={AdminPage}/>
					<Route path='/detail-page/:slug' component={DetailPage} exact/>
					<Route path='/detail-page/:slug/review-page' component={ReviewPage} exact/>
					<Route path='/owner-detail/:id' component={OwnerViewPage} exact/>
					<Route path='/history-page' component={HistoryPage} />
					<Route path='/following' component={FollowingPage} />
					<Route path='/post-page' component={UserPostPage} exact/>
					<Route path='/detail-post/:slug' component={DetailPostContainer} exact/>
					<Route path='/search-apartement' component={SearchingApartemtentPage} exact/>
					<Route path='/search-kost' component={SearchingKostPage} exact/>
					<Route path='/chat/:channelId/:toId' component={ChatContainer} exact/>
				</Switch>
			</React.Fragment>
		);
	}
}

const MapStateToProps = state => {
	return{
		user:state.user,
		coords:state.coords
	}
};
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
};

export default connect(MapStateToProps,MapDispatchToProps) (App);
