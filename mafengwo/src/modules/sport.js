
const sport=(obj, json,num, callback)=>{
	clearInterval(obj.timer)
	var current=0;
	
	obj.timer= setInterval(function(){
		var flag= true;
		for( var attr in json){
			var target= json[attr];
			if(attr === 'opacity'){
				current= parseFloat(getStyle(obj, attr)*100);
			}else{
				//将得到的字符串转为数值
				current= parseInt(getStyle(obj, attr));
			}
			if(current!== target){
				flag = false;
			}
			//设置速度
			//缓冲运动,只要目标值和当前值还有差距就会一直加，加到差距为0为止，速度会越来越小，所以为缓冲运动
			var speed= (target- current)/num;
			//浏览器会讲小数向下取值，最后就打不到目标值，所以将向上取值，当目标值和当前值的差距为0 时，让他停下
			speed= speed > 0 ? Math.ceil(speed) : Math.floor(speed)
			//设置加上速度后的值
			if(attr=== 'opacity'){
				obj.style['opacity']= (current+speed)/100;
			}else if(attr === 'zIndex'){
				obj.style[attr]= target;
			}else{
				obj.style[attr]= current+speed+ 'px';
			}
			
		}
		//当所有的运动都执行完成后，处理回调
		if(flag){
			clearInterval(obj.timer);
			if(callback){
				callback();
			}
		}
		
	},30)
	
}

function scrollTop(){
	console.log(document.documentElement.scrollTop)
	return document.documentElement.scrollTop || document.body.scrollTop;
	
}

//获取非行内样式值
 function getStyle(obj, attr){
 	if( window.getComputedStyle){
 		return window.getComputedStyle(obj, false)[attr];
 	}else{
 		return obj.currentStyle[attr]
 	}
 }

export default sport