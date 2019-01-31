

const fnPro=(url,data)=>{
			var ajax=null;
			if(data){
				url=url+"?"+data;
			}
			//创建promise对象
			var pro=new Promise(function(success,failed){
				ajax=new XMLHttpRequest();
				/*if(XMLHttpRequest){
					ajax=new XMLHttpRequest();
				}else{
					ajax=new ActiveXObject("Microsoft.XMLHTTP");
				}*/
				ajax.open("get",url);
				ajax.send();
				ajax.onreadystatechange=function(){
					if(ajax.readyState==4 && ajax.status==200){
						success(ajax.responseText);
					}
				}
				//如果经过一段时间，没有执行success的话就失败
				setTimeout(function(){
					failed();
				},5000)
			});
			return pro;//返回promise对象，后续有操作
		}

export default fnPro
