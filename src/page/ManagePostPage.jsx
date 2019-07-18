import React, {Component} from 'react';
import TopMenuAdmin from "../components/TopMenuAdmin";
import InsertNewFacilityContainer from "../container/InsertNewFacilityContainer";
import ViewFacilityContainer from "../container/ViewFacilityContainer";
import {Route,Switch} from 'react-router-dom';
import InsertPostContainer from "../container/InsertPostContainer";
import Breadcrumb from "../components/Breadcrumb";
import ViewPostContainer from "../container/ViewPostContainer";

class ManagePostPage extends Component {
	state = {

		menus : [
			{value: 'Insert Post', link: '/admin-page/manage-post/insert-post'},
			{value : 'View Post', link : '/admin-page/manage-post/view-post'}
		]
	}
	render() {
		return (
			<React.Fragment>
				<TopMenuAdmin item={this.state.menus}/>
				<Switch>
					<Route>
						<Route path={'/admin-page/manage-post'} component={InsertPostContainer} exact/>
						<Route path={'/admin-page/manage-post/insert-post'} component={InsertPostContainer} exact/>
						<Route path={'/admin-page/manage-post/view-post'} component={ViewPostContainer} exact/>
					</Route>
				</Switch>
			</React.Fragment>
		);
	}
}

export default ManagePostPage;