
import React, {Component} from 'react'
import './index.scss'

class ViewItem extends Component{
	
	render(){
		let {item}=this.props;
		return (
			<div className="list-item"> 
				<a>
					<div className="item-img">
						<img src={`/picture/${item.src}`}/>
						{
							!item.type || <span>{item.type}</span>
						}
					</div>
					<div className="item-desc">
						<h3>{item.desc}</h3>
						<p><strong>{item.price}</strong>起</p>
						{
							item.count?<span className="count">{`已售: ${item.count}|店铺:${item.shop}`}</span>:<span>{`店铺:${item.shop}`}</span>
						}
					</div>
				</a>
			</div>
		)
	}
}

export default ViewItem
