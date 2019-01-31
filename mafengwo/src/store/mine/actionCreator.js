import {LOGIN, CHANGE_CITY} from './const'

export default{
	getUser(name, pwd, success, fail){
		return dispatch=>{
			if(name==='15732689332' && pwd==="123456yr"){
				dispatch({
					type: LOGIN,
					username: 'yyyy'
				})
				success();
			}
			fail();
		}
		
	},
	userExit(){
		return dispatch=>{
			dispatch({
				type: LOGIN,
				username: ''
			})
		}
	},
	getCity(){
		return dispatch=>{
			var script=document.createElement('script');
			script.src='https://webapi.amap.com/maps?v=1.4.11&key=bbdde5cc4bcfe2f9171c72bcd5a6aa51&plugin=AMap.CitySearch'
			document.body.appendChild(script)
			script.onload=function(){
				var city=''
				//直接使用AMap会出错，会用全局的
				const AMap=window.AMap;
				 var map = new AMap.Map("container", {
			        resizeEnable: true,
			        center: [116.397428, 39.90923],
			        zoom: 13
			    });
			    //获取用户所在城市信息
			    function showCityInfo() {
			        //实例化城市查询类
			        var citysearch = new AMap.CitySearch();
			        //自动获取用户IP，返回当前城市
			        citysearch.getLocalCity(function(status, result) {
			            if (status === 'complete' && result.info === 'OK') {
			                if (result && result.city && result.bounds) {
			                    city = result.city.replace('市', '');
			                    dispatch({
							    	type: CHANGE_CITY,
							    	city
							    })
			                }
			            } 
			        });
			    }
			    showCityInfo();
			    
			}
			
		}
	}
}
