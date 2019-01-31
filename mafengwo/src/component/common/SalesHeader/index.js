import React ,{ Component} from 'react'
import './index.scss'
import {NavLink} from 'react-router-dom'

class SalesHeader extends Component{
	
	render(){
		let {navs}=this.props;
		return (
			<div className="sales-header">
				<div className="s-navs">
					<ul className="nav-cen clear">
					{
						navs.map(item=>{
							return (
								<li key={item.id}><NavLink exact={item.exact} to={item.path}>{item.title}</NavLink></li>
							)
						})
					}
					</ul>
				</div>
			</div>
		)
	}
	
}

SalesHeader.defaultProps={
	navs: [
		{"id": 0, title: '自由行', path: '/sales', exact: true},
		{"id": 1, title: '跟团行', path: '/sales/followgo'},
		{"id": 2, title: '当地游', path: '/localgo', exact: true},
		{"id": 3, title: '国内机票', path: '/airticket'},
		{"id": 4, title: '全球WiFi', path: '/localgo/wifi'}
	]
}

export default SalesHeader