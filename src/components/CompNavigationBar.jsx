import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import axios from 'axios';
import SearchBarContainer from "../container/SearchBarContainer";
import {withRouter} from 'react-router-dom';
const Container = styled('div')`
   position: fixed;
   top: 0px;
   width: 100%;
   display: flex;
   transition: 0.4s;
   background-color: rgba(0,0,0,0.2);
   z-index: 1002;
`;

const RightSide = styled('div')`
	@media only screen and (max-width: 991px){
		justify-content: flex-end;
		width: 20%;
	}
  ${'a'}{
    text-decoration: none;
    color: #282c34;
  }
  width: 80%;
  font-size: 15px;
  display: flex;
  justify-content: flex-end;
  font-family: Titillium Web,sans-serif;
  color: white;
`;


const ItemLogo = styled('div')`
  @media only screen and (max-width: 991px){
    width: 100%;
    background-size: 50%;
    background-position: left;
  }
  &:hover{
  	cursor: pointer;
  }
  background: url(${process.env.PUBLIC_URL + "/assets/logo_mamikos_white.svg"}) no-repeat;
  background-size: 80%;
  background-position: center;
  width: 20%;
  height: 50px;
`;
const Item = styled('div')`
  @media only screen and (max-width: 991px){
    display: none;
  }
  &:hover{
   border-bottom: 1px white solid; 
   box-sizing: border-box;
   transition: 0.2s;
  }
  min-width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
`;

const PopContainer = styled('div')`
		position: fixed;
  		background: white;
  		border-radius: 5px;
  		transition: 0.2s;
  		display: block;
`;

const PopContent = styled('div')`
		${'img'}{
			height: 100%;
			width: 100%;
		}
  		&:hover{
    		background: rgba(0,0,0,0.3);
  		}
  		padding: 20px;
  		color: black;
  		text-align: center;
  		min-width:150px ;
	`;

