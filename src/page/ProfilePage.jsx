import React, {Component} from 'react';
import Breadcrumb from "../components/Breadcrumb";
import CompNavigationBar from "../components/CompNavigationBar";
import ProfileContainer from "../container/ProfileContainer";
import UserVerificator from "../UserVerificator";


class ProfilePage extends Component {


	render() {
		return (
			<React.Fragment>
				<UserVerificator loged={true} role={'1'}/>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}></div>
				<Breadcrumb/>
				<ProfileContainer></ProfileContainer>
			</React.Fragment>
		);
	}
}

export default ProfilePage;