
import React, {Component} from 'react'
import './index.scss'
import ListItem from '../../../common/ListItem'
import $ from 'jquery'


class FreeList extends Component{
	
	constructor(props){
		super(props)
		this.enterli=this.enterli.bind(this)
	}
	
	enterli(e){
		var target= $(e.target).attr('data-msg');
		var id= parseInt(target.substr(3,1))+1;
		$(`li[data-msg=${target}]`).addClass(`on${id}`).siblings().removeClass(`on${id}`);
		$(`.list-content[data-msg=${target}]`).css('display','block').siblings('.list-content').css('display','none')
	}
	
	componentDidMount(){
		$("li[data-msg='fl-0-0']").addClass('on1')
		$("li[data-msg='fl-1-0']").addClass('on2')
		$("li[data-msg='fl-2-0']").addClass('on3')
	}
	
	render(){
		let {theme, freePlace}=this.props;
		var arr=['type', 'count']
		this.new_place=freePlace.map(item=>{
			for(var key in item){
				arr.forEach(k=>{
					if(key===k){
						delete item[k];
					}
				})
			}
			return item;
		})
		return (
			<div className="free-list" data-img={`fl-${theme.id}`}> 
				<div className="hd clear">
					<h2 className="list-title" style={{color: `${theme.color}`}}>{theme.title}</h2>
					<ul className="tab">
						{
							theme.type.map((item, i)=>{
								return <li key={i} data-msg={`fl-${theme.id}-${i}`} onMouseEnter={this.enterli}>{item}</li>
							})
						}
					</ul>
				</div>
				<div className="db clear">
					<div className="list-aside">
						<img src={theme.src}/>
						
					</div>
					{ this.new_place.slice(0, 3).map((item, i)=>{
						return (
							<div className="list-content" data-msg={`fl-${theme.id}-${i}`}>
							{
								this.new_place.slice((i+1)*3, (i+2)*3).map((item, i)=>{
									return <ListItem key={i} item={item}/>
								})
							}
						</div> 
						)
					})
					}
				</div>
			</div>
		)
	}
}

export default FreeList
