import React ,{ Component} from 'react'
import './index.scss'
import $ from 'jquery'


class SalesAside extends Component{
	
	constructor(props){
		super(props)
		this.show=this.show.bind(this)
		this.hide=this.hide.bind(this)
	}
	
	show(e){
		
		var target=$(e.currentTarget);
		if(target.attr('class')==='aside-hide'){
			target.show();
			this.asidelist.addClass('hover');
		}
		if(target.attr('class')==='s-aside-list'){
			target.addClass('hover');
			this.asidelist=target;
			this.index= target.index();
			$('.aside-hide').eq(this.index).show().siblings('.aside-hide').hide();
		}
		
		
	}
	
	hide(e){
		
		this.asidelist.removeClass('hover');
		$('.aside-hide').eq(this.index).hide();
	}
	
	renderChina(area){
		let {allcity}= this.props;
		if(area.p.replace('省','')=== '山西'){
			
			return (
			<div className="aside-hide" data-area={area.p}  onMouseEnter={this.show} onMouseLeave={this.hide}>
				<div className="a-h-china clear">
					<div className="a-h-left clear">
						{
							allcity.slice(0,3).map((item, i)=>{
								return (
									<dl className="clear">
										<dt>{item.p.replace('省','')}</dt>
										<dd>
										{
											item.c.map((item,i)=>{
											return (
												<span key={i}><a>{item}</a><i></i></span>
												)
											})
										
										}
										</dd>
									</dl>
								
								)
							})
						}
						</div>
						<div className="a-h-right clear">
						{
							allcity.slice(3,6).map((item, i)=>{
							return (
								<dl className="clear">
									<dt>{item.p}</dt>
									<dd>
									{
										item.c.map((item,i)=>{
										return (
											<span key={i}><a>{item}</a><i></i></span>
											)
										})
									
									}
									</dd>
								</dl>
							
							)
						})
						}
						</div>
					</div>
				</div>
		)
		}else{
			
		
		return (
			<div className="aside-hide" data-area={area.p}  onMouseEnter={this.show} onMouseLeave={this.hide}>
				<div className="a-h-country">
					<div className="a-h-left clear">
						<dl>
							<dt>{area.p}</dt>
							<dd>
							{
								area.c.map((item, i)=>{
									return <span key={i}><a>{item}</a><i></i></span>
								})
							}
								
							</dd>
						</dl>
					</div>
					<div className="a-h-right clear">
						<h2>精彩专题</h2>
						<div className="type">
							<h3>蜜月旅行</h3>
							<p>蜜月旅行就去毛里求斯,收货百分百得甜蜜</p>
						</div>
					</div>
				</div>
			</div>
		)
		
		}
	}
	
	
	
	
	render(){
		let {allcity}= this.props;
		
		return (
			<div className="sales-aside" >
				<div>
			{
				allcity.map((item, i)=>{
					return (
						<div key={i} className="s-aside-list" data-area={item.p.replace('省','')}   onMouseEnter={this.show} onMouseLeave={this.hide}>
							<span className={`icon-${i}`}></span>
							<h3>{item.p.replace('省','')}</h3>
							<p>
							{
								item.c.slice(0,3).map((item, i)=>{
									return (<a key={i}>{item.replace('市','')}</a>)
								})
							}
							</p>
							<i className="arrow-left"></i>
						</div>
					)
				})
			}
				</div>
				<div>
				{
					allcity.map((item, i)=>{
						return this.renderChina(item);
					})
					
					}
				</div>
			</div>
		)
	}
	
}

export default SalesAside