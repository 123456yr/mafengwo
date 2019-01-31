import React ,{ Component} from 'react'
import './index.scss'
import Banner from './banner'
import sport from '../../../modules/sport'
import RightContent from './rightcontent'
import LeftContent from './leftcontent'
import Nav from '../../common/nav'

class Home extends Component{
	
	
	render(){
		return (
			<div className="home-box jutop">
				<Nav/>
				<Banner/>
				<div className="home-content clear">
					<RightContent/>
					<LeftContent/>
				</div>
			</div>
		)
	}
	
}

export default Home