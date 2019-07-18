import React, {Component} from 'react';
import styled from 'styled-components';
import CompNavigationBar from "../components/CompNavigationBar";
import Breadcrumb from "../components/Breadcrumb";
import TopMenuAdmin from "../components/TopMenuAdmin";
import {Switch,Route} from 'react-router-dom';
import HistoryViewContainer from "../container/HistoryViewContainer";
import HistoryFavoriteContainer from "../container/HistoryFavoriteContainer";
import UserVerificator from "../UserVerificator";
import HistoryChatPage from "./HistoryChatPage";
const Container = styled('div')`
	width: 100%;
`
const Content = styled('div')`
	width: 100%;
	background-color: whitesmoke;
	
`
class HistoryPage extends Component {
	state = {
		menus : [
			{value: 'View History', link: '/history-page/view-history'},
			{value : 'View Favorite', link : '/history-page/view-favorite'},
			{value: 'View Chat', link: '/history-page/view-chat'}
		]
	}

	render() {
		return (
			<Container>
				<UserVerificator role={'1'} loged={true}/>
				<CompNavigationBar green={true}/>
				<div style={{marginTop:'50px'}}></div>
				<Breadcrumb/>
				<TopMenuAdmin item={this.state.menus}/>
				<Content>
					<Switch>
						<Route path='/history-page' component={HistoryViewContainer} exact/>
						<Route path='/history-page/view-history' component={HistoryViewContainer} exact/>
						<Route path='/history-page/view-favorite' component={HistoryFavoriteContainer} exact/>
						<Route path='/history-page/view-chat' component={HistoryChatPage} exact/>
					</Switch>
				</Content>
			</Container>
		);
	}
}


export default HistoryPage;