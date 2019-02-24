import React ,{ Component} from 'react'
import './index.scss'
import Toast from '../Toast'

class UpList extends Component{
	
	constructor(props){
		super(props)
		this.state={
			new_data: [],
			content: this.props.content || '加载中...'
		}
		this.showNum=this.showNum.bind(this)
		this.clickPage=this.clickPage.bind(this)
		this.handleScroll=this.handleScroll.bind(this)
		this.changeContent=this.changeContent.bind(this)
		this.clientHeight= document.documentElement.clientHeight;
		//设置参数默认值
		this.num=this.props.num || 6;
		this.page=1;
		this.count=0;
		this.index=1;
		this.distance= this.props.distance || 20;
		this.loading= false;
	}

	clickPage(e){
		var target=e.target;
		if(target.tagName==="A"){
			var all = target.parentNode.children;
			var datamsg= target.getAttribute('data-msg');
			var prevIndex = this.index;
			if(isNaN(parseInt(datamsg))){
				this.index=eval(this.index+datamsg+1);
				if(this.index<= 0) return ;
				if(this.index>= this.page) return;
				all[this.index].classList.add('on');
				all[prevIndex].classList.remove('on');
				this.showNum();
			}else{
				
				for(var i=0; i<all.length; i++){
					if(all[i].classList.contains('page')){
						all[i].classList.remove('on');
					}
				}
				target.classList.add("on");
				this.index=datamsg;
				this.showNum();
			}
//			
		}
	}
	
	showNum(props){
		props= props || this.props;
		let {data, lazy}=props;
		if(lazy){
			setTimeout(()=>{
				this.setState(prestate=>({
					new_data: prestate.new_data.concat(data.slice((this.index-1)*this.num, this.index*this.num))
				}))
			}, 1000)
			return;
		}
		this.setState({
			new_data: data.slice((this.index-1)*this.num, this.index*this.num)
		})
	}
	
	
	
	
	getPage(props){
		
		this.arrPages=[];
		for(var i=1; i<=this.page; i++){
			this.arrPages.push(<a className="page" data-msg={i}>{i}</a>)
		}
	}
	
	//	点击加载更多
	changeContent(){
		this.loadMore();
	}
	
	loadMore(){
		let {toast}=this.props;
		if(this.loading) return;
		this.index++;
		if(this.index>=this.page){
			if(toast){
				this.setState({
					content: '没有更多了'
				})
			}
			return;
		}
		if(toast){
			if(this.state.content!== '加载中...'){
				this.setState({
					content: '加载中...'
				})
			}
		}
		
		this.loading= true;
		this.showNum();
	}
	
	handleScroll(e){
		if(!this.props.lazy) return;
		let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		let offsetHeight=document.documentElement.offsetHeight;
		if(offsetHeight- this.clientHeight- scrollTop<= this.distance ){
			if(this.index===1){
				this.refs.toast.refs.toastbox.style.display='block'
				this.loadMore();
				
			}
			if(this.loading) return;
			if(this.state.content!=='加载更多'){
				this.setState({
					content: '加载更多'
				})
			}
		}
	}
	
	componentWillMount(){
		let {data, row}=this.props;
		if(!data || !row){
			console.log('参数不全');
		}
	}
	
	componentWillReceiveProps(props, state){
		//父组件判断一步获取的数据有值后才向子组件传值，render一次，在componentWillMount中this.props中获取不到数组的值，但是，可以获取到数值类型或string类型等初始类型的值，
//		但是在this中的this.props 中有数组的值得。
//      如果是父组件直接传值，到子组件判断，子组件render两次，在componentWillReceiveProps中处理属性，这时的属性还是原来的空，要用参数中的props；
		this.showNum(props)
		let {data}=props;
		this.count=data.length;
		this.page= Math.ceil(this.count/this.num);
		if(props.page){
			this.getPage(props);
		}
	}
	
	
	componentDidUpdate(){
		let {lazy}=this.props;
		let {new_data}=this.state;
		if(lazy){
			this.loading=false;
		}
		return true;
	}
	
	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll)
	}
	
	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}
	
	render(){
		let {new_data, content}=this.state;
		let {row, data, page, toast}= this.props;
		if(data.length<=0) return ''
		return (
			<div className="uplist-view">
				<div className="uplist-item">
				{
					new_data.map(item=>{
						return row(item)
					})
				}
				</div>
				{
					!toast || <Toast ref={'toast'} content={content} changeContent={this.changeContent}/>
				}
				{
					!page || (
						<div className="list-page clear">
							<div className="pagination" onClick={this.clickPage}>
								<a className="pre-page on" data-msg="-">上一页</a>
								{this.arrPages}
								<a className="next-page on" data-msg="+">下一页</a>
							</div>
							<span className="count">{this.count}条</span>
						</div>
					)
				}
				
			</div>
		)
	}
	
}

export default UpList