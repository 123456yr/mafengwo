
import _state from './state'

const banner=(state=_state, action)=>{
	var newState= Object.assign({}, state);
	switch(action.type){
		case 'GETBANNER':
			newState.imgBanner= action.imgs;
			break;
		case 'BLBANNER':
			newState.glBanner= action.imgs;
			break;
		default: break;
	}
	
	return newState;
}

export default banner