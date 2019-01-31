import React ,{ Component} from 'react'
import './index.scss'
import Header from './header/index'
import HotMdd from './hotmdd'

class Mdd extends Component{
	
	render(){
		return (
			<div className="mdd-box">
				<Header/>
				<div className="mdd-body">
					<HotMdd/>
				</div>
			</div>
		)
	}
	
}

export default Mdd