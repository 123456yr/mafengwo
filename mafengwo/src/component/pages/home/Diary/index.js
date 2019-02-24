
import React, {Component} from 'react'
import './index.scss'
import HomeItem from '../../../common/HomeItem'
import UpList from '../../../common/UpList'
import fnPro from '../../../../modules/ajax.js'
import {withRouter} from 'react-router-dom'
import BackTop from '../../../common/BackTop'
import $ from 'jquery'
import sport from '../../../../modules/sport.js'

class Diary extends Component{
	
	constructor(props){
		super(props)
		this.state={
			data: []
		}
		this.num= 90;
		// this.scrolling=this.scrolling.bind(this)
		this.getDiary=this.getDiary.bind(this)
		this.toDetail=this.toDetail.bind(this)
		this.changeList=this.changeList.bind(this)
		
	}
	
	getDiary(datamsg){
		
		fnPro('/json/diary.json').then((msg)=>{
			//promise中拿到的数据是string
			msg=JSON.parse(msg);
			msg=msg.data.filter(item=>{
					return item.type==="游记"
				})
			if(!datamsg || datamsg=== 'hot'){
				this.setState({
					data: msg.sort((a, b)=>{
						return b.star-a.star;//降序
					})
				})
			}else if(datamsg=== 'new'){
				this.setState({
					data: msg.sort((a, b)=>{
						return b.date-a.date;//降序
					})
				})
			}
		})
	}
	
	// scrolling(){
	// 	this.scroll=document.documentElement.scrollTop || document.body.scrollTop;
	// 	if(this.scroll>=this.el.offsetTop-48){
	// 		this.fixedTop();
	// 	}else{
	// 		this.bufixedTop()
	// 	}
	// }
	
	changeList(e){
		var target=e.currentTarget;
		$(target).addClass('active').siblings().removeClass('active');
		let datamsg=$(target).attr('data-msg');
		this.getDiary(datamsg)
		// this.scrollTop(datamsg);
	}
	
// 	bufixedTop(){
// 		var target=$(this.el).find('.diary-tab');
// 		if($(target).attr('class').indexOf('fixed')!==-1){
// 			$(this.el).find('.diary-tab').removeClass('fixed')
// 			$(this.content).css('marginTop', 0)
// 		}
// 	}
	
// 	fixedTop(){
// 		var target=$(this.el).find('.diary-tab');
// 		if($(target).attr('class').indexOf('fixed')===-1){
// 			$(this.el).find('.diary-tab').addClass('fixed')
// //			$(this.content).css('marginTop', '48px')
// 		}
// 	}
	
	// scrollTop(datamsg){
	// 	$("html,body").animate({scrollTop: this.el.offsetTop-48 }, 800,()=>{
	// 		this.fixedTop();
	// 		
	// 	})
	// }
	
	toDetail(id){
		this.props.history.push(`/detail/${id}`);
	}
	
	componentWillMount(){
		this.getDiary();
	}
	
	componentDidMount(){
		// document.addEventListener('scroll', this.scrolling)
	}
	
	componentWillUnmount(){
		// document.removeEventListener('scroll', this.scrolling)
	}
	
	render(){
		let {data}=this.state;
		let row=(item)=>{
			return <HomeItem toDetail={this.toDetail} key={item.id} msg={item} num={this.num}/>
		}
		return (
			
			<div className="diary-box" ref={el=>this.el=el}> 
				<div className="diary-tab">
					<h2 className="fl active" data-msg="hot" onClick={this.changeList}>热门游记</h2>
					<h2 className="fl" data-msg="new" onClick={this.changeList}>最新发表</h2>
				</div>
				<div className="diary-content" ref={el=>this.content=el}>
					<UpList 
						row={row}
						data={data}
						num={6}
						page={true}
					/>
				</div>
				<BackTop
					distance={900}
					icon={'bt-icon'}
				/>
			</div>
		)
	}
}

export default withRouter(Diary)
