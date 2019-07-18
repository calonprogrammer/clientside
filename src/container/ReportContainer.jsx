import React, {Component} from 'react';
import styled from "styled-components";


const Container= styled('div')`
	${'h4'}{
		text-align: center;
	}
  &:hover{
    box-shadow: 0px 2px 5px 2px #888888;
    cursor: pointer;
    transition: 0.2s;
  }
  background-color: antiquewhite;
  margin-left:15px ;
  margin-bottom:15px ;
  width: 300px;
  display: inline-block;
  transition: 0.2s;
  box-shadow: 0px 0.3px 0.3px 0.3px #888888;
  box-sizing: border-box;
  border-radius: 5px;
`;
const ImageContainer = styled('div')`
	${'img'}{
		height: 100%;
		width: 100%;
		margin: 0 auto;
	}
	height: 150px;
	margin:0 auto;
	overflow: hidden;
	display: flex;
`;
const Detail = styled('div')`
	text-align: center;
	width: 100%;
	background-color: #27ad27;
	color: whitesmoke;
	font-size: 20px;
`;
class ReportContainer extends Component {
	render() {
		return (
			<Container>
				<h4>Laporan</h4>

				<ImageContainer>
					<div>
						<img src={`http://localhost:8000/`+ this.props.report.user.picture_id} alt=""/>
					</div>
					<div>
						<img src={`http://localhost:8000/`+ this.props.report.property.pict_id} alt=""/>
					</div>
				</ImageContainer>
				<Detail>
					Property :{this.props.report.property.name} <br/>
					Reporter :{this.props.report.user.name} <br/>
					<br/>{this.props.report.content}
				</Detail>
			</Container>
		);
	}
}

export default ReportContainer;