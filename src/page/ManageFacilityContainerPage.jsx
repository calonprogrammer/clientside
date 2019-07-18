import React, {Component} from 'react';
import TopMenuAdmin from "../components/TopMenuAdmin";
import {Switch,Route} from 'react-router-dom';
import InsertNewFacilityContainer from "../container/InsertNewFacilityContainer";
import ViewFacilityContainer from "../container/ViewFacilityContainer";
import UpdateFacilityContainer from "../container/UpdateFacilityContainer";
import Breadcrumb from "../components/Breadcrumb";


class ManageFacilityContainerPage extends Component {
	state = {
		menus : [
			{value: 'Insert Facility', link: '/admin-page/manage-facility/insert-facility'},
			{value : 'View Facility', link : '/admin-page/manage-facility/view-facility'}
			]
	}
	render() {
		return (
			<React.Fragment>

				<TopMenuAdmin item={this.state.menus}/>
				<Switch>
					<Route>
						<Route path={'/admin-page/manage-facility'} component={InsertNewFacilityContainer} exact/>
						<Route path={'/admin-page/manage-facility/insert-facility'} component={InsertNewFacilityContainer} exact/>
						<Route path={'/admin-page/manage-facility/view-facility'} component={ViewFacilityContainer} exact/>
					</Route>
				</Switch>
			</React.Fragment>
		);
	}
}


export default ManageFacilityContainerPage;