import {LOGIN,CHANGE_CITY} from './const'
import _state from './state'

const reducer=(state=_state, action)=>{
	var new_state= Object.assign({}, state);
	switch(action.type){
		case LOGIN: 
		new_state.username= action.username;
		localStorage.username=action.username;
		break;
		case 'CHANGE_CITY':
		new_state.city=action.city; break;
		default: break;
	}
	return new_state;
}

export default reducer