
import React, {Component} from 'react'
import linear from '../../../../modules/linear'

class HotSales extends Component{
	
	constructor(props){
		super(props)
		this.handleLeave=this.handleLeave.bind(this)
		this.handleEnter=this.handleEnter.bind(this)
	}
	
	handleEnter(e){
		var target= e.currentTarget;
		var h3=target.children[0].children[1];
		target.className='hot-actli';
		linear( h3,{ marginTop: -35,height: 80},10);
	}
	
	handleLeave(e){
		var target= e.currentTarget;
		var h3=target.children[0].children[1];
		linear( h3,{ height: 40, marginTop: 5},10,function(){
			target.className='';
		});
	}
	
	render(){
		let { hotsales }= this.props;
		return (
			<div className="hot-container"> 
				<div className="hot">爆款热卖</div>
				<div className="hot-list clear">
					<ul>
					{
						hotsales.map(item=>{
							return (
								<li key={item.id} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
								<a href="">
								  <div className="hot-img">
								    <img src={item.src}/>
								  </div>
								  <h3>{item.desc}</h3>
							       <div className="hot-price">
							         ￥<strong>{item.price}</strong><i>起</i>
							       </div>
							</a>
						</li>
							)
						})
					}
						
					</ul>
				</div>
			</div>
		)
	}
}

HotSales.defaultProps={
	hotsales: [
	  { id: 1, src: '/picture/wKgED1vFi5WATI_XAAai8QQeAzY95.jpeg', price:2999 ,desc:'北京直飞昆明普洱西双版纳6天5晚轻奢跟团游（豪华3飞不走回头路+全程5星+湖景度假酒店+孔雀放飞+野象谷+普洱国家森林公园+打洛小镇+独树成林）'},
	  { id: 2, src: '/picture/wKgBZ1jwh3WAQAY1AAJgy1QjGQ862.jpeg', price:198 ,desc:'泰国普吉国际机场 普吉岛全境接机 24小时服务（准时准点+5座/13座车型）' },
	  { id: 3, src: '/picture/wKgED1vFl7OAcJzxAACAXFWfzeA764.gif', price:388 ,desc:'[北京送签]新加坡个人旅游签证（家庭办理更优惠+暂无拒签记录+优化资料+代填申请表+含拒签全退套餐+1对1专业指导+诚信商家经营)'}
	]
}

export default HotSales
