
import React, {Component} from 'react'
import './index.scss'
import $ from 'jquery'
import axios from 'axios'

const Type=(props)=>{
	let {hidetypebox,showtypebox, type}=props;
	let typelist;
	if(type.list){
		typelist=type.list.map(item=>{
							return (
								<li key={item.id} className={item.class}>
									<em className="num">{item.id}</em>
									<strong><a>{item.title}</a></strong>
									<a className="gl-desc">{item.desc}</a>
								</li>
							)
						})
	}else if(type.listlast){
		typelist=type.listlast.map(item=>{
					  		return (
					  			<li key={item.id} className="spec clear">
					  				<div className="spec-title">{item.title}</div>
									<div className="spec-city">
									{
										item.city.map((item,i)=>{
											return (<a key={i}>{item}</a>)
										})
									}
									</div>
								</li>
					  		)
					  	})
	}
	return (
		<div className="type" onMouseEnter={showtypebox} onMouseLeave={hidetypebox}>
			<div className="typelist">
				<div>{type.type}</div>
				<i className="gl-icon"></i>
			</div>
				<div className="typebox" >
					<ul>
					{typelist}
					</ul>
				</div>
		</div>
	)
}

class LeftAside extends Component{
	
	constructor(props){
		super(props)
		this.state={
			nogl: false,
			hasgl: false,
			msg: []
		}
		this.getData=this.getData.bind(this)
	}
	
	
	showtypebox(e){
		var typebox=$(e.currentTarget).find('.typebox');
		typebox.css("display","block");
	}
	
	hidetypebox(e){
		var typebox=$(e.currentTarget).find('.typebox');
		typebox.css("display","none");

	}
	
	getData(e){
		let {hasgl, nogl, msg}=this.state;
		var txt=e.target.value;
		var ret=0;
		if(!txt){
			var _hasgl=$('.search-hide');
			var _nogl=$('.no-gl');
			_hasgl.hide();
			_nogl.hide();
			
			return ;
		}
		axios.get('/mfw/gonglve/ajax_book_search.php',{
			params:{
				act: 'search',
				keyword: txt
			}
		}).then(res=>{
			ret=res.data.ret;
			
			if(ret===0){
				this.setState({nogl: true})
				!this.state.hasgl || this.setState({hasgl: false});
				return;
			}else if(ret===1){
				this.setState({hasgl: true})
				!this.state.nogl || this.setState({nogl: false});
			}
			this.setState({msg: res.data.msg})
//			var reg=/^[\u4e00-\u9fa5]+$/;
				$('.search-ul').empty();
				this.state.msg.forEach(item=>{
					var position=item.value.search(txt);
					if(position!==-1){
						var a1= item.value.substring(0, position);
						var a2=item.value.substring(position+txt.length);
						$(`<li><a>${a1}<i class="highlight">${txt}</i></a>${a2}</li>`).appendTo('.search-ul');
					}else{
						$(`<li><a>${item.value}</a></li>`).appendTo('.search-ul');
					}
				})
			
			
		})
		
		if(hasgl){
			$(document).click(function(e){
				console.log(999)
				var _hasgl=$('.search-hide');
				_hasgl.hide();
			})
			return;
		}
		if(nogl){
			$(document).click(function(e){
				console.log(99889)
				var _nogl=$('.no-gl');
				_nogl.hide();
			})
		}
		
		/*$.ajax({
			url:'http://www.mafengwo.cn/gonglve/ajax_book_search.php',
			data: {'act': 'search','keyword': '欧洲'},
			type: 'get',
			dataType:"jsonp",
			success: function(res){
				console.log(res)
			}
		})*/
	}
	
	
	
	showerwei(){
		$('.erweima').show();
	}
	hideerwei(){
		$('.erweima').hide();
	}
	
	render(){
		let {types}=this.props;
		let { hasgl, nogl, msg}=this.state;
		return (
			<div className="left-aside"> 
				<div className="left-box">
				{
					types.map((item,i)=>{
						return <Type key={i} type={item} showtypebox={this.showtypebox} hidetypebox={this.hidetypebox}/>
					})
				}
				</div>
				<div className="gl-search">
					<div className="search">
						<i className="search-icon"></i>
						<input type="text" onInput={this.getData} placeholder="请输入想去的地方，如：香港"/>
					</div>
					<div className="search-hide" style={{display: hasgl?"block": "none"}}>
						<ul className="search-ul">
						
						</ul>
					</div>
					<div className="no-gl" style={{display: nogl?"block": "none"}}>
						<strong>此攻略还没有上线,敬请期待</strong>
					</div>
					<div className="download clear">
						<a className="load-icon"><img src="/images/logo_gonglve_v6.png"/></a>
						<div className="load-title">
							<div className="load-name" onMouseEnter={this.showerwei} onMouseLeave={this.hideerwei}>
								<a>马蜂窝自由行App下载</a>
								<div className="erweima"><img src="/images/wKgED1vb_fqAeZq0AAAxwHmnAuc675.png"/></div>
							</div>
							<div className="load-type clear">
								<span>iPhone版</span><i>|</i>
								<span>Android版</span><i>|</i>
								<span>iPad版</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

LeftAside.defaultProps={
	types: [
	{ "id": 0, "type":"海外冬季目的地精选", "list": [
		{"id": 1, "title":"海岛", "desc": "在皑皑白雪中泡温泉", class: "top3"},
		{"id": 2, "title":"澳大利亚", "desc": "在南半球过一个暖洋洋的圣诞", class: "top3"},
		{"id": 3, "title":"洛杉矶", "desc": "阳光加州避寒圣地", class: "top3"},
		{"id": 4, "title":"冰岛", "desc": "亲近极北之地的莫测极光", class: ""},
		{"id": 5, "title":"海岛", "desc": "在皑皑白雪中泡温泉", class: ""},
		{"id": 6, "title":"海岛", "desc": "在皑皑白雪中泡温泉", class: ""},
		{"id": 7, "title":"澳大利亚", "desc": "在南半球过一个暖洋洋的圣诞", class: ""},
		{"id": 8, "title":"洛杉矶", "desc": "阳光加州避寒圣地", class: ""},
		{"id": 9, "title":"冰岛", "desc": "亲近极北之地的莫测极光", class: ""},
		{"id": 10, "title":"海岛", "desc": "在皑皑白雪中泡温泉", class: ""},
		]},
	{ "id": 1, "type":"国内冬季目的地推荐", "list": [{"id": 1, "title":"冰岛", "desc": "亲近极北之地的莫测极光", class: "top3"}]},
	{ "id": 2, "type":"奔向海岛", "list": [{"id": 1, "title":"澳大利亚", "desc": "在南半球过一个暖洋洋的圣诞", class: "top3"}]},
	{ "id": 3, "type":"主题推荐", "listlast": [
		{"id": 1, "title":"骑行", "city": ["圣地","洛杉矶","艾尔兰","圣彼得堡","哈珀","澳大利亚"]},
		{"id": 2, "title":"潜水", "city": ["圣地","巴西","艾尔兰","圣彼得堡","哈珀","艾尔兰","圣彼得堡","哈珀","圣地"]},
		{"id": 3, "title":"徒步", "city": ["圣地","巴西","艾尔兰","海岛","哈珀"]},
		{"id": 4, "title":"登山", "city": ["圣地","巴西","艾尔兰","冰岛","哈珀","巴西","艾尔兰","圣彼得堡","哈珀"]}
		]}
	]
	
}
export default LeftAside
