import React ,{ Component} from 'react'
import './index.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/hotmdd/actionCreator'
import pySegSort from '../../../modules/pySegSort'
import $ from 'jquery'

class SalesSearch extends Component{
	
	constructor(props){
		super(props)
		this.letter=[];
		this.new_allcity=[];
		this.clickletter=this.clickletter.bind(this)
		this.hideCity=this.hideCity.bind(this)
		this.showCity=this.showCity.bind(this)
		
	}
	
	getAllCity(props){
		let _props=props || this.props;
		let index=0;
		let count=6;
		let all=_props.allcity;
		let allcity=[];
		$.each(all, function(){
			$.each(this.c,function(){
				allcity.push(this.replace('市', ''));
			})
			
		})
		//按拼音分组并按顺序排序
		allcity=pySegSort(allcity);
		let letter='ABCDEFGHIGKLMNOPQRSTUVWXYZ';
		while(index<4){
			this.letter[index]=letter.slice(index*count, (index+1)*count);
			this.new_allcity[index]= allcity.slice(index*count,(index+1)*count);
			index++;
		}
		
	}
	
	//点击城市时获得内容显示在指定位置
	getcity_a(e){
		var val=e.target.innerHTML;
		$('strong').html(val);
	}
	
	
	clickletter(e){
		//因为react的事件都委托给了document，所以实际上是相当于给document绑定的事件，阻止冒泡不可行，使用stopImmediatePropagation()
		//不仅可以阻止冒泡，还可以在当前触发事件的元素上，阻止触发其他事件,react 阻止了这个方法，可以从原生的事件对象中找到
		//e.stopPropagation只能阻止react合成事件的冒泡，e.nativeEvent.stopImmediatePropagation()
		e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		e.nativeEvent.stopImmediatePropagation()
		var target=e.currentTarget;
		var index=$(target).index();
		$(target).addClass('on').siblings().removeClass('on');
		$('.letter-panel').eq(index).show().siblings('.letter-panel').hide();
	}
	
	showCity(e){
		e.nativeEvent.stopImmediatePropagation()
		var cityhide=$('.city-hide');
		cityhide.toggle();
		//不用传e
		document.addEventListener('click',this.hideCity);
	}
	
	hideCity(e){
		var cityhide=$('.city-hide');
		if(cityhide.css('display')==='block'){
			cityhide.hide();
		}
	}
	
	componentWillMount(){
		if(this.props.allcity.length<=0) {
				this.props.getAllCity()
			}
	}
	
	componentDidMount(){
		if(this.props.allcity.length>0){
			this.getAllCity();
		}
	}
	
	componentWillReceiveProps(props, state){
		this.getAllCity(props)
	}
	
	
	componentDidUpdate(){
		$('.letter-tab').find('li').first().addClass('on')
		
	}
	
	componentWillUnmount(){
		document.removeEventListener('click',this.hideCity);
	}
	
	renderCity(){
		let {new_allcity}= this;
		if(new_allcity.length<= 0) return '';
		return (
			<div>
			<div className="letter-tab clear">
				<ul>
				{
					this.letter.map((item, i)=>{
						return (
							<li key={i} onClick={this.clickletter}><a>{item}</a></li>
						)
					})
				}
				</ul>
			</div>
			{
				new_allcity.map((item, i)=>{
					return (
						<div key={i} className="letter-panel">
						{
							item.map((item,i)=>{
								return (
									<div key={i} className="letter-item clear">
										<span>{item.letter.toUpperCase()}</span>
										<div className="city-item">
										{
											item.data.map((item, i)=>{
												return <a onClick={this.getcity_a} key={i}>{item}</a>
											})
										}
										</div>
									</div>
								)
							})
						}
					</div>
						)
					})
				}
			</div>							
		)
	}
	
	render(){
		let {hotcities, classname, title}= this.props;
		
		return (
			<div className="sales-search clear">
				<div className="search-title">
					<i className={classname}></i>
					{title}
				</div>
				<div className="search-panel">
				{ 
					classname==='icon-local' || (<div className="city" onClick={this.showCity}>
													<div className="city_i">
														<i className="city-icon"></i>
														<strong>全国</strong>
														出发
													</div>
													<div className="city-hide" >
														<div className="hotmdd">
															<p>热门出发地</p>
															<div className="hotcity">
															{
																hotcities.map((item, i)=>{
																	return <a onClick={this.getcity_a} key={item}>{item}</a>
																})
															}
															</div>
														</div>
														<p className="fegex"></p>
														<div className="search">
															<input type="text" placeholder="搜索城市  (支持汉字、首字母查询)"/>
															<div className="search-hide">
																<a onClick={this.getcity_a}>想拿</a>
															</div>
														</div>
														{this.renderCity()}
													</div>
												</div>)
					
				}
					<div className="sceneries">
						<div>
							<input className="search-input" type="text" placeholder="请输入目的地/产品名称"/>
							<a className="search-icon" href=""><span></span></a>
						</div>
						<div className="sceneries-hide">
							
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

SalesSearch.defaultProps={
	hotcities: ["全国","北京", "天津", "上海", "杭州", "广州", "深圳","城都", "重庆", "昆明", "武汉", "西安", "香港", "澳门"]
}

export default connect(state=>{
	return {
		allcity: state.hotmdd.allcity
	}
}, dispatch=>{
	return bindActionCreators(actionCreator, dispatch);
})(SalesSearch)