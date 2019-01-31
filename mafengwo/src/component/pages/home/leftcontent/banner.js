
import React, {Component} from 'react'
import Swiper from 'swiper'
import '../../../../../node_modules/swiper/dist/css/swiper.min.css'
import actionCreator from '../../../../store/banner/actionCreator'
import { bindActionCreators } from 'redux'
import {connect } from 'react-redux'

class Banner extends Component{
	
	constructor(props){
		super(props)
		
	}
	
	componentWillMount(){
		if(this.props.imgBanner.length> 0 ) return ;
		this.props.getBanner();
	}
	
	componentDidMount(){
		if(this.props.imgBanner.length>0){
			
		var swiper = new Swiper(this.el, {
		  spaceBetween: 30,
		  centeredSlides: true,
		  autoplay: {
		    delay: 5000,
		    disableOnInteraction: false,
		  },
		  pagination: {
		    el: '.swiper-pagination',
		    clickable: true,
		    bulletElement : 'li',
		    bulletActiveClass: 'nav-act',
		  }
		});
	}
	}
	
	render(){
		let { imgBanner }=this.props;
		if(!imgBanner) return ''
		return (
			<div ref={el=> this.el=el} className="swiper-container sb-container">
				<div className="swiper-wrapper">
					{
						imgBanner.map(item=>{
							return (
							  <div key={item.id} className="swiper-slide">
							  <div className="sb-img">
							  	<img src={item.src}/>
							  </div>
							  	<h3 className="sb-title"><a href="">{item.title}</a></h3>
							  	<p className="sb-desc">{item.desc}</p>
							  </div>
							)
						})
					}
				</div>
				<div className="swiper-pagination navigition"></div>
			</div>
		)
	}
	
	componentDidUpdate(){
		//只有当状态第一次改变的时候触发，避免无关变量的改编触发该函数，状态只返回imgBanner
		 var swiper = new Swiper(this.el, {
		  spaceBetween: 30,
		  centeredSlides: true,
		  autoplay: {
		    delay: 5000,
		    disableOnInteraction: false,
		  },
		  pagination: {
		    el: '.swiper-pagination',
		    clickable: true,
		    bulletElement : 'li',
		    bulletActiveClass: 'nav-act',
		  }
		});
	}
}

export default connect(state=> {
	return {
		imgBanner: state.banner.imgBanner
	}
	}, dispatch=>{
	return bindActionCreators(actionCreator, dispatch);
})(Banner)