const Hamburger = (props) => {
	const ContainerBurger = styled('div')`
        @media only screen and (max-width: 991px){
          display: block;
        }
        padding-right: 10px;
        transition: 0.2s;
        display: none;
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
const ContainerMobile = styled('div')`
	@media only screen and (max-width: 991px){
		display: block;
	}
	${'a'}{
    	&:hover{
      color: #27ad27;
    }
    color: black;    
    text-decoration: none;
  }
  display: none	;
  position: absolute;
  height: 100vh;
  background: whitesmoke;
  width: 30%;
  right: -31%;
  color: #282c34;
  border-top-left-radius: 10px;
  border: 2px black solid;
`;

class CompNavigationBar extends Component {
	state = {
		popIklan: false,
		popLogin: false,
		yTransform: false,
		popProfile: false,
		popMobile: false
	};

	stateHandler(event) {
		event.preventDefault();
		if (event.currentTarget.id === "popLogin") {
			this.setState(prevState => ({popLogin: !prevState.popLogin}));
		}

		if (event.currentTarget.id === 'popIklan')
			this.setState((prevState) => ({popIklan: !prevState.popIklan}));

		if (event.currentTarget.id === 'popProfile')
			this.setState((prevState) => ({popProfile: !prevState.popProfile}));

		if (event.currentTarget.id === 'burger') {
			this.setState((prevState) => ({popMobile: !prevState.popMobile}));
		}

	}

	onwheel(event) {
		if (window.scrollY < 522) {
			this.setState({yTransform: false});
		} else {
			this.setState({yTransform: true});
		}
	}

	componentDidMount() {
		window.addEventListener("scroll", (event) => this.onwheel(event));
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", (event) => this.onwheel(event));
	}

	search(value){
		console.log(value);
	}

	logOut() {
		var token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		var config = {
			headers: {
				Authorization: 'Bearer' + token
			}
		};
		axios.get('http://127.0.0.1:8000/logout', config).then((response) => window.location.href = "/");
	}

	render() {
		return (
			<Container style={{
				backgroundColor: this.props.green||this.state.yTransform ? "#27ad27" : "rgba(0,0,0,0.1)",
				transform: this.state.popMobile ? 'translateX(-30%)' : 'translateX(0)'
			}}>
				<ItemLogo onClick={()=>window.location.href='/'}/>
				<RightSide>
					<SearchBarContainer search={(value)=>this.search(value)}/>
					<a href="https://play.google.com/store/apps/details?id=com.git.mami.kos">
						<Item>Download APP</Item>
					</a>

					<a href="#">
						<Item id="popIklan" onClick={(event) => this.stateHandler(event)}>
							Cari Iklan &#9663;
							<PopContainer style={{top: this.state.popIklan ? '50px' : '-200px'}}>
								<Link to={'/search-kost'}>
									<PopContent> Cari Kost</PopContent>
								</Link>
								<Link to={'/search-apartement'}>
									<PopContent>Cari Apartement</PopContent>
								</Link>
							</PopContainer>
						</Item>
					</a>
					{this.props.user &&
						<Link to={'/history-page'}>
							<Item>
								History
							</Item>
						</Link>
					}
					<a href='#'>
						{!this.props.user &&
						<Item id="popLogin" onClick={(event) => this.stateHandler(event)}>
							Masuk &#9663;
							<PopContainer style={{top: this.state.popLogin ? '50px' : '-200px'}}>
								<Link to='/guestLogin'>
									<PopContent>Sebagai Pencari</PopContent>
								</Link>
								<Link to='/ownerLogin'>
									<PopContent>Sebagai Pemilik</PopContent>
								</Link>
							</PopContainer>
						</Item>
						}
						{
							this.props.user &&
							<Item id="popProfile" onClick={(event) => this.stateHandler(event)}>
								{this.props.user.name}
								<PopContainer style={{top: this.state.popProfile ? "50px" : "-300px"}}>
									{this.props.user && this.props.user.type == 3 &&
									<Link to={'/admin-page'}>
										<PopContent>
											Admin Dashboard
										</PopContent>
									</Link>
									}

									<PopContent onClick={()=>this.props.history.push(`/profile/${this.props.user.id}`)}>Halaman Profile</PopContent>
									<Link to='/following'>
										<PopContent>Following</PopContent>
									</Link>
									<Link to='/post-page'>
										<PopContent>Post Page</PopContent>
									</Link>
									<PopContent onClick={() => this.logOut()}> Logout</PopContent>
								</PopContainer>
							</Item>
						}
					</a>
					<Hamburger click={(event) => this.stateHandler(event)}/>
					<ContainerMobile styled={{transform: this.state.popMobile ? "translateX(0)" : "translateX(-30%)"}}>
						<PopContent><img src={process.env.PUBLIC_URL + "/assets/logo_mamikos_green.svg"} alt=""/></PopContent>
						{!this.props.user &&
						<div>
							<Link to='/guestLogin'>
								<PopContent>Sebagai Pencari</PopContent>
							</Link>
							<Link to='/ownerLogin'>
								<PopContent>Sebagai Pemilik</PopContent>
							</Link>
						</div>
						}
						{
							this.props.user &&
								<div style={{textAlign:'center'}}>
								<span style={{lineHeight:'40px',color:'tomato'}}>{this.props.user.name}</span>
									{this.props.user && this.props.user.type === 3 &&
									<Link to={'/admin-page'}>
											<PopContent>
												Admin Dashboard
											</PopContent>
									</Link>
									}
									<Link>
										<PopContent onClick={()=>this.props.history.push(`/profile/${this.props.user.id}`)}>Halaman Profile</PopContent>
									</Link>
									<Link to='/following'>
										<PopContent>Following</PopContent>
									</Link>
									<Link to='/post-page'>
										<PopContent>Post Page</PopContent>
									</Link>
								</div>
						}
						<PopContent> Cari Kost</PopContent>
						<PopContent> Cari Apartement</PopContent>
						{this.props.user && <PopContent onClick={() => this.logOut()}> Logout</PopContent>}
					</ContainerMobile>
				</RightSide>
			</Container>
		);
	}
}

const MapStateToProps = state => {
	return {
		user: state.user
	}
};

const MapDispatchToProps = dispatch => {
	return {
		update_user: key => dispatch({
			type: "update_user",
			value: key
		})
	}
};
export default withRouter(connect(MapStateToProps, MapDispatchToProps)(CompNavigationBar));