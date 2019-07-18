import React, {Component} from 'react';
import axios from 'axios';
import ReviewContainer from "../container/ReviewContainer";
import styled from 'styled-components';
import {ButtonWhite} from "../Utility";
import Footer from "../components/Footer";

const myAxios = axios.create({validateStatus:false});
const Container = styled('div')`
	width: 80%;
	margin: 0 auto;
	box-shadow: 0 3px 20px 0 rgba(0,0,0,.07);
    border-radius: 3px;
    padding: 2.5rem;
`
class ReviewPage extends Component {
	state={
		property :"",
		reviews: '',
		paginate:''
	}


	componentWillMount() {
		this.getProperty()
	}

	moreReview(){
		let slug = this.props.match.params.slug;
		let nextPage = this.state.paginate.current_page + 1;
		if(nextPage <= this.state.paginate.last_page){
			myAxios.get(`http://127.0.0.1:8000/getPaginateReview?page=${nextPage}&slug=${slug}`).then((response)=>{
				const {data, ...paginate} = response.data.review;
				this.setState({reviews:this.state.reviews.concat(data),paginate:paginate});
				console.log(data,paginate)
			}).catch((error)=>{
				console.log(error)
			})
		}


	}
	getProperty(){
		let slug = this.props.match.params.slug;
		myAxios.get(`http://127.0.0.1:8000/getPaginateReview?slug=${slug}`).then((response)=>{
			const {data, ...paginate} = response.data.review;
			this.setState({reviews:data,paginate:paginate});
		}).catch((error)=>{
			console.log(error)
		})
	}

	render() {
		return (
			<Container>
				{this.state.reviews && <ReviewContainer review={this.state.reviews}/>}
				<ButtonWhite onClick={()=>this.moreReview()}> See More</ButtonWhite>
				<Footer/>
			</Container>
		);
	}
}




export default ReviewPage;