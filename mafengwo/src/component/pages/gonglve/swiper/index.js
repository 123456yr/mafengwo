import React ,{ Component} from 'react'
import './index.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../../store/banner/actionCreator'
import Swiper from 'swiper'

class GlSwiper extends Component{
	
	componentWillMount(){
		if(this.props.glBanner.length===0){
			this.props.getBlBanner();
		}
	}
	
	componentDidMount(){
		if(this.props.glBanner.length>0){
			var swiper = new Swiper('.swiper-container', {
		      spaceBetween: 30,
		      centeredSlides: true,
		      autoplay: {
		        delay: 2500,
		        disableOnInteraction: false,
		      },
		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      },
		      simulateTouch: false
		    });
		}
		
	}
	
	render(){
		let {glBanner}=this.props;
		if(!glBanner.length) return '';
		return (
			<div className="gl-swiper">
				<div className="swiper-container">
				    <div className="swiper-wrapper">
				    {
				    	glBanner.map(item=>{
				    		return (
				    			 <div key={item.id} className="swiper-slide">
							      	<img src={item.src}/>
							      </div>
				    		)
				    	})
				    }
				    </div>
				    <div className="swiper-pagination"></div>
				</div>
			</div>
		)
	}
	
	componentDidUpdate(){
		 var swiper = new Swiper('.swiper-container', {
	      spaceBetween: 30,
	      centeredSlides: true,
	      autoplay: {
	        delay: 2500,
	        disableOnInteraction: false,
	      },
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      },
	      simulateTouch: false
	    });
	}
	
}



export default connect(state=>{
	return {
		glBanner: state.banner.glBanner
	}
	}, dispatch=>{
	return bindActionCreators(actionCreator, dispatch);
})(GlSwiper)