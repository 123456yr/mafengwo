
import React from 'react'

const SalesDesc=(props)=>{
	let {salesdesc}=props;
	return (
		<div className="sales-desc">
		{
			salesdesc.map(item=>{
				return (
					<div className="s-d-list">
						<span className={`icon${item.id}`}></span>
						<div className="s-d-item">
							<h3>{item.title}</h3>
							<p>{item.desc}</p>
						</div>
					</div>
				)
			})
		}
		</div>
	)
}

export default SalesDesc