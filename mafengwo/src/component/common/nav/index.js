
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.scss'
import $ from 'jquery'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/mine/actionCreator'

class Nav extends Component{
	
	constructor(props){
		super(props)
		this.state={
			isShow: true,
			list: []
		}
		this.handleclick=this.handleclick.bind(this)
		this.show=this.show.bind(this);
		this.hide=this.hide.bind(this)
		this.isShowApp=this.isShowApp.bind(this)
		this.docClick=this.docClick.bind(this)
		this.changeinput=this.changeinput.bind(this)
		this.inWord=this.inWord.bind(this)
	}
	
	isShowApp(){
		let { pathname }= this.props.location;
		let {isShow}=this.state;
		if(pathname=== '/'){
			/*this.setState(prestate=>({
				isShow: prestate.isShow
			}))*/
			if(isShow)return;
			this.setState({ isShow: true})
		}else{
			
			this.setState({ isShow: false});
		}
	}
	
	show(e){
		var target =e.currentTarget;
		$(target).find('.h-hide').show().animate({'opacity':0.95}, 400);
	}
	
	hide(e){
		var target=e.currentTarget;
		var h=$(target).find('.h-hide')
		h.animate({'opacity': 0}, 400,function(){
			h.hide();
		})
	}
	
	handleclick(e){
		var target= e.currentTarget;
		$(target).addClass('on').siblings().removeClass('on');
	}
	
	changeinput(e){
		e.nativeEvent.stopImmediatePropagation();
		$(e.currentTarget).addClass('input-on');
		$(document).bind('click',this.docClick);

	}
	
	docClick(){
		var current=$('.nav-search');
		if(current.attr('class').indexOf('input-on') ===-1) return;
		$('.nav-search').removeClass('input-on');
		if(this.el.style.display==='block')this.el.style.display='none'
	}
	
	inWord(e){
		var txt=e.target.value;
		let {list}=this.state;
		if(!txt) {
			this.el.style.display="none";
			return ;
		}else{
			this.el.style.display="block";
			$.ajax({
				url: 'http://www.mafengwo.cn/search/ss.php',
				data: {
					callbalk: 'jQuery18107909370811626282_1543064016334',
					isHeader: 1,
					key: txt,
					_: 1543064029320
				},
				dataType: 'jsonp',
				success: (res)=>{
					
					var data=[];
					var arr=[]
					for(var info in res){
						var reg=/(_info)$/;
						if(reg.test(info)){
							if(!res[info].result) break;
							data=res[info].result.map(item=>{
								if(item.title || item.name){
									return item.title|| item.name ;
								}
								return '';
							})
							
	//						
							if(data[0]!==""){
								//将整个数组拿进去添加到arr数组中，不脱壳
	//							arr=[...arr,data]
	//							将数组中的值拿出来，放到arr数组中，脱壳
								arr=arr.concat(data)
							}
						}
					}
					
					/*arr.forEach(item=>{
						var oli= document.createElement('li');
						oli.innerHTML=item;
						oul.appendChild(oli);
					})*/
//					<div dangerouslySetInnerHTML={{ __html: str}} />
					this.setState({
						list: arr.slice(0, 13).map(item=>{
								return <li dangerouslySetInnerHTML={{ __html: item}}></li>
							})
					})
					
				}
			})
		}
	}
	
	componentWillMount(){
		this.isShowApp();
	}
	
	componentDidMount(){
		var target= this.props.location.pathname.slice(1);
		if(!target) {
			$("li[class^='n-home']").addClass('on');
		    return;	
		}
		$(`li[class^='n-${target}']`).addClass('on');
		
	}
	
	componentWillUnmount(){
		$(document).unbind('click', this.docClick)
	}
	
	isLogin(){
//		let isLogin=true;
		if(!localStorage.username){
			return (
				<div className="nav-unlogin">
					<Link to='/login'>登录</Link>
					<i className="split"></i>
					<a>注册</a>
				</div>
			)
		}else{
			console.log(this.props)
			return (
				<div className="nav-login">
					<span className="nav-pos">
						<a className="ib" href="">{this.props.mine.city}</a>
					</span>
			    	<span className="nav-daka"> 
			    		<a className="ib" href="">打卡</a>
			    	</span>
			    	<span className="nav-news"> 
			    		<a className="ib" href=""> 
			    			<i className="icon-news ib"></i>
			    			消息
			    			<i className="icon-sanjiao ib"></i>
			    		</a>
			    	</span>
			    	<div className="nav-mine fr">
			    		<a className="" href="">
			    			<div className="icon-mine ib">
			    				<img src="/images/wKgED1uqIreAU9QZAAAXHQMBZ74008.png"/>
			    			</div>
			    			<i className="icon-sanjiao"></i>
			    		</a>
			    	</div>
			    </div>
			)
		}
	}
	
	render(){
		let {navs}= this.props;
		let {isShow}=this.state;
		return (
		  <div className="nav-container">
			<div className="nav-box clear">
				<div className="nav-logo fl"></div> 
				<ul className="nav-navs fl">
					{
						navs.map(item=>{
							return (<li key={item.id} className={`${item.name} fl`} onClick={this.handleclick}  data-type={item.type} onMouseEnter={this.show} onMouseLeave={this.hide}>
										<Link to={{pathname: item.path}} exact={item.exact}>{item.title}
											{ !item.icon || <i className={item.icon}></i>}
										</Link>
										{
											!(item.more && !item.talk) || (
												<ul className="h-hide" style={{display: 'none'}}>
												{
													item.more.map((item, i)=>{
														return <li>{item}</li>
													})
												}
												</ul>
											)
										}
										{
											!(item.more && item.talk) || (
												<div className="h-hide" style={{display: 'none'}}>
													<ul className="h-left">
														{
															item.more.map((item,i)=>{
																return <li key={i}>{item}</li>
															})
														}
													</ul>
													<ul className="h-right">
														{
															item.talk.map((item, i)=>{
																return <li key={i}>{item}</li>
															})
														}
													</ul>
												</div>
											)
										}
									</li>)
											
						})
					}
					{ isShow? (<li className="n-app fl"><Link to="/app"> App</Link></li>) :(
						<div className="nav-s-content">
							<div className="nav-search" onClick={this.changeinput}>
								<input type="text" onInput={this.inWord} autoComplete="off"/>
								<span className="icon-search"></span>
								<ul ref={el=>this.el=el} className='search-hide'>
									{this.state.list}
								</ul>
							</div>
						</div>
					)
					}
			    	
			    </ul>
			    <div className="nav-right fr">
			    	{this.isLogin()}
				</div>
			</div>
		  </div>
		)
	}
}


Nav.defaultProps={
	navs: [
		{ id: 1, title: '首页', path: '/', exact: 'true', type: 'no', name: 'n-home'},
		{ id: 2, title: '目的地', path: '/mdd', type: 'no', name: 'n-mdd'},
		{ id: 3, title: '旅游攻略', path: '/gonglve', type: 'no', name: 'n-gonglve'},
		{ id: 4, title: '旅游商城', path: '/sales', icon: 'icon-sanjiao ib',type: 'yes', name: 'n-sales more', more: ['自由行', '当地游', '跟团游', '国内机票']},
		{ id: 5, title: '酒店', path: '/hotel', type: 'no', name: 'n-hotel'},
		{ id: 6, title: '社区', path: '/community', icon: 'icon-sanjiao ib', type: 'yes', name: 'n-community more', more: ['问答', '马蜂窝周边', '丰收俱乐部', '结伴'],talk:['小组论坛', '分多同城', '马蜂窝拍卖','拍照pk','真人兽', '道具商店']}
	]
	
}

export default withRouter(connect(state=>state, dispatch=>{
	return bindActionCreators(actionCreator, dispatch)
})(Nav))
