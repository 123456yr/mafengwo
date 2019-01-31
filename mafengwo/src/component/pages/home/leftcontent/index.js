
import React, {Component} from 'react'
import './index.scss'
import Tourist from './tourist'
import Sbanner from '../../../common/Sbanner'
import Banner from './banner'

const LHeader=({head})=>{
	
	function enter(e){
		e.target.style.textDecoration='underline';
	}
	
	function leave(e){
		e.target.style.textDecoration="";
	}
	
	return (
		<div className='left-header clear'>
			<h3 className="large"><a href="">{head.title}</a></h3>
			<a className="little" href="" onMouseEnter={enter} onMouseLeave={leave}>{head.aa}</a>
		</div>
	)
}

class LeftContent extends Component{
	render(){
		let {datebanner, colbanner,column ,gonglve,uptodate, unknown, recruit, march }=this.props;
		return (
			<div className="left-container"> 
			{/*----旅行家专栏---- */}
				<div className="asidebox cloumn">
					<LHeader head={column}/>
					<Sbanner imgbanner={colbanner} id='cloumn'/>
				</div>
				{/*----旅行家专栏---- */}
				{/*----攻略---- */}
				<div className="asidebox gonglve">
					<LHeader head={gonglve}/>
					<div className="sb-container">
						<div className="sb-img">
						  <img src="/picture/wkgbs1d8fxsaskt6aaa5t6cgbs050.jpeg"/>
						</div>
						<h3 className="sb-title"><a href="">凤舞入院加经验刷卡机费格式的</a></h3>
						<ul className="assess">
						  <li><a className="name" href="">水随        </a>点评了<i>   画架速度</i><a className="place" href="">     计算类</a></li>
						</ul>
					</div>
				</div>
				{/*----攻略---- */}
				{/*----最新活动---- */}
				<div className="asidebox uptodate">
					<LHeader head={uptodate}/>
					<Banner imgbanner={datebanner}/>
				</div>
				{/*----最新活动---- */}
					
				
				
			</div>
		)
	}
}

LeftContent.defaultProps={
	colbanner: [
		{ id: 0, src: '/picture/wkgbs1d8diwaeeuvaacqdwkycrm19.jpeg', title:'鹰嘴豆与爱的漩涡' , desc: '大爱不能靠知识，也不能靠教义，只能依靠生命的直觉体验'},
		{ id: 1, src: '/picture/wkgbs1d8dtcacpbjaacantfj9lc31.jpeg', title:'格鲁吉亚酒司令' , desc: '谢尔盖告诉我，站起来的这个人就是“酒司令”，格鲁吉亚语称为“Tamada”，一般由年长或职位高或能喝酒的男人担当。'},
		{ id: 2, src: '/picture/wkgbs1d8eqqau6m-aaclbzgald438.jpeg', title:'四谷怪谈' , desc: '这么一个平和的地方，说早一点，却因为一个叫做阿岩的女鬼闻名全国，这就是人们口口相传的《四谷怪谈》了。'},
		{ id: 3, src: '/picture/wkgbs1d8etwadevhaacsudmmgdg66.jpeg', title:'远东飘散家之味' , desc: '没错，如今这个城市所在的地方，自从清朝以来就被中国称为海参崴，直到1860年《中俄北京条约》的签订。'},
	],
	column: { title: '旅行家专栏', aa: '专栏首页'},
	gonglve: { title: '旅游功略推荐', aa: '更多'},
	uptodate: { title: '最新活动', aa: '查看全部'},
	unknown: { title: '未知旅行实验室', aa: '查看更多'},
	recruit: { title: '马蜂窝2019校园招聘', aa: '了解详情'},
	march: { title: '马蜂窝旅行网站最新进展'}
}

export default LeftContent
