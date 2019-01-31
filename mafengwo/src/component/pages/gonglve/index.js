import React ,{ Component} from 'react'
import './index.scss'
import LeftAside from './leftaside'
import GlSwiper from './swiper'
import RightAside from './rightaside'

class CoogLve extends Component{
	
	render(){
		return (
			<div className="gonglve-box clear">
				<div className="clear">
					<LeftAside/>
					<GlSwiper/>
				</div>
				<RightAside/>
			</div>
		)
	}
	
}

export default CoogLve