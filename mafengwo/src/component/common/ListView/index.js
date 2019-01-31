import React ,{ Component} from 'react'
import './index.scss'
import ListItem from '../ListItem'

class ListView extends Component{
	
	getPlace(){
		let {salesPlace}= this.props;
		let arr=['type', 'count'];
		this.new_place=salesPlace.map(item=>{
			for(var key in item){
				arr.forEach(k=>{
					if(key===k){
						delete item[k];
					}
				})
			}
			return item;
		})
	}
	
	componentWillMount(){
		this.getPlace();
	}
	
	render(){
		let {clickChange, list}= this.props;
		return (
			<div className="list-view" data-msg={`st-${list.id}`}>
				<div className='hd clear'>
					<h2 className="list-title">{list.title}</h2>
					{ !list.desc || <span className="buy">大家都在买</span>}
					<a className="other" data-msg={`st-${list.id}`} onClick={clickChange}><i></i>换一换</a>
				</div>
				<div className="list-content clear">
					{
						this.new_place.map(item=>{
							return <ListItem key={item.id} item={item}/>
						})
					}
				</div>
			</div>
		)
	}
	
}

export default ListView