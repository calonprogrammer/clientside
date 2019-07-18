const initialState = {
	user : null,
	coords :[0,0]

}

function Reducer(state=initialState,action){
	switch (action.type) {
		case "update_user":
			return Object.assign({}, state, {user: action.value});

		case  "update_coords":
			return Object.assign({},state,{coords:[action.value.latitude,action.value.longitude]});

		default:
			return state;
	}
}

export default Reducer;