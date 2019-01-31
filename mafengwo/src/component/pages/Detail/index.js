import React ,{ Component} from 'react'
import './index.scss'
//import url from 'url'
import url from 'url'
import $ from 'jquery'

class Detail extends Component{
	
	constructor(props){
		super(props)
		this.state={
			msg: []
		}
	}
	
	getId(){
		//拿到string类型
		let id=this.props.match.params.id
		$.ajax({
			url: '/json/diary.json',
			success: (res)=>{
				this.setState({
					msg: res.data.filter(item=>{
							return item.id== id
						})
				})
				
			}
		})
	}
	
	componentWillMount(){
		this.getId();
	}
	
	render(){
		let {msg}=this.state;
		console.log(msg)
		if(msg.length<=0) return '';
		
		return (
			<div className="detail-box jutop">
				<dl>
					<dt>{msg[0].title}</dt>
					<dd><img width="300" src={msg[0].src}/></dd>
				</dl>
				<div className="detail-desc">
					{msg[0].desc}
				</div>
			</div>
		)
	}
	
}

export default Detail