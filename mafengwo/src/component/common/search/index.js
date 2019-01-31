import React from 'react'
import './index.scss'


const Search=(props)=>{
	return (
		<div className="table-search">
	  		<a role="button" href="javascript:;">
	  			<i className="search-icon"></i>
	  		</a>
	  	</div>
	)
}

const Tinput=(props)=>{
	
	let { id, ph}= props.name;
	
	return (
		<div className="table-input">
	  		<input type="text" placeholder={ph} autoComplete="off" id={id}/>
	  	</div>
	)
}

export {Tinput, Search}
