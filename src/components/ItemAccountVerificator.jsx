import React, {Component} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ButtonRed, ButtonWhite, InputText} from "../Utility";

const Container = styled('div')`
		color: #27ad27;
		width: 100%;
		line-height: 40px;
		display: flex;
		align-items: center;
	`
const MiddleContent = styled('div')`
		color: grey;
		width: 60%;
	`
const Logo = styled('div')`
		width: 20%;
		display: flex;
		justify-content: center;
	`
const Action = styled('div')`
		width: 20%;
		${'button'}{
			&:hover{
				cursor: pointer;
				background-color: #006303;
			}
			height: 35px;
			border:1px #1f771f solid;
			border-radius: 4px ;
			background-color: #27ad27;
			color: white;
		}
		display: flex;
		justify-content: center;
	`
class ItemAccountVerificator extends Component {
	state = {
		collapse : false
	}
	collapseHandler (){
		this.setState((prevstate)=>({collapse: !prevstate.collapse}))
	}
	render() {
		return (
			<Container>
				<Logo>
					<FontAwesomeIcon icon={this.props.icon} style={{fontSize:'30px'}}></FontAwesomeIcon>
				</Logo>
				<MiddleContent>
					{this.props.name}
					<br/>
					{this.props.statusVerified?"Verified":this.state.collapse?null:"Belum verifikasi"}
					{this.state.collapse?
						<div style={{marginBottom:'20px'}}>
							<InputText><input type="text" name="" id="" value={this.props.value}/></InputText>
							<ButtonWhite type={'button'} onClick={this.props.click}>Verifikasi</ButtonWhite> <ButtonRed onClick={()=>this.collapseHandler()}> Batal</ButtonRed>
						</div>:null}
				</MiddleContent>
				<Action>
					{this.props.statusVerified?"Verified":this.state.collapse?null:<button onClick={()=>this.collapseHandler()}>Verifikasi</button>}
				</Action>
			</Container>
		);
	}
}




export default ItemAccountVerificator;