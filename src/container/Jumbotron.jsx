import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  background: url("/assets/header.jpg") no-repeat center; 
  background-size: cover;
  color: white;
  justify-content: center;
  text-align: center;
  height: 40vh;
  width: 100%;
`;

const TextCenter = styled('div')`
   @media only screen and (max-width: 991px){
    ${'h1'}{
      display: none;
      margin: 0;
    }
    ${'h6'}{
      display: none;
    }
  }
  text-align: center;
  font-family: Titillium Web,sans-serif;
  font-size: 1.45em; 
`
const SearchBar = styled('div')`
  ${'img'}{
    height: 25px;
  }
  ${'span'}{
    &:hover{
      cursor: text;
    }
    height: 40px;
    width: 100%;
    font-size: 100%;
    color: grey;
    margin-left: 10px;
  }
  ${'label'}{
    color: black;
    font-size: 1em;
    font-family: Titillium Web,sans-serif;
  }
  background: white;
  max-width: 800px;
  min-width: 300px;
  margin-left: auto;
  margin-right:auto;
  border-radius: 10px;
  padding:20px 0px 0px 10px;
  box-shadow: #a9a9acf8 4px 4px;
  box-sizing: border-box;
`

const SearchBarBottom = styled('div')`
  display: flex;
  padding: 0;
  align-items: center;
`

class Jumbotron extends Component {
	render() {
		return (
			<Container>
				<TextCenter>
					<h1>Mau cari kos kosan?</h1>
					<h6>Dapatkan info kost murah, kost harian, kost bebas, dan info kosan lainnya di Mamikos!</h6>
				</TextCenter>
				<SearchBar>
					<strong><label>Pilih Lokasi</label></strong>
					<br/>
					<SearchBarBottom>
						<img src={process.env.PUBLIC_URL + '/assets/search-icon.png'} alt=""/>
						<span>Cari nama tempat atau alamat..</span>
					</SearchBarBottom>
				</SearchBar>
			</Container>
		);
	}
}

export default Jumbotron;