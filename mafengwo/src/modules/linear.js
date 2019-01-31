

const linear=(obj, json, time, callback)=>{
	clearInterval(obj.timer)
	obj.timer=setInterval(function(){
		var flag= true;
		for(var attr in json){
			var target =json[attr];
			var current=parseInt(getStyle(obj, attr));
			var speed= target-current;
			speed= speed>0? 7: -7;
			//匀速涌动停止的条件  当差值小于速度就停下，让当前的值直接等于目标值
			if(Math.abs(target-current)< Math.abs(speed)){
				obj.style[attr]=target+'px';
				current=target;
				speed=0;
			}
			if(target !== current){
				flag= false;
			}
			//设置值
			obj.style[attr]=(current+speed)+ "px";
		}
		if(flag){
			clearInterval(obj.timer);
				if(callback){
					callback();
				}
		}
	}, time)
}

function getStyle(obj, attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj, false)[attr];
	}else{
		return obj.currentStyle[attr]
	}
}

export default linear