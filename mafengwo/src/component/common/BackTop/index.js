import React ,{ Component} from 'react'
import './index.scss'
import $ from 'jquery'

class BackTop extends Component{
	
	constructor(props){
		super(props)
		this.backtop=this.backtop.bind(this)
		this.show=this.show.bind(this)
		this.distance= this.props.distance || 500;
	}
	
	show(){
		this.st= document.documentElement.scrollTop || document.body.scrollTop;
		if(this.st>= 800){
			if(this.el.style.display==='none'){
				this.el.style.display="block"
			}
		}else{
			if(this.el.style.display==='block'){
				this.el.style.display="none";
			}
		}
	}
	
	backtop(){
//		document.documentElement.scrollTop=0;
		$("body,html").animate({scrollTop:0}, 1000);
	}
	
	componentDidMount(){
		if(this.props.icon){
			$('.backtop-box').find('span').addClass(this.props.icon);
			console.log($(this.ref).find('span'))
		}
		window.addEventListener('scroll', this.show)
	}
	
	componentWillUnmount(){
		window.removeEventListener('scroll', this.show)
	}
	
	
	render(){
		return (
			<div ref={el=>this.el=el} style={{'display': 'none'}} onClick={this.backtop} className="backtop-box">
				<span className="backtop-icon">
				</span>
			</div>
		)
	}
	
}

export default BackTop