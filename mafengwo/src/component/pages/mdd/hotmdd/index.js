
import React, {Component} from 'react'
import './index.scss'
import MddTitle from '../mddtitle'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import actionCreator from '../../../../store/hotmdd/actionCreator'
import $ from 'jquery'

const City=({city})=>{
	let place='';
	let placeitem=[];
	
	for(var c in city){
		place=c;
		placeitem=city[c];
	}
	
	return (
		<dl >
			<dt><a>{place}</a></dt>
			<dd>
			{
				placeitem.map(item=>{
					return <a>{item}</a>
				})
			}
			</dd>
		</dl>
	)
}

const Place=({places})=>{
	let city=[];
	for(var country in places){
		city=places[country];
	}
	let index=Math.ceil(city.length/2);
	let city1=city.slice(0, index);
	let city2=city.slice(index);
	
	
	return (
		<div className="hot-city">
			<div className="col">
			{
				city1.map(item=>{
					return <City city={item}/>
				})
			}
			</div>
			<div className="col">
			{
				city2.map(item=>{
					return <City city={item}/>
				})
			}
			</div>
		</div>
	)
}

const Theme=({theme})=>{
	let images=[];
	for(var item in theme){
		images=theme[item];
	}
	return (
		<div className="hot-pic clear">
		{
			images.map((item,i)=>{
				return (
					<div key={item.id} className="pic">
						<img src={`/picture/${item.src}`}/>
						<span>{item.desc}</span>
					</div>
				)
			})
		}
			
		</div>

	)
}

class HotMdd extends Component{
	
	constructor(props){
		super(props)
		this.state={
			country: []
		}
		this.enter=this.enter.bind(this)
		this.theme=this.theme.bind(this)
	}
	
	getmdd(){
		this.props.getmdd();
		
	}
	
	enter(e){
		var target=$(e.currentTarget);
		target.addClass("show").siblings().removeClass('show');
		var index=target.attr('data-index')
		$('.hot-city').eq(index).addClass('showbox').siblings().removeClass('showbox')
	}
	
	theme(e){
		var target=$(e.currentTarget);
		target.addClass("show").siblings().removeClass('show');
		var index=target.attr('data-index')
		$('.hot-pic').eq(index).addClass('showbox').siblings().removeClass('showbox')
	}
	
	componentWillMount(){
		if(this.props.hotmdd.length>0) return;
		this.getmdd();
	}
	
	render(){
		let {hotmdd} = this.props;
		let {title, title2, address, theme, picture, country}=hotmdd;
		if(hotmdd.length===0) return '';
		return (
		  <div>
			<div className="hotmdd-box"> 
				<div className="hot-container clear">
					<MddTitle title={title} arr={address} enter={this.enter}/>
					{
						country.map(item=>{
							return <Place places={item}/>
						})
					}
				</div>
			</div>
			<div className="line"></div>
			<div className="theme-box">
				<div className="hot-theme">
					<MddTitle title={title2} arr={theme} enter={this.theme}/>
					{
						picture.map(item=>{
							return <Theme theme={item}/>
						})
					}
				</div>
			</div>
		  </div>
		)
	}
	
	componentDidUpdate(){
		$('.hot-city').eq(0).addClass('showbox');
		$('.country').eq(0).addClass('show');
		$('.hot-pic').eq(0).addClass('showbox');
		$('.theme').eq(0).addClass('show');
	}
}

export default connect(state=>{
	return {
		hotmdd: state.hotmdd.hotmdd
	}
}, dispatch=>{
	return bindActionCreators(actionCreator, dispatch);
})(HotMdd)
