
import React, {Component} from 'react'
import HotSales from './hotsales'
import './index.scss'
import Diary from '../Diary'

class RightContent extends Component{
	render(){
		return (
			<div className="right-container"> 
				<HotSales/>
				<Diary/>
			</div>
		)
	}
}

export default RightContent
