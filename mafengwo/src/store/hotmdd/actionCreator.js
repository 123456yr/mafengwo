import { GETMDD, GETALLCITY, SALESPLACE} from './const'
import $ from 'jquery'

export default {
	getmdd(){
		return dispatch=>{
			$.ajax({
				url: '/json/tourplace.json',
				success: (res)=>{
					var hotmdd= res.type;
					dispatch({
						type: GETMDD,
						hotmdd
					})
				}
			})
		}
	},
	getAllCity(){
		return dispatch=>{
			$.ajax({
				url: '/json/city.json',
				success: (res)=>{
					var allcity= res.data;
					
					dispatch({
						type: GETALLCITY,
						allcity
					})
				}
			})
		}
	},
	getSalesPlace(){
		return dispatch=>{
			$.ajax({
				url: '/json/detail.json',
				success: (res)=>{
					var salesPlace=res.data;
					dispatch({
						type: SALESPLACE,
						salesPlace
					})
				}
			})
		}
	}
}
