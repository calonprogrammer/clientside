import  openSocket from 'socket.io-client';

const socket = openSocket(`http://127.0.0.1:5000/`);

let receive = null;

function setReceive(rec){
	receive = rec;
}
function connectSocket(userId){
	socket.on(userId,(from_id,message)=>{
		if(receive != null){
			console.log(message);
			receive(message);
		}
	});

	socket.on('read-'+userId,()=>{});
}

export {connectSocket,socket,setReceive};