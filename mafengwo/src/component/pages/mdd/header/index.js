import React, { Component} from 'react'
import { Search, Tinput } from '../../../common/search'
import './index.scss'
import $ from 'jquery'
import linear from '../../../../modules/linear'

class Header extends Component{
	
	constructor(props){
		super(props)
		this.handleenter=this.handleenter.bind(this);
		this.handleleave=this.handleleave.bind(this);
		this.showtext=this.showtext.bind(this)
		this.hidetext=this.hidetext.bind(this)
	}
	
	showtext(){
		var wid= $(this.author).outerWidth()+3;
		linear(this.text, {width: wid, left: -wid}, 50)
	}
	
	hidetext(){
		linear(this.text,{width: 0, left: 0}, 50)
	}
	
	handleenter(e){
		$(this.share).css('display', 'block');
	}
	
	handleleave(){
		$(this.share).css('display', 'none')
	}
	
	render(){
		let { holder}= this.props;
		return (
			<div className="hd-box">
			  <div className="hd-img">
			  	<a href="">
			  		<img src="/picture/wkged1vinyialz6naaj7b4uktvg78.jpeg"/>
			  	</a>
			  </div>
			  <div className="hd-text">
			  	<h3><a href="" className="text"> {"跟着<<亲爱的客栈>>一起去阿尔山"}</a></h3>
			  	<p>"我时常在想，如果再次出发，我们会去哪儿———— 刘涛"</p>
			  	<p><a href="" className="text">阅读全文</a></p>
			  </div>
			  <div className="table-container">
			  	 <h3>Don't fear the unknown</h3>
			  	<form action="" method="">
				  	<div className="table-searchbar">
				  		<div className="table-wrapper">
						  	<Tinput name={holder}/>
					  	</div>
					  	<Search/>
				  	</div>
				</form>
				<div className="place">
					<a href="">三亚</a>
					<a href="">香港</a>
					<a href="">南京</a>
					<a href="">新加坡</a>
					<a href="">清迈</a>
				</div>
			  </div>
			  <div className="hd-icon">
			  	<div className="showicon" onMouseEnter={this.showtext} onMouseLeave={this.hidetext} >
			  		<i className="first"></i>
			  		<div className="text-hide" ref={el=>this.text=el}>
			  		  <span ref={el=>this.author=el}><a>甜甜-游侠客  </a>的作品</span>
			  		  <em></em>
			  		</div>
			  	</div>
			    <span className="showicon">
			  		<a href="" className="two"></a>
			  	</span>
			  	<span className="showicon">
			  		<a href="" className="three">15</a>
			  	</span>
			  	<div className="showicon last" onMouseEnter={this.handleenter} onMouseLeave={this.handleleave}>
			  		<a href="" className="four"><i></i>分享</a>
			  		<div className="share" ref={el=>this.share=el} style={{'display': 'none'}}>
			  			<a href="" className="weibo"><i></i></a>
			  			<a href="" className="qq"><i></i></a>
			  			<a href="" className="weixin"><i></i></a>
			  		</div>
			  	</div>
			  </div>
			</div>
		)
	}
}

Header.defaultProps={
	holder: {ph: '我想去...', id: 'mdd-hd'}
}

export default Header