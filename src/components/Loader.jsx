import React, {Component} from 'react';
import styled, {keyframes} from "styled-components";


const Animation = keyframes`
        0% {
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: -1px;
          left: -1px;
          bottom: -1px;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
    `
const Ripple = styled('div')`
        ${'div'}{
          &:nth-child(2) {
            animation-delay: -0.5s;
          }
          position: absolute;
          border: 4px solid whitesmoke;
          opacity: 1;
          border-radius: 50%;
          animation: ${Animation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        display: inline-block;
        position: relative;
        width: 45%;
        height: 85%;
    `;
const Container = styled('div')`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        height: 100vh;
        background-color: rgba(0,0,0,0.9);
        
    `;



class Loader extends Component {
	render() {
		return (
			<Container>
				<Ripple>
					<div></div>
					<div></div>
				</Ripple>
			</Container>
		)
	}
}

export default Loader;