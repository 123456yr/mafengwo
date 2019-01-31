import React ,{ Component} from 'react'
import './index.scss'

class Toast extends Component{
	
	constructor(props){
		super(props)
	}
	
	render(){
//		let {content}=this.state;
		let {changeContent, content}=this.props;
		return (
			<div ref={'toastbox'} className="toast-box" onClick={changeContent} style={{'display': 'none'}}>
				<a>
				{ !content || <span className="toast-content">{content}</span>}
					
				</a>
			</div>
		)
	}
	
}

export default Toast