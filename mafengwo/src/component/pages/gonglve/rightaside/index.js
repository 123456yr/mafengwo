import './index.scss'
import React, {Component} from 'react'
import UpList from '../../../common/UpList'
import GlItem from '../../../common/GlItem'
import fnPro from '../../../../modules/ajax.js'
import BackTop from '../../../common/BackTop'
class Index extends Component{
	
	constructor(props){
		super(props)
		this.state={
			data: []
		}
		
	}
	
	getData(){
		fnPro('/json/diary.json').then(res=>{
			//拿到string
			res=JSON.parse(res)
			this.setState({ data: res.data})
		})
		
	}
	
	componentWillMount(){
		this.getData()
	}
	
	render(){
		let {data}=this.state;
		let row=(item)=>{
			return <GlItem item={item} key={item.id}/>
		}
		return (
			<div className="right-box"> 
				<div className="right-title">
					<h2>推荐攻略</h2>
				</div>
				<div className="right-content">
					<UpList
						row={row}
						data={data}
						lazy={true}
						toast={true}
					/>
					<BackTop
						distance={600}
					/>
				</div>
			</div>
		)
	}
}

export default Index
