import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from "../components/Loader";
import ReportContainer from "../container/ReportContainer";
import {ButtonRed, ButtonWhite} from "../Utility";
import Breadcrumb from "../components/Breadcrumb";


const Container = styled('div')`
	width: 100%;	
	display: flex;
	margin: 30px auto;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	background: #fff;
  	box-shadow:
    0 1px 1px rgba(0,0,0,0.15),
    0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0,0,0,0.15),
    0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0,0,0,0.15);
`;
const CurrentPage = styled('div')`
	background-color: #27ad27;
	width: 50px;
	border-radius: 5px;
	color: white;
	font-size: 20px;
	text-align: center;
	line-height: 50px;	
`
class ManageReportPage extends Component {
	state ={
		isLoading :true,
		reports : [],
		paginate:null
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData(){
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers :{
				Authorization : 'Bearer '+token,
			}
		};
		axios.get(`http://127.0.0.1:8000/admin/getReport`,config).then((response)=>{
			const{data,...paginate} =response.data.reports;
			this.setState({reports:data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			this.setState({isLoading:false})
		})
	}

	next(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`${this.state.paginate.next_page_url}`,config).then((response)=>{
			const{data,...paginate} =response.data.reports;
			this.setState({reports:data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
		});
	}
	prev(){
		this.setState({isLoading:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		//request data user
		let config = {
			headers : {
				Authorization : 'Bearer ' + token
			}
		}
		axios.get(`${this.state.paginate.prev_page_url}`,config).then((response)=>{
			const{data,...paginate} =response.data.reports;
			this.setState({reports:data,paginate:paginate,isLoading:false});
		}).catch((error)=>{
			console.log(error)
			this.setState({isLoading:false});
		});
	}
	render() {
		return (
			<React.Fragment>
				{this.state.isLoading && <Loader/>}
				<Container>
					{this.state.reports.map((key)=>
						(<ReportContainer report={key}/>)
					)}
				</Container>
				{
					this.state.paginate &&
					<div style={{
						background: 'whitesmoke',
						margin: '0 auto',
						width: '50%',
						display: 'flex',
						justifyContent: 'space-between'
					}}>
						<ButtonRed onClick={() => this.prev()}>Prev</ButtonRed>
						<CurrentPage>
							{this.state.paginate.current_page}
						</CurrentPage>
						<ButtonWhite onClick={() => this.next()}>Next</ButtonWhite>
					</div>
				}
			</React.Fragment>
		);
	}
}

export default ManageReportPage;