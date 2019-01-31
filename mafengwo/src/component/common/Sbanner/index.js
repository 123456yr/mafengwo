import React ,{ Component} from 'react'
import './index.scss'
import linear from '../../../modules/linear'

class Sbanner extends Component{
	
	constructor(props){
		super(props)
		this.navclick=this.navclick.bind(this)
		
	}
	
	banner(){
		clearInterval(this.timer)
		this.index=0;
		this.wrapper= document.getElementsByClassName('sb-wrapper')[0];
		this.olList=document.getElementsByClassName('navigition')[0].children;
		this.olList[0].className='nav-act';
		//可以用bind但不能用call和apply，后者会传参之后改变了this的指向之后立即执行，而bind不会，bind会创建一个新的函数，在使用的时候传值
		this.timer=setInterval(this.autoplay.bind(this), 5000);
	}
	
	autoplay(target){
		//如果传target，当target为0时，target为假，会执行this.index ,所以会根据上次变化的值，变化，而不是点击的值
		//可以改为this.index= target || target===0 ? target : this.index;
//		this.index= target || target===0 ? target : this.index;
		this.index+=1;
		if(this.index >= this.wrapper.children.length){
			this.index= 0;
		}
		for(var i=0; i< this.olList.length; i++ ){
			this.olList[i].className='';
		}
		this.olList[this.index].className='nav-act';
		linear(this.wrapper, {marginLeft: this.index*(-260)}, 1)
	}
	
	navclick(e){
		//每次点击进来要清除timer，让他不再计时，等点击切换后在计时
		clearInterval(this.timer);
		/*var target= e.target.getAttribute('data-index');
		target--;
		this.autoplay(target)*/
		this.index= e.target.getAttribute('data-index');
		this.index--;
		this.autoplay();
		this.timer=setInterval(this.autoplay.bind(this), 5000);
	}
	
	componentDidMount(){
		this.banner();
	}
	
	
	render(){
		let { imgbanner,id }=this.props;
		return (
			<div className="sb-container" id={id}>
				<ul className="sb-wrapper clear">
				{
					imgbanner.map(item=>{
						return (
							<li key={item.id} className="sb-slider">
							  <div className="sb-img">
							    <img src={item.src}/>
							  </div>
							  <h3 className="sb-title"><a href="">{item.title}</a></h3>
							  <p className="sb-desc">{item.desc}</p>
							</li>
						)
					})
				}
				</ul>
				<ol className="navigition clear">
				{
					imgbanner.map(item=>{
						return (
							<li key={item.id} data-index={item.id} onClick={this.navclick}></li>
						)
					})
				}
				</ol>
			</div>
		)
	}
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	
}

export default Sbanner