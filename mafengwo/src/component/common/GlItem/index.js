import React ,{ Component} from 'react'
import './index.scss'

class GlItem extends Component{
	
	render(){
		let {item}=this.props;
		return (
			<div className="gl-item">
				<div className="gl-title">来自{item.type}</div>
				<h2>{item.title}</h2>
				<div className="gl-content clear">
					<dl>
						<dt>
							<img src={item.src}/>
						</dt>
						<dd>
							<div className="gl-desc">{item.desc}</div>
							<div className="gl-count">评论{item.count}</div>
						</dd>
					</dl>
				</div>
				
			</div>
		)
	}
	
}

export default GlItem