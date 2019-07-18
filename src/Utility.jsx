import styled , {keyframes} from "styled-components";
import React, {Component} from 'react';

const GreenFontHover = styled('span')`
  ${'a'}{
    &:hover{
      text-decoration: underline #27ab27;
    }  
    font-size: 20px;
    text-decoration: none;
    color:#27ab27;
  }
`;

const PopMessage = (props) => {
	const Circle = styled('div')`
      width: 70px;
      height: 70px;
      line-height: 70px;
      background: #990000;
      border-radius: 50%;
      border: 4px solid white;
      color: white;
      font-size: 45px;
      font-family: verdana;
      text-align: center;
    `;
	const Container = styled('div')`
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.2);
      top: 0;
    `;
	const PopContainer = styled('div')`
      @media only screen and (max-width: 991px){
        width: 70%;
      }
      transform: translateY(50%);
      width: 25%;
      height: 50%;
      background: white;
      margin: 0 auto;
      border-radius: 10%;
    `;
	const ContainerPicture = styled('div')`
      margin: 0 auto;
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

	const ContainerMessage = styled('div')`
      height: 50%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
     `;

	const True = () => {
		return (
			<React.Fragment>
				<ContainerPicture>
					<Circle style={{background: "#27ad27"}}>
						<div>&#10003;</div>
					</Circle>
				</ContainerPicture>
				<ContainerMessage style={{color: "#27ad27"}}>
					{props.message}
				</ContainerMessage>
			</React.Fragment>
		);
	};
	const False = () => {
		return (
			<React.Fragment>
				<ContainerPicture>
					<Circle style={{background: "#AD0D13"}}>
						<div>X</div>
					</Circle>
				</ContainerPicture>
				<ContainerMessage style={{color: "#AD0D13"}}>
					{props.message}
				</ContainerMessage>
			</React.Fragment>
		);
	};

	return (
		<Container style={{visibility: props.visibility ? "visible" : "hidden"}}>
			<PopContainer>
				{
					props.valid ? <True/> : <False/>
				}
				<ButtonOrange onClick={props.click}>Next</ButtonOrange>
			</PopContainer>
		</Container>
	);
};
const ButtonOrange = styled('button')`
  &:hover{
    cursor: pointer;
  }
  &:active{
    border-radius: 10px;      
    background: #d24f3a;
  }
  height: 50px;
  width: 100%;
  background: tomato;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  margin: 20px auto;
`;
const InputText = styled('div')`
   &:focus-within{
    color: #27ab27;
   }
  ${'input'}{
    &:focus{  
      border-bottom: solid 2px #27ad27;
    }
    &::-webkit-inner-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
    }
    font-family: Calibri;
    border: none;
    outline: 0;
    border-bottom: solid 2px grey;
    width: 100%;
    font-size: 20px;
    padding-left:10px;
  }
  color: grey;
  font-size: 20px;
  margin-bottom: 40px;
`;

const MessageError = (props) => {
	const Container = styled('div')`
      color: rgb(247, 7, 7);
      size: 20px;
      text-align: center;
      font-family: FontAwesome;
      transition: 0.2s;
    `;
	return (
		<Container>{props.errorMessage}</Container>
	)
};
const MiniLoader = (props) => {
	const Animation = keyframes`
        0% {
          top: 28px;
          left: 28px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: -1px;
          left: -1px;
          width: 58px;
          height: 58px;
          opacity: 0;
        }
    `
	const Ripple = styled('div')`
        ${'div'}{
          &:nth-child(2) {
            animation-delay: -0.5s;
          }
          position: absolute;
          border: 4px solid #27ad27;
          opacity: 1;
          border-radius: 50%;
          animation: ${Animation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        display: inline-block;
        position: relative;
        width: 100px;
        height: 100px;
    `;
	const Container = styled('div')`
        width: 100%;
        display: flex;
        justify-content: center;
    `


	return(
		<Container>
			<Ripple style={{visibility:props.visibility?"visible":"hidden"}}>
				<div></div>
				<div></div>
			</Ripple>
		</Container>
	);
};

const ButtonWhite = styled('button')`
	&:hover{
		background-color:green ;
		color: white;
	  cursor: pointer;
	}
	border: 1px #27ad27 solid;
	background-color: white;
	line-height: 30px;
	border-radius: 5px;
	color: #27ad27;
	width: 100px;
	margin: 10px;
`
const ButtonRed = styled('button')`
	&:hover{
	  background-color:#df3052;
	  
	  cursor: pointer;
	}
	border: 1px #ff1f4c solid;
	background-color: #ff3860;
	line-height: 30px;
	border-radius: 5px;
	color: white;
	width: 100px;
	margin: 10px;
`

const InputTextRow = styled('div')`
   &:focus-within{
    color: #27ab27;
   }
  ${'input'}{
    &:focus{  
      border-bottom: solid 2px #27ad27;
      border-top: solid 2px #27ad27;
    }
    &::-webkit-inner-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
    }
    
    font-family: Calibri;
    box-sizing: border-box;
    border: solid 1px grey;
    border-radius: 5px;
    width: 100%;
    font-size: 20px;
  }
  ${'textarea'}{
  	&:focus{  
      border-bottom: solid 2px #27ad27;
      border-top: solid 2px #27ad27;
    }
    &::-webkit-inner-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
    }
    font-family: Calibri;
    box-sizing: border-box;
    border: solid 1px grey;
    border-radius: 5px;
    width: 100%;
    font-size: 15px;
    resize: none;
  }
  color: grey;
  font-size: 15px;
  margin-bottom: 10px;
  width: 100%;
`;

const Facility = (props)=> {
	const Container = styled('div')`
		${'img'}{
			width: 100%;
			
		}
		&:hover{
			cursor: pointer;
		}
		width: 80px;
		padding: 2px;
		text-align: center;
		box-sizing: border-box;
		border: 1px grey solid;
		margin: 2px;
		border-radius: 5px;
		overflow: revert;
	`

	const Icon = styled('div')`
		height: 30px;
		width: 30px;
		margin: 0 auto;
	`
	return(
		<Container style={{
			borderColor:props.clicked?'#27ad27':'white',
			color:props.clicked?'#27ad27':'black'
		}} onClick={props.click}>
			<Icon>
				<img src={props.src} alt=''/>
			</Icon>
				{props.name}
		</Container>
	);
}

const FormContainer = styled('div')`
	width: 100%;
	height: 100%;
	transition: 0.3s;	
`


const ConfirmModal = (props)=> {

	const Container = styled('div')`
		position: fixed;
		width: 100%;
	`
	const ContainerInside = styled('div')`
		text-align:center ;
		background: white;
		border-radius: 10px;
		padding: 10px;
		position: absolute;
		left: 30%;
`
	const Text = styled('div')`
		text-align: center;
		width: 100%;
		font-size: 20px;
`
	return(
		<Container style={{visibility:props.visibility? 'visible':'hidden'}}>
			<ContainerInside >
				<Text>
					Apakah anda yakin?
					<br/>
					{props.action}
				</Text>
				<div>
					<ButtonRed onClick={()=>props.cancel()}> Cancel</ButtonRed>
					<ButtonWhite onClick={()=>props.agree()}> Yes </ButtonWhite>
				</div>
			</ContainerInside>
		</Container>
	);
}

export {ButtonRed,ButtonWhite,GreenFontHover,ConfirmModal,PopMessage, ButtonOrange,InputText,MessageError,MiniLoader,InputTextRow,Facility,FormContainer};