
import React, {Component} from 'react'
import { Search, Tinput } from '../../common/search'


class Table extends Component{
	
	constructor(props){
		super(props)
		this.searchtoggle=this.searchtoggle.bind(this)
	}
	
	
	
	searchtoggle(e){
		var target=e.currentTarget;
		var nav= document.getElementsByClassName('table-list')[0].children[0].children;
		var index= target.getAttribute('data-index');
		var tabdiv= document.getElementsByClassName('table-searchbar');
		for(var i=0; i<tabdiv.length; i++){
			tabdiv[i].classList.add('hide');
			nav[i].className='';
		}
		target.className="tab-selected";
		tabdiv[index-1].classList.remove('hide')
	}
	
	render(){
		let { tabs , all, hotel, mdd, sales}= this.props;
		return (
			<div className="table-container"> 
				<div>
				  <div className="table-list">
				  	<ul>
				  	{
				  		tabs.map(item=>{
				  			return (
				  				<li key={item.id} data-index={item.id} className={item.classname} onClick={this.searchtoggle}>
				  					<span></span>
				  					{item.title}
				  				</li>
				  			)
				  		})
				  	}
				  	</ul>
				  </div>
				  {/*--- 全部  start---*/}
				  <div className="table-searchbar">
				    <div className="table-wrapper">
					  	<Tinput name={all}/>
				  	</div>
				  	<Search/>
				  </div>
				  {/*--- 全部  end---*/}
				  {/*--- 酒店  start---*/} 
				  <div className="table-searchbar search-hotel hide">
				  	 <div className="table-wrapper">
					  	 <form action="" method="get">
						  	<Tinput name={hotel}/>
						 </form> 
					     <div className="search-date" id="search-1">
					       <input readOnly="readonly" type="text" className="hasdate" id="date111"/>
					       <span></span>
					     </div>
					     <div className="search-date" id="search-2">
					       <input readOnly="readonly" type="text" className="hasdate" id="data222"/>
					       <span></span>
					     </div>
				  	</div>
				  	<Search/>
				  </div>
				  {/*--- 酒店  end---*/}
				  {/*--- 目的地 start---*/}
				  <div className="table-searchbar hide">
				     <form action='' method='get'>
					    <div className="table-wrapper">
						  	<Tinput name={mdd}/>
					  	</div>
					  	<Search/>
				     </form>
				  </div>
				  {/*--- 目的地 end---*/}
				  {/*--- 旅行商城 start---*/}
				  <div className="table-searchbar hide">
				  	<div className="table-wrapper">
					  	<Tinput name={sales}/>
				  	</div>
				  	<Search/>
				  </div>
				  {/*--- 旅行商城 end---*/}
				</div>
			</div>
		)
	}
}

Table.defaultProps={
	tabs: [
		{ id: 1, title: '全部', classname: 'tab-selected'},
		{ id: 2, title: '酒店'},
		{ id: 3, title: '目的地'},
		{ id: 4, title: '旅行商城'}
	],
	all: { id: 'table-all', ph: '搜目的地/攻略/酒店/旅行特价'},
	hotel: { id: 'table-hotel', ph: '请输入国家、地区、城市名称'},
	mdd: { id: 'table-mdd', ph: '我要去...'},
	sales: { id: 'table-sales', ph: '产品名称/目的地/优惠'}
	
}

export default Table
