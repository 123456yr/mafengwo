import './index.scss'
import React, {Component} from 'react'
import linear from '../../../modules/linear'
import $ from 'jquery'

class SalesSwiper extends Component{
	
	constructor(props){
		super(props)
		this.changeImg=this.changeImg.bind(this)
		this.sport=this.sport.bind(this)
	}
	
	changeImg(e){
		clearInterval(this.timer);
		var target=e.currentTarget;
		if(target.className.indexOf('desc-list')!==-1){
			this.index=$(target).index()-1;
		}else{
			var text=$(e.currentTarget).attr('data-text');
			this.index=eval(this.index+text+1)-1;
		}
		this.sport();
		this.timer=setInterval(this.sport, 5000);
	}
	
	sport(){
		this.index++
		if(this.index=== 3){
			this.swiperul.css('left', 0)
			this.index=1;
		}
		if(this.index<= 0) this.index=0;
		this.s_desc.eq(this.index=== 2? 0: this.index).addClass('active').siblings().removeClass('active');
		linear(this.swiperul[0], {'left': -this.index*730}, 6);
		
	}
	
	hide(){
		$('.s-s-arrow').hide();
	}
	
	show(){
		$('.s-s-arrow').show();
	}
	
	componentDidMount(){
		this.swiperul=$('.s-s-container');
		this.s_desc=$('.desc-list');
		this.index=0;
		this.s_desc.eq(this.index).addClass('active');
		this.timer=setInterval(this.sport.bind(this), 5000);
	}
	
	render(){
		let {images}=this.props;
		
		return (
			<div className="sales-swiper" onMouseEnter={this.show} onMouseLeave={this.hide}> 
						<ul className="s-s-container clear">
						{
							images.map(item=>{
								return (
									<li key={item.id} className="swiper-slider">
										<a><img src={item.img}/></a>
									</li>
								)
							})
						}
							
						</ul>
				<div className="s-s-arrow">
					<span className="s-a-left" onClick={this.changeImg} data-text="-"><i></i></span>
					<span className="s-a-right" onClick={this.changeImg} data-text="+"><i></i></span>
				</div>
				<div className="s-s-desc">
				{
					images.slice(0, images.length-1).map(item=>{
						return <span onClick={this.changeImg} key={item.id} className="desc-list">{item.desc}</span>
					})
				}
				</div>
			</div>
		)
	}
}

export default SalesSwiper
