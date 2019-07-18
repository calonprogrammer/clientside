import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';
import styled from 'styled-components';
const Container = styled('div')`
	${'#map'}{
		width: 100%;
		height: 100%;
		margin: 0 auto;
		@media only screen and (max-width: 991px){
			width: 100%;
			height: 300px;
		}
	}
	overflow: hidden;
	width: 400px;
	height: 400px;
	z-index: 1;
`


delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
class LeafletMap extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount() {
		console.log(this.props);
	}

	render() {
		return (
			<Container id={'leafletContainer'}>
				<Map id={'map'} center={this.props.coords} zoom={this.props.zoom} onClick={(event)=>this.props.click(event)}>
					<TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
					/>
					<Marker position={this.props.coords}/>
				</Map>

			</Container>
		);
	}
}

export default LeafletMap;