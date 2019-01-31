import React ,{ Component} from 'react'
import './index.scss'
import SalesSearch from '../../common/SalesSearch'
import SalesAside from '../../common/SalesAside'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/hotmdd/actionCreator'
import SalesSwiper from '../../common/SalesSwiper'
import ListView from '../../common/ListView'
import $ from 'jquery'

class LocalGo extends Component{
	
	render(){
		return (
			<div className="localgo-box">
				<SalesSearch title="当地游" classname="icon-local"/>
			</div>
		)
	}
	
}

export default LocalGo