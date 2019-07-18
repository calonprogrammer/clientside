import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled('div')`
	@media only screen and (max-width: 991px){
		display: block;
		text-align: justify;
	}
	${'#footerBottom'}{
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}
	${'#left'}{
		width: 100%;
	}
	${'#right'}{
		width: 100%;
	}
	${'img'}{
		width: 200px;
	}
	padding: 0 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: whitesmoke;
`
class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<Container>
					<div id={'left'}>
						<strong>BarbarKos- Aplikasi Pencari Info Kost No 1 Di Indonesia</strong><br/><br/>
						MAMIKOS menyajikan informasi Kamar kosan, lengkap dengan fasilitas kost, harga kost, dan dekorasi kamar beserta foto desain kamar yang disesuaikan dengan kondisi sebenarnya. Setiap Rumah Kost yang ada di MAMIKOS benar-benar kami datangi, kami verifikasi, kami seleksi dan kami ambil data langsung, termasuk kost yang didaftarkan oleh pemilik atau umum. Informasi ketersediaan kamar kost dan harga kost kami update max setiap 2 minggu sekali untuk memastikan info kost kami akurat dan bermanfaat untuk anak kost. Saat ini kami memiliki lebih dari 10.000+ info kost dan masih terus bertambah di Indonesia. Data Kamar kosan yang kami miliki telah mencakup kost di depok, kost jakarta, kost Jogja, hingga Kost Bandung dan Kost di Surabaya. Pengembangan data kosan masih terus kami usahakan. Namun demikian, kamu dapat request penambahan info kosan di seputar area yang kamu inginkan dengan mengisi data di Form Komplain. Kamu juga dapat menambahkan masukan, saran dan kritikan untuk mamikos di form tersebut. Dukungan kamu, akan mempercepat pengembangan data kosan yang kami miliki. <br/><br/>
						Jika kamu ingin mendapatkan inspirasi desain kamar minimalis atau kamar kost minimalis kamu bisa cek kost eksklusif yang ada di Mamikos. Dengan luas ruangan yang hampir sama, kebanyakan Kamar kost eksklusif hanya diberikan desain kamar atau dekorasi kamar yang lebih menarik, ditambah tempat tidur beserta atributnya dan kamar mandi dalam plus AC, dengan tambahan internet. kosan ini tentunya dapat menjadi alternatif untuk kamu anak kost yang ingin mendesain kamar kost minimalis namun tetap eksklusif. Di Mamikos kini juga telah ditambahkan berbagai info kosan dengan harga murah ataupun beberapa tipe kosan lain sesuai masukan dari pengguna Mamikos.
					</div>
					<div id={'right'}>
						Berbagai Informasi akurat yang dapat kamu lihat di Mamikos : <br/><br/>
						<ul>
							<li>Alamat Rumah Kost yang Akurat dilengkapi peta lokasi kost yang relevan</li>
							<li>Foto-foto lengkap fasilitas kosan dan desain kamar kost</li>
							<li>Harga Kost yang selalu diupdate</li>
							<li>Informasi ketersediaan kamar kost yang selalu diupdate 2 minggu sekali</li>
							<li>Layanan Customer Service yang lebih terintegrasi melalui chat (Maksimal pelayanan 1 x 24 jam)</li>
							<li>Google Map untuk membantu navigasi kamu ke kosan</li>
							<li>Filter pencarian kost untuk membantumu menemukan kosan idamanmu</li>
							<li>Penambahan fitur clustering atau pengelompokan kost untuk mempermudah pencarian dan mempercepat loading</li>
						</ul>
						<br/><br/>
						<ul>
							Fitur Pencarian kosan di Mamikos: <br/><br/>

							<li>Cari kost dekat Kampus/Universitas di masing-masing kota</li>
							<li>Cari kost di Jogja, Depok, Jakarta, Surabaya, Bandung, dan Kota besar lainnya</li>
							<li>Cari kost di sekitar lokasi saya saat ini</li>
							<li>Fitur Berlangganan (dapatkan update info kosan yang kamu inginkan lewat email)</li>
							<li>Fitur Favorit kost (sukai dan simpan kamar kost yang kamu suka)</li>
							<li>Filter Pencarian Kost berdasarkan Tipe Kost (Kost Putra, Kost Putri, Kost Campur), Spesifikasi Kost (Kost Bebas, Kost Pasutri, Kost AC, Kost Kamar mandi dalam, Kost Wifi dll), Tipe Pembayaran Kost (Kost Harian, Kost Bulanan, Kost Tahunan)</li>
							<li>Fitur History (tampilkan kembali kosan yang pernah kamu kunjungi atau pernah kamu hubungi)</li>
						</ul>
					</div>
				</Container>
				<Container>
					<div id={'footerBottom'}>
						<div><img src={process.env.PUBLIC_URL + "/assets/logo_mamikos_green.svg"} alt="Logo_green"/></div>
						<h4>Dapatkan "info kost murah" hanya di MamiKos App.</h4>
					<div>Mau "Sewa Kost Murah"?</div>
					<div>Download MamiKos App Sekarang!</div>
					</div>
				</Container>
			</React.Fragment>
		);
	}
}

export default Footer;