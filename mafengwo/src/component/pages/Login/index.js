import React ,{ Component} from 'react'
import './index.scss'
import $ from 'jquery'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/mine/actionCreator'

class Login extends Component{
	
	constructor(props){
		super(props)
		this.state={
			err: false
		}
		this.name=false;
		this.pwd=false;
		this.testName=this.testName.bind(this)
		this.testPwd=this.testPwd.bind(this)
		this.login=this.login.bind(this)
	}
	
	testPwd(){
		var pwd= this.password.value;
		let {err}=this.state;
		
		if(pwd.length<4 && pwd.length>0){
			this.setState({err: true});
			this.content='密码不能少于4位';
			return;
			}
		if(!pwd){
			this.setState({err: true});
			this.content='密码不能为空';
			return;
		}
		if(pwd.length>=4){
			if(err){
				this.setState({err: false})
			}
			this.pwd=true;
		}
	}
	
	testName(){
		var name=this.username.value;
		let {err}=this.state;
		var reg1=/^(15[0-9]|13[0-9]|18[0-9])\d{8}$/;
//		var reg2=/^([a-zA-Z]|[0-9])\w{4,}@\w+\.\w+$/;
		if(!name){
			this.setState({err: true});
			this.content='账号不能为空';
			return;
		}else if(!reg1.test(name)){
			this.setState({err: true});
			this.content='手机号书写不正确';
			return;
		}else{
			if(err){
				this.setState({err: false})
			}
			this.name=true;
		}
	}
	
	login(){
		var name=this.username.value;
		var pwd= this.password.value;
		if(this.name && this.pwd){
			this.props.getUser(name, pwd, success.bind(this), fail.bind(this));
		}
		function success(){
			this.props.history.replace('/');
		}
		function fail(){
			$('.fail').css('display', 'block');
			return false;
		}
			
	}
	
	render(){
		let {err}= this.state;
		return (
			<div className="login-box">
				<img height="586" src="/picture/38.jpg"/>
				<div className="login-container">
					<div className="login-icon"></div>
					<div className="login-content">
						
						<div className="login-input">
						<p className="fail">账号密码有误,请重新输入</p>
						{ !err || <p className="tip">{this.content}</p>}
							<form action="" method="get">
								<input ref={el=>this.username=el} onBlur={this.testName} autoComplete='true' type="text" placeholder="您的手机号"/>
								<input ref={el=>this.password=el} onBlur={this.testPwd} type="password" placeholder="您的密码"/>
								<button type="button" onClick={this.login}>登录</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

export default connect(state=>state, dispatch=>{
	return bindActionCreators(actionCreator, dispatch);
})(Login)
