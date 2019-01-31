import React ,{ Component} from 'react'
import sport from '../../../modules/sport'
import Table from './table'


class Banner extends Component{
	
	constructor(props){
		super(props)
		this.state={
			clientwidth: document.body.clientWidth
		}
		this.handleresize= this.handleresize.bind(this)
	}
	
	imgtoggle(){
		//因为不能获取绝对定位的高度，所以用比例如得到图片的高度并设置给父元素，让父元素站位，在给改变窗口大小的时候，resize事件
		//才会执行，所以要在一开始初始化时，给height赋值
		this.imgul= document.getElementsByClassName('home-ul')[0];
		this.imgul.style.height= 640/1920* this.state.clientwidth +'px';
		
		this.imglist= this.imgul.children;
		this.smalllist= document.getElementsByClassName('home-ol')[0].children;
		this.index= 0;
		this.smalllist[0].className='active'
		this.timer=setInterval( this.fadeinout.bind(this), 3000)
	}
	
	fadeinout(){
		this.index++
			if(this.index > this.imglist.length-1){
				this.index=0;
			}
			//因为一开始第一张图片就是显示出来的，所以只需要让他变透明去，让第二章图片显示上来就可以
			for(var i=0; i<this.imglist.length; i++){
				sport(this.imglist[i], {opacity: 0}, 8)
				this.smalllist[i].className='';
			}
			
			sport(this.imglist[this.index], {opacity: 100}, 8)
			this.smalllist[this.index].className='active'
	}
	
	handleresize(){
		this.setState({clientwidth: document.body.clientWidth})
		var imgul= document.getElementsByClassName('home-ul')[0];
		
		imgul.style.height= 640/1920* this.state.clientwidth +'px';
	}
	
	
	componentDidMount(){
		this.imgtoggle();
		window.addEventListener('resize', this.handleresize)
	}
	
	render(){
		let {imgs, smallimgs}= this.props;
		
		return (
			<div className="home-banner">
				<div className="home-slider">
					<ul className='home-ul'>
					{
						imgs.map(item=>{
							return (
							  <li key={item.id} style={{zIndex: item.zIndex}}>
							  	<a href="" target="_blank" className="home-desc">
							  		<p><span>{item.id + 6}</span>/Nov.2018</p>
							  		<h3>{item.desc}</h3>
							  	</a>
							  	
								<a href="" target="_blank" className="home-pic ib">
									<img src={item.src}/>
								</a>
							  </li>
							)
						})
					}
						
					</ul>
					<ol className="home-ol">
					{
						smallimgs.map(item=>{
						  return (
						  	<li key={item.id}>
								<img src={item.src}/>
								<span></span>
							</li>
						  )
						})
					}
					</ol>
					<a className="home-mu" href="" target='_blank'></a>
					<Table/>
				</div>
				
			</div>
		)
	}
	componentWillUnmount(){
		window.removeEventListener('resize',this.handleresize);
		clearInterval(this.timer)
	}
}

Banner.defaultProps={
	imgs: [
		{ id: 1, src: '/picture/wkged1vk2zgazttfaaekt4_osy800.jpeg',zIndex: 4, desc:'快点让我在加西的雪地里撒点野'},
		{ id: 2, src: '/picture/wkged1vixugafe_yaaqvty2vdiq38.jpeg',zIndex: 3, desc:'曼谷-苏梅岛  很高兴遇见你,浪漫有你，温暖随行'},
		{ id: 3, src: '/picture/wkged1vgnnqaylbnaagr8m_jjbw63.jpeg',zIndex: 2, desc:'清迈--来了就不想走了 一起感受清迈温柔的风'},
		{ id: 4, src: '/picture/wkged1vgnkial3uqaaktryfr7ve49.jpeg',zIndex: 1, desc:'[我们俩] 致坎坷成形的霓虹国关西6日游'},
		{ id: 5, src: '/picture/wkged1vcorcak46-aavnwq1yv-k96.jpeg',zIndex: 0, desc:'河西走廊 | 沙漠、森林与河流的瑰丽生死'}
	],
	smallimgs: [
		{id: 1, src: '/picture/wkged1vkcnaasy5taapm3dxccrw32.jpeg'},
		{id: 2, src: '/picture/wkged1vixtqatcq-aaslphwpfla49.jpeg'},
		{id: 3, src: '/picture/wkged1vgnnkadgpnaaqad4mxj9k70.jpeg'},
		{id: 4, src: '/picture/wkged1vgnkcafrdwaathm99r1c086.jpeg'},
		{id: 5, src: '/picture/wkged1vcoqiaaqyhaakh67sufsa18.jpeg'}
	]
}

export default Banner