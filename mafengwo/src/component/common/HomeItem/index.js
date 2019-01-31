import React ,{ Component} from 'react'
import './index.scss'

class HomeItem extends Component{
	
	render(){
		let {msg, toDetail, num}=this.props;
		var desc=msg.desc.substr(0, num)+'...';
		return (
			<div className="home-item clear" onClick={toDetail.bind(this, msg.id)}>
				<div className="item-img">
					<img src={msg.src}/>
				</div>
				<div className="item-content">
					<h2>{msg.title}</h2>
					<p>{desc}</p>
					<div className="item-desc clear">
						<span className="count"><i></i>{msg.count}</span>
						<span className="date">date:{msg.date}</span>
						<div className="star">{msg.star}<i></i></div>
					</div>
				</div>
			</div>
		)
	}
	
}

export default HomeItem