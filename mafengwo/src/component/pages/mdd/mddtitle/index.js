
import React, {Component} from 'react'
import './index.scss'

class MddTitle extends Component{
	
	constructor(props){
		super(props)
//		this.country=[]
	}
	
	/*getcity(){
		let {country}=this.props.hottours;
		country.forEach(item=>{
			for(var c in item){
				this.country.push(c);
			}
		})
		
	}
	*/
	
	
	componentWillMount(){
		
	}
	
	render(){
	
	let {enter}=this.props;
	let {title, arr}= this.props;
	
		return (
			<div className="mdd-title"> 
				<h2>{title.name}</h2>
				<div className="title-type clear">
					<ul className="clear">
					{
						arr.map((item,i)=>{
							return <li key={i} className={title.class} data-index={i} onMouseEnter={enter}><a>{item}</a><span>|</span></li>
						})
					}
					  
					</ul>
				</div>
			</div>
		)
	}
}

export default MddTitle
