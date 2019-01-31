
import _state from './state'
import { GETMDD, GETALLCITY, SALESPLACE} from './const'

const mdd=(state=_state, action)=>{
	var new_state= Object.assign({}, state);
	switch(action.type){
		case 'GETMDD':
			new_state.hotmdd= action.hotmdd;
			break;
		case 'GETALLCITY':
			new_state.allcity=action.allcity;
			break;
		case 'SALESPLACE':
			new_state.salesPlace=action.salesPlace;
			break;
			default: break;
			
	}
	return new_state;
}

export default mdd