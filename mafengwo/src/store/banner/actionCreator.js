import $ from 'jquery'
import {GETBANNER, BLBANNER} from './const'
export default {
	getBanner(){
		return dispatch=>{
			$.ajax({
				url: '/json/banner.json',
				success: (res)=>{
					var imgs= res.dateBanner;
					dispatch({
						type: GETBANNER,
						imgs
					})
				}
			})
		}
	},
	getBlBanner(){
	return dispatch=>{
		$.ajax({
			url: '/json/banner.json',
			success: (res)=>{
				var imgs= res.glBanner;
				dispatch({
					type: BLBANNER,
					imgs
				})
			}
		})
}

	}
}

