import React ,{ Component} from 'react'
import './index.scss'
import SalesSearch from '../../common/SalesSearch'
import SalesAside from '../../common/SalesAside'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/hotmdd/actionCreator'
import SalesSwiper from '../../common/SalesSwiper'
import SalesDesc from './SalesDesc.js'
import ListView from '../../common/ListView'
import FreeList from './FreeList'
import $ from 'jquery'

class Sales extends Component{
	
	constructor(props){
		super(props)
		this.clickChange=this.clickChange.bind(this)
	}
	
	salesPlace(list){
		let {salesPlace }= this.props.hotmdd;
		if(salesPlace.length<=0) return '';
		var new_place;
		if(list.title==='本周热销'){
			new_place= salesPlace.sort(function(a,b){
				return b.count-a.count;   //降序排列
			})
			new_place=new_place.slice(0, 8);
		}
		if(list.title==='扫货圣地'){
			new_place= salesPlace.slice(0, 8);
		}
		if(list.title==='游轮度假'){
			new_place=salesPlace.slice(8, 16);
		}
		return (
			<ListView list={list} salesPlace={new_place} clickChange={this.clickChange}/>
		)
	}
	
	freePlace(theme){
		let {salesPlace }= this.props.hotmdd;
		if(salesPlace.length<=0) return '';
		return (
			<FreeList freePlace={salesPlace} theme={theme}/>
		)
	}
	
	getcity(){
		let {allcity}=this.props.hotmdd;
		if(allcity.length<=0)return '';
		var city=allcity.slice(5, 12);
		return (
			<SalesAside allcity={city} />
		)
	}
	
	
	
	clickChange(e){
		
		var target= $(e.currentTarget).attr('data-msg');
		//属性选择器必须有[]
		var d=".list-view[data-msg="+"'"+target+"'"+"]";
		$(d).find('.list-item:gt(3)').toggle();
		$(d).find('.list-item:lt(4)').toggle();
	}
	
	componentWillMount(){
		let {salesPlace}= this.props.hotmdd;
		if(salesPlace.length<=0){
			this.props.getSalesPlace();
		}
	}
	
	render(){
		let {images, salesdesc, list, theme}=this.props;
		return (
			<div className="sales-box">
				<SalesSearch title="自由行" classname="icon-free"/>
				<div className="clear">
					{this.getcity()}
					<SalesSwiper images={images}/>
					<SalesDesc salesdesc={salesdesc}/>
				</div>
				<div className="sales-list1">
					{
						list.map(item=>this.salesPlace(item))
						}
				</div>
				<div className="sales-list2">
					{theme.map(item=>this.freePlace(item))}
				</div>
			</div>
		)
	}
	
}

Sales.defaultProps={
	images: [
		{ id: 0, img: '/picture/wKgBEFrQeyKAexG2AAUM4G6g7hQ95.jpeg', desc: '特卖汇'},
		{ id: 1, img: '/picture/wKgED1vzZjqAGn6PAAStfTV6KGc127.png', desc: '金卡会员'},
		{ id: 2, img: '/picture/wKgBEFrQeyKAexG2AAUM4G6g7hQ95.jpeg', desc: '特卖汇'},
	],
	salesdesc: [
		{ id: 1 ,title: '透明底价', desc: '超值低价、每日更新'},
		{ id: 2, title: '海量路线', desc: '全球线路、自由选择'},
		{ id: 3 , title: '客服保障', desc: '专业客服、实时在线'}
	],
	list:[
		{ id: 0, title: '本周热销', desc: '大家都在买'},
		{ id: 1, title: '扫货圣地'},
		{ id: 2, title: '游轮度假'}
	],
	theme: [
		{ id: 0, title: '主题推荐', type: ['海岛特惠', '觅阅读架', '亲子通行'],color: '#45bd9e', src:'/picture/wKgBs1byZ6CAZWQzAAM1AisO_po37.jpeg'},
		{ id: 1, title: '机场自由行', type: ['免签触发', '东南亚', '港澳台'],color: '#ffb80e', src: '/picture/wKgBs1b0rY-AVAXlAAJIPzQw_oE31.jpeg'},
		{ id: 2, title: '出行必备', type: ['热卖WiFi', '接送机', '高铁票'],color: '#786ee6', src: '/picture/wKgBs1b0rY-AVAXlAAJIPzQw_oE31.jpeg'}
	]
}

export default connect(state=>state,dispatch=>{
	return bindActionCreators(actionCreator, dispatch)
})(Sales)
