import React, {Component} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faRecycle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";


const Container = styled('div')`
		width: 90%;
		background: #fff;
  		box-shadow:
    	0 1px 1px rgba(0,0,0,0.15),
    	0 10px 0 -5px #eee,
    	0 10px 1px -4px rgba(0,0,0,0.15),
    	0 20px 0 -10px #eee,
    	0 20px 1px -9px rgba(0,0,0,0.15);
    	padding: 20px;	
    	margin: 0 auto;	
	`;

const ContainerInside = styled('div')`
		margin-top: 10px;
		background: #fff;
  		border: 1px black solid;
  		display: flex;
	`;
const IconPart = styled('div')`
		${'img'}{
			width: 50px;
			height: 50px;
		}
		display: flex;
		justify-content: center;
		width: 10%;
	`;
const Text = styled('div')`
		width: 80%;
		color: black;
		font-size: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	`;
const Action = styled('div')`
		
		${'#update'}{
			&:hover{
				background-color: rgba(43,167,255,0.3);
				cursor: pointer;
			}
			background-color: rgba(43,167,255,1);
			width: 100%;
			height: 100%;
			border: 0px;
			color:white;
		}
		${'#ban'}{
			&:hover{
				background-color: rgba(139,0,0,0.3);
				cursor: pointer;

			}
			background-color: rgba(139,0,0,1);
			width: 100%;
			height: 100%;
			border: 0px;
			color:white;
		}
		${'#resetPassword'}{
			&:hover{
				background-color: rgba(139,0,0,0.3);
				cursor: pointer;

			}
			background-color: rgb(221,205,29);
			width: 100%;
			height: 100%;
			border: 0px;
			color:white;
		}
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	`;

class ViewUserContainer extends Component {

	render() {
		const users = this.props.users;
		return (
			<Container>
				{users.map((key)=>
					<ContainerInside>
						<IconPart>
							<img src={'http://127.0.0.1:8000/' + key.picture_id} alt={key.name}/>
						</IconPart>
						<Text>
							{key.name}
						</Text>
						<Action>
							<button id='resetPassword' onClick={(id) => this.props.resetPassword(key.id)}>
								<FontAwesomeIcon icon={faRecycle}></FontAwesomeIcon>
							</button>
							<button id='ban' onClick={(id) => this.props.ban(key.id)}>
								<FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
							</button>
						</Action>
					</ContainerInside>
				)}
			</Container>
		);
	}
}

export default ViewUserContainer;