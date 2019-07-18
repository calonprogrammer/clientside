import React, {Component} from 'react';
import TopMenuAdmin from "../components/TopMenuAdmin";
import {Switch,Route} from 'react-router-dom';
import InsertPremiumContainer from "../container/InsertPremiumContainer";
import ViewPremiumContainer from "../container/ViewPremiumContainer";
import Breadcrumb from "../components/Breadcrumb";

class ManagePremiumPage extends Component {
	state = {
		menus : [
			{value: 'Insert Premium', link: '/admin-page/manage-premium/insert-premium'},
			{value : 'View Premium', link : '/admin-page/manage-premium/view-premium'}
		]
	}
	render() {
		return (
			<React.Fragment>
				<TopMenuAdmin item={this.state.menus}/>
				<Switch>
					<Route>
						<Route path={'/admin-page/manage-premium'} component={InsertPremiumContainer} exact/>
						<Route path={'/admin-page/manage-premium/insert-premium'} component={InsertPremiumContainer} exact/>
						<Route path={'/admin-page/manage-premium/view-premium'}  component={ViewPremiumContainer} exact/>
					</Route>
				</Switch>
			</React.Fragment>
		);
	}
}

export default ManagePremiumPage;