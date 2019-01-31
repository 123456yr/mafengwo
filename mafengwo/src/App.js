import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {Home, Hotel, Mdd, Gonglve, Sales, AirTicket, LocalGo, Login, Detail} from './component/pages'
import Nav from './component/common/nav'
import SalesHeader from './component/common/SalesHeader'
import actionCreator from './store/mine/actionCreator'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class App extends Component {
	
	constructor(props){
		super(props)
		this.showNavBar= this.showNavBar.bind(this);
	}
	
	showNavBar(){
		var pathname=this.props.location.pathname;
		let path=['/login', '/mine']
		var flag=path.every(item=>{
			if(pathname==='/' || pathname.startsWith(item)){
				return false;
			}
			return true;
		})
		if(flag){
			return <Nav/>
		}
	}
	
	salesNav(){
		let path=['/sales','/localgo','/airticket'];
		var nosalesnav=path.every(item=>{
			if(this.props.location.pathname.startsWith(item)){
				return false;
			}
			return true;
		  	})
		return nosalesnav || <SalesHeader/>
	}
	
	componentWillMount(){
		this.props.getCity()
	}
	
  render() {
	let {routes}= this.props;
    return (
      <div className="App">
      { this.showNavBar()}
      { this.salesNav()}
      	<Switch>
        {
        	routes.map(item=>{
        		return <Route key={item.id} path={item.path} component={item.component} exact={item.exact}/>
        	})
        
        }
        </Switch>
      </div>
    );
  }
}

App.defaultProps={
	routes: [
		{ id: 1, path: '/', component: Home, exact: true},
		{ id: 2, path: '/hotel', component: Hotel},
		{ id: 3, path: '/mdd', component: Mdd},
		{ id: 4, path: '/gonglve', component: Gonglve},
		{ id: 5, path: '/sales', component: Sales},
		{ id: 6, path: '/app', component: App},
		{ id: 8, path: '/localgo', component: LocalGo },
		{ id: 9, path: '/airticket', component: AirTicket },
		{ id: 10, path: '/login', component: Login },
		{ id: 11, path: '/detail/:id', component: Detail }
	]
}

export default withRouter(connect(state=>state,dispatch=>{
	return bindActionCreators(actionCreator, dispatch)
})(App))
	