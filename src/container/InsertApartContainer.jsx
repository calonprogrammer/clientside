import React, {Component} from 'react';
import styled from "styled-components";
import {
	ButtonRed,
	ButtonWhite,
	Facility,
	FormContainer,
	InputTextRow,
	MessageError,
	MiniLoader,
	PopMessage
} from "../Utility";
import LeafletMap from "../components/LeafletMap";
import {connect} from "react-redux";
import axios from 'axios';
import Breadcrumb from "../components/Breadcrumb";
const myAxios = new axios.create({validateStatus:false});

const Container = styled('div')`
	@media only screen and (max-width: 991px){
		width: 90%;
		border: none;
	}
	border-radius: 2px;
	border: 0.5px grey solid;
	width: 70%;
	margin:40px auto;
`
const Title= styled('div')`
	@media only screen and (max-width: 991px){
		background-color: white;
	}
	background-color: rgba(113, 235, 164, 0.1);
	width: 100%;
	color: black;
	font-weight: bold;
	font-size: 20px;
	border-bottom: 1px black solid;
`
const Form = styled('form')`
	width: 80%;
	margin: 0 auto;
`
const ContainerFacility = styled('div')`
	width: 100%;
	display: flex;
`
const Text = styled('div')`
	margin-top: 20px;
	color: grey;
  	font-size: 15px;
  	margin-bottom: 10px;
`
const File = styled('div')`
	margin:  0 auto;	
	${'input'}{
		background-color: white;
		color: #27ad27;
		border: 1px #27ad27 solid;
		border-radius: 5px;
	}
	display: flex;
	justify-content: center;
`
const ResultPicture = styled('div')`
	${'output'}{
		width: 100%;
		display: flex;
		overflow-x: auto;
		${'img'}{
			border: 1px black solid;
			padding: 1px;
			width: 200px;
			margin-left:5px ;
		}
	}
	width: 100%;
`
const ContainerUpload = styled('div')`
	${'span'}{
		${'input'}{
			display: block;
		}
		display: block;
		
	}
	width: 100%;
`

const ComboFacility = (props)=>{
	const Container = styled('div')`
		color: #27ad27;
	`
	return(
		props.facilities.map((key)=> (
			<Container>
				<input type="checkbox" id={key.id} value={key.id} onChange={(id)=>props.click(key.id)} checked={props.checked.indexOf(key.id)!==-1}/>
				<label htmlFor={key.id}> {key.name}</label>
			</Container>
		))
	);
}
class InsertApartContainer extends Component {

	state = {
		popMessage:false,
		valid:false,
		message:'',
		miniLoader:false,
		publicFacilities:[],
		parkingFacilities:[],
		unitFacilities:[],
		facilitiesUnit:[],
		facilitiesPublic:[],
		facilitiesParking:[],
		dataCities:[],
		coords:[0,0],
		currentForm: 1,
		name : '',
		errorName: '',
		description:'',
		errorDescription:'',
		condition :'',
		errorCondition : '',
		period:'',
		errorPeriod:'',
		area:'',
		errorArea:'',
		type:'',
		city:'',
		errorCity:'',
		errorType:'',
		price:'',
		errorPrice:'',
		floor:'',
		errorFloor:'',
		additionalInformation:'',
		additionalFees:0,
		errorFacility:'',
		roomRemaining:'',
		errorRoomRemaining:'',
		picture : null,
		errorPicture:'',
		banner :null,
		errorBanner : '',
		picture360:null,
		errorPict360:'',
		video:null,
		errorVideo :'',
		address:'',
		errorAddress:'',
		furniture:'',
		errorFurniture:'',
		zoom :13
	}

	componentWillMount() {
		this.fetchCity();
		this.getLocation();
		this.getFacility();
	}
	handleName(event) {
		this.setState({name: event.target.value});
	}
	handleDescription(event){
		this.setState({description: event.target.value});
	}
	handlePrice(event){
		this.setState({price: event.target.value});
	}
	handleCondition(event){
		this.setState({condition:event.target.value});
	}
	handlePeriod(event){
		this.setState({period:event.target.value});
	}
	handleType(event){
		this.setState({type:event.target.value});
	}
	handleFloor(event){
		this.setState({floor:event.target.value});
	}
	handleArea(event){
		this.setState({area:event.target.value});
	}
	handleMap(event){
		this.setState({coords:[event.latlng.lat,event.latlng.lng]});
	}
	handleAddress(event){
		this.setState({address:event.target.value});
	}
	handleBanner(event){
		this.setState({errorBanner:''});
		let file = event.target.files[0];
		let output = document.getElementById('bannerResult');
		if(file.type != 'image/jpeg'){
			this.setState({errorBanner : "Banner harus bertipe image/jpeg"});
			return;
		}
		let picReader = new FileReader();
		picReader.addEventListener('load',(event)=>{
			var picFile = event.target;
			let div = document.createElement('div');
			div.innerHTML = '<img src="' + picFile.result + '"' +
				"title=’" + picFile.name + "'/>";
			output.insertBefore(div,null);
		});
			picReader.readAsDataURL(file);
			this.setState({banner:file});
	}
	handlePicture360(event){
		this.setState({errorPict360:''});
		let file = event.target.files[0];
		let output = document.getElementById('picture360Result');
		if(file.type != 'image/jpeg'){
			this.setState({errorPicture360 : "Picture 360 harus bertipe image/jpeg"});
			return;
		}
		let picReader = new FileReader();
		picReader.addEventListener('load',(event)=>{
			var picFile = event.target;
			let div = document.createElement('div');
			div.innerHTML = '<img src="' + picFile.result + '"' +
				"title=’" + picFile.name + "'/>";
			output.insertBefore(div,null);
		});
		picReader.readAsDataURL(file);
		this.setState({picture360:file});
	}
	handleCity(event){
		this.setState({city:event.target.value});
	}
	handleVideo(event){
		this.setState({errorVideo:''});
		let file = event.target.files[0];
		let output = document.getElementById('picture360Result');
		if(file.type != 'video/mp4'){
			this.setState({errorVideo : "Video harus bertipe video/mp4"});
			return;
		}
		this.setState({video:file});
	}
	handlePicture(event){
		this.setState({errorPicture:''});
		let file = event.target.files[0];
		let output = document.getElementById('pictureResult');
		if(file.type != 'image/jpeg'){
			this.setState({errorPicture : "Picture harus bertipe image/jpeg"});
			return;
		}
		let picReader = new FileReader();
		picReader.addEventListener('load',(event)=>{
			let picFile = event.target;
			let div = document.createElement('div');
			div.innerHTML = '<img src="' + picFile.result + '"' +
				"title=’" + picFile.name + "'/>";
			output.insertBefore(div,null);
		});
		picReader.readAsDataURL(file);
		this.setState({picture:file});
	}
	handleAdditionalInformation(event){
		this.setState({additionalInformation:event.target.value});
	}
	handleAdditionalFees(event){
		this.setState({additionalFees:event.target.value});
	}
	handleUnitFacilities(id){
		let index = this.state.facilitiesUnit.indexOf(id);
		if(index === -1){
			let temp = this.state.facilitiesUnit.concat(id);
			this.setState({facilitiesUnit:temp});
		}else{
			let temp = this.state.facilitiesUnit;
			temp.splice(index,1);
			this.setState({facilitiesUnit:temp});
		}
	}
	handlePublicFacilities(id){
		let index = this.state.facilitiesPublic.indexOf(id);
		if(index === -1){
			let temp = this.state.facilitiesPublic.concat(id);
			this.setState({facilitiesPublic:temp});
		}else{
			let temp = this.state.facilitiesPublic;
			temp.splice(index,1);
			this.setState({facilitiesPublic:temp});
		}
	}
	handleParkingFacilities(id){
		let index = this.state.facilitiesParking.indexOf(id);
		if(index === -1){
			let temp = this.state.facilitiesParking.concat(id);
			this.setState({facilitiesParking:temp});
		}else{
			let temp = this.state.facilitiesParking;
			temp.splice(index,1);
			this.setState({facilitiesParking:temp});
		}
	}
	getFacility(){
		myAxios.get(`http://127.0.0.1:8000/getFacility`).then((response)=>{
			this.initialFacility(response);
		}).catch((error)=>{
			console.log(error)
		})
	}
	initialFacility(response){
		let facilities = response.data.facilities;
		facilities.map((key)=>{
			if(key.type == 1){
				this.state.unitFacilities.push(key);
			}else if(key.type == 2){
				this.state.publicFacilities.push(key);
			}else if(key.type == 3){
				this.state.parkingFacilities.push(key);
			}
		});
	}
	handleFurniture(event){
		this.setState({furniture:event.target.value});
	}
	next(event){
		event.preventDefault();
		if(this.state.currentForm < 6){
			if(this.validate())
				this.setState((prevState)=>({currentForm:prevState.currentForm += 1}));
		}
	}
	prev(event){
		event.preventDefault();
		if(this.state.currentForm > 1){
			this.setState((prevState)=>({currentForm:prevState.currentForm -= 1}));
		}
	}
	setPosition(position){
		this.props.update_coords([position.coords.latitude,position.coords.longitude]);
		this.setState({coords:[position.coords.latitude,position.coords.longitude]});
	}
	fetchCity(){
		myAxios.get(`http://127.0.0.1:8000/getAllCity`).then((response)=>{
			this.setState({dataCities:response.data.cities})
		}).catch((error)=>{
			console.log(error)
		});
	}
	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				this.setPosition(position)},()=>this.setPosition([-6.2026 ,106.776]));
		} else {
			console.log('Geolocation is not supported by this browser.')
		}
	}
	validate(){
		this.setState({errorFurniture:'',errorName:'',errorAddress:'',errorCity:'',errorDescription:'',errorArea:'',errorCondition:'',errorType:'',errorPrice:'', errorFloor:'',errorRoomRemaining:''});
		let currentState = this.state.currentForm;
		if(currentState === 1){
			if(this.state.name.trim() === ''){
				this.setState({errorName:'Nama Apartement tidak boleh kosong'});
				return false;
			}
			if(this.state.description.trim() === '' || this.state.description.length < 8){
				this.setState({errorDescription:'Deskripsikan Apartement anda minimal 8 character'});
				return false;
			}
			if(this.state.address.trim() === ''){
				this.setState({errorAddress:'Address tidak boleh kosong'});
				return false
			}
			if(this.state.city.trim() === ''){
				this.setState({errorCity:'Harap perhatikan letak kotanya'});
				return false;
			}
			return true;
		}
		if(currentState === 2){
			if(this.state.area.trim() === ''){
				this.setState({errorArea:'Area tidak boleh kosong'});
				return false;
			}
			if(this.state.condition.trim() === ''){
				this.setState({errorCondition:'Harap tentukan kondisi unit'});
				return false;
			}
			if(this.state.type.trim() === ''){
				this.setState({errorType:'Harap tentukan type unit'});
				return false;
			}
			if(this.state.furniture.trim() === ''){
				this.setState({errorFurniture:'Tentukan Furniture'});
				return false;
			}
			return true;
		}
		if(currentState === 3){
			if(this.state.price.trim() === ''){
				this.setState({errorPrice : 'Tentukan harga unit apartement dan perhatikan periode harga'});
				return false;
			}
			if(this.state.period.trim() === ''){
				this.setState({errorPeriod:'Tentukan Periode dari harga diatas'});
				return false;
			}
			if(this.state.floor.trim() === ''){
				this.setState({errorFloor: 'Tingkat unit harus diisi'});
				return false
			}
			return true;
		}
		if(currentState === 4){
			if(this.state.facilitiesUnit.length === 0){
				this.setState({errorFacility:'Pilih Minimal 1 Fasilitas Unit'});
				return false;
			}
			return true;
		}
		if(currentState === 5){
			return true;
		}
	}
	disablePopMessage(){
		this.setState({popMessage:false});
	}
	submit(event){
		event.preventDefault();
		this.setState({miniLoader:true});
		let token = JSON.parse(sessionStorage.getItem('credentials'));
		let config = {
			headers: {
				Authorization : 'Bearer '+token,
				'content-type': 'multipart/form-data'
			}
		}
		let facilities =[];
		this.state.facilitiesUnit.map((key)=>{
			facilities.push(key)
		});
		this.state.facilitiesPublic.map((key)=>{
			facilities.push(key);
		});
		this.state.facilitiesParking.map((key)=>{
			facilities.push(key)
		});
		let payload = new FormData();
		payload.append('name',this.state.name);
		payload.append('user_id',this.props.user.id);
		payload.append('pict_id',this.state.picture);
		payload.append('banner_id',this.state.banner);
		payload.append('pict360_id',this.state.picture360);
		//payload.append('video_id',this.state.video);
		payload.append('description' ,this.state.description);
		payload.append('unit_type',this.state.type);
		payload.append('unit_area',this.state.area);
		payload.append('unit_condition',this.state.condition);
		payload.append('unit_floor',this.state.floor);
		payload.append('furnished',this.state.furniture);
		payload.append('facilities',facilities);
		payload.append('additional_information',this.state.additionalInformation);
		payload.append('additional_fees',this.state.additionalFees);
		payload.append('price',this.state.price);
		payload.append('period',this.state.period);
		payload.append('city_id',this.state.city);
		payload.append('latitude',this.state.coords[0]);
		payload.append('longitude',this.state.coords[1]);
		payload.append('address',this.state.address);
		myAxios.post(`http://127.0.0.1:8000/owner/addApartemen`,payload,config).then((response)=>{
			console.log(response);
			if(response.data.message == 'Success'){
				this.setState({message:response.data.message,valid:true,miniLoader:false,popMessage:true},()=>window.location.reload());
			}else{
				this.setState({message:response.data.message,valid:false,miniLoader:false,popMessage:true});
			}

		}).catch((error)=>{
			console.log(error);
		});

	}

	render() {
		return (
			<React.Fragment>
				<PopMessage message={this.state.message} valid={this.state.valid} visibility={this.state.popMessage} click={()=>this.disablePopMessage()}/>
				<Container>
					<Title>Insert Apartement</Title>
					<Form>
						{
							this.state.currentForm === 1 &&
								<FormContainer>
									<InputTextRow>
										<Text>Nama Apartement <span style={{color: 'red'}}>*</span></Text>
										<input type="text" value={this.state.name} autoFocus={true} onChange={(event)=>this.handleName(event)}/>
										<MessageError errorMessage={this.state.errorName} />
									</InputTextRow>
									<InputTextRow>
									<Text>Deskripsi <span style={{color: 'red'}}>*</span></Text>
									<textarea value={this.state.description} onChange={(event)=>this.handleDescription(event)} rows='10'  />
									<MessageError errorMessage={this.state.errorDescription} />
									<InputTextRow>
										<Text>Address </Text>
										<textarea value={this.state.address} onChange={(event)=>this.handleAddress(event)} rows='6'  />
										<MessageError errorMessage={this.state.errorAddress}/>
									</InputTextRow>
									</InputTextRow>
									<Text>Kota <span style={{color: 'red'}}>*</span></Text>
									<select onChange={(event)=>this.handleCity(event)} style={{width:'30%',
										borderRadius: '5px', color:'#27ad27', fontSize:'15px',height:'30px'}}   >
										{
											this.state.dataCities && this.state.dataCities.map((key)=>(
												<option value={key.id}>{key.name}</option>
												)
											)
										}
									</select>
									<MessageError errorMessage={this.state.errorCity}/>
								</FormContainer>
						}
						{
							this.state.currentForm === 2 &&
								<FormContainer>
									<InputTextRow>
										<Text>Area Unit / m<sup> 2 </sup><span style={{color: 'red'}}>*</span></Text>
										<input type="number" value={this.state.area} onChange={(event)=>this.handleArea(event)}/>
										<MessageError errorMessage={this.state.errorArea}/>
									</InputTextRow>
									<Text>Kondisi Unit<span style={{color: 'red'}}>*</span></Text>
									<select onChange={(event)=>this.handleCondition(event)} style={{width:'20%',
										borderRadius: '5px', color:'#27ad27', fontSize:'15px', height:'30px'}} name='period'>
										<option value={'Baru'}>Baru</option>
										<option value={'Bekas'}>Bekas</option>
									</select>
									<MessageError errorMessage={this.state.errorCondition}/>
									<Text>Tipe Unit <span style={{color: 'red'}}>*</span> </Text>
									<select onChange={(event)=>this.handleType(event)} style={{width:'20%',
										borderRadius: '5px', color:'#27ad27', fontSize:'15px',height:'30px'}} name='period'>
										<option value={'Studio'}>Studio</option>
										<option value={'Alcove'}>Alcove</option>
										<option value={'Convertible'}>Convertible</option>
										<option value={'Junior 1 Bedroom'}>Junior 1 Bedroom</option>
										<option value={'2 Bedroom'}>2 Bedroom</option>
										<option value={'Duplex'}>Duplex</option>
										<option value={'Triplex'}>Triplex</option>
										<option value={'Loft'}>Loft</option>
										<option value={'Classic Six'}>Classic Six</option>
										<option value={'Three-Room'}>Three-Room</option>
										<option value={'Garden Apartment'}> Garden Apartment</option>
									</select>
									<MessageError errorMessage={this.state.errorType}/>
									<InputTextRow>
										<Text>Furniture <span style={{color: 'red'}}>*</span> </Text>
										<select onChange={(event)=>this.handleFurniture(event)} style={{width:'20%',
											borderRadius: '5px', color:'#27ad27', fontSize:'15px', height:'30px'}} name='period'>
											<option value={'Furnished'}>Furnished</option>
											<option value={'Semi-Furnised'}>Semi-Furnished</option>
											<option value={'Not-Furnised'}>Not-Furnished</option>
										</select>
										<MessageError errorMessage={this.state.errorFurniture} />
									</InputTextRow>
								</FormContainer>
						}
						{
							this.state.currentForm === 3 &&
							<FormContainer>
								<InputTextRow>
									<Text>Harga <span style={{color: 'red'}}>*</span></Text>
									<input type='number' value={this.state.price} onChange={(event)=>this.handlePrice(event)} />
									<MessageError errorMessage={this.state.errorPrice} />
									<select onChange={(event)=>this.handlePeriod(event)} style={{width:'20%',
										borderRadius: '5px', color:'#27ad27', fontSize:'15px',height:'30px'}} name='period'>
										<option value={'day'}>Day</option>
										<option value={'week'}>Week</option>
										<option value={'month'}>Month</option>
										<option value={'year'}>Year</option>
									</select>
									<MessageError erorPeriod={this.state.errorPeriod}/>
								</InputTextRow>
								<InputTextRow>
									<Text>Biaya Tambahan</Text>
									<input type="number" value={this.state.additionalFees} onChange={(event)=>this.handleAdditionalFees(event)}/>
								</InputTextRow>
								<InputTextRow>
									<Text>Tingkat Unit <span style={{color: 'red'}}>*</span></Text>
									<input type="number" onChange={((event)=>this.handleFloor(event))} value={this.state.floor}/>
									<MessageError errorMessage={this.state.errorFloor} />
								</InputTextRow>
								<InputTextRow>
									<Text>Informasi Tambahan</Text>
									<input type="text" onChange={(event)=>this.handleAdditionalInformation(event)} value={this.state.additionalInformation}/>
								</InputTextRow>
							</FormContainer>
						}
						{
							this.state.currentForm === 4 &&
							<FormContainer>
								<Text>Fasilitas Unit</Text>
								<ComboFacility facilities={this.state.unitFacilities} checked={this.state.facilitiesUnit} click={(id)=>this.handleUnitFacilities(id)}/>
								<MessageError errorMessage={this.state.errorFacility}/>
								<Text>Fasilitas Public</Text>
								<ComboFacility facilities={this.state.publicFacilities} checked={this.state.facilitiesPublic} click={(id)=>this.handlePublicFacilities(id)}/>
								<Text>Facilitas Parkir</Text>
								<ComboFacility facilities={this.state.parkingFacilities} checked={this.state.facilitiesParking} click={(id)=>this.handleParkingFacilities(id)}/>
							</FormContainer>
						}
						{
							this.state.currentForm === 5 &&
								<div>
									<Text>Pilih Lokasi <span style={{color: 'red'}}>*</span></Text>
									<LeafletMap id='picture' coords={this.state.coords} zoom={17} click={(event)=>this.handleMap(event)}/>
								</div>
						}
						{
							this.state.currentForm === 6 &&
							<ContainerUpload>
								<Text>Upload File</Text>
								<span>
									<Text>Gambar</Text>
									<File>
										<input type="file" onChange={(event)=>this.handlePicture(event)} multiple={true}/>
										<MessageError errorMessage={this.state.errorPicture}/>
									</File>
									<ResultPicture>
										<output id='pictureResult' />
									</ResultPicture>
								</span>
								<span>
									<Text>Banner</Text>
									<File>
										<input type="file" onChange={(event)=>this.handleBanner(event)} multiple={true}/>
										<MessageError errorMessage={this.state.errorBanner}/>
									</File>
									<ResultPicture>
										<output id='bannerResult' />
									</ResultPicture>
								</span>
								<span>
									<Text>Gambar 360</Text>
									<File>
										<input type="file" onChange={(event)=>this.handlePicture360(event)} multiple={true}/>
										<MessageError errorMessage={this.state.errorPict360}/>
									</File>
									<ResultPicture>
										<output id='picture360Result' />
									</ResultPicture>
								</span>
								{/*<span>*/}
								{/*	<Text>Video</Text>*/}
								{/*	<File>*/}
								{/*		<input type="file" onChange={(event)=>this.handleVideo(event)} multiple={true}/>*/}
								{/*		<MessageError errorMessage={this.state.errorVideo}/>*/}
								{/*	</File>*/}
								{/*	<ResultPicture>*/}
								{/*		<output id='videoResult' />*/}
								{/*	</ResultPicture>*/}
								{/*</span>*/}
							</ContainerUpload>
						}
						<div>
							<ButtonRed onClick={(event)=>this.prev(event)}>Prev</ButtonRed>
							{
								this.state.currentForm  != 6 && <ButtonWhite onClick={(event)=>this.next(event)}>Next</ButtonWhite>
							}
							{
								this.state.currentForm == 6 && <ButtonWhite onClick={(event)=>this.submit(event)}>Submit</ButtonWhite>
							}
							<MiniLoader visibility={this.state.miniLoader}/>

						</div>
					</Form>
				</Container>
			</React.Fragment>
		);
	}

}

const MapStateToProps = state => {
	return{
		user:state.user,
		coords:state.coords
	}
}
const MapDispatchToProps = dispatch =>{
	return{
		update_user : key =>dispatch({
			type:"update_user",
			value:key

		}),
		update_coords: key=>dispatch({
			type :"update_coords",
			value:key
		})
	}
}

export default connect(MapStateToProps,MapDispatchToProps) (InsertApartContainer);
