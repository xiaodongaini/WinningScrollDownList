var timer; //定时器
var speed = 40; //滚动速度
var delay = 5000; //延迟时间
var iLi= 110; //滚动的高度（长度）
var itemArr = []; //用于展示的数组，有四个数据

var oUl = document.getElementById("scrollUl");
window.onload = function(){
	initDefaultData();
	setTimeout("startScroll()",delay);
}
function startScroll(){
	timer=setInterval(scrollDown,speed);
	oUl.style.top = oUl.offsetTop+1+'px';
}
function scrollDown(){
	if(oUl.offsetTop % iLi==0){
		oUl.style.top = oUl.offsetTop-iLi+'px'; 
		updateItem();
		clearInterval(timer);   
		setTimeout(startScroll,delay);
	}else{
		oUl.style.top = oUl.offsetTop+1+'px';
	}
}
//更新用于显示的四项数据
function updateItem(){
	var getNode = getRandomArray(userArr,1); //获取要插入的用户

	var newItem=document.createElement("li");
	newItem.className = "clearfloat";
	newItem.innerHTML=joinLiCharByObj(getNode[0]);
	oUl.insertBefore(newItem,oUl.childNodes[0]);

	itemArr.push(getNode[0]); //将新的一项放入用于显示的数组
	removeLast();
	var firstItem = itemArr.shift();//获取要移除的用户
	userArr.push(firstItem); //将移除的用户放入备选用户数组中
}
//移除ul 中的最后一项
function removeLast(){
	oUl.removeChild(oUl.lastChild);
}

//初始化前四个数据
function initDefaultData(){
	itemArr = getRandomArray(userArr,4);
	var newLi;
	for(var i=0,j=itemArr.length; i<j; i++){
		newLi = document.createElement("li");
		newLi.className = "clearfloat";
		newLi.innerHTML = joinLiCharByObj(itemArr[i]);
		//oUl.insertBefore(newLi,oUl.childNodes[0]);
		oUl.insertBefore(newLi,oUl.hasChildNodes()?oUl.childNodes[0]: null);
		//oUl.appendChild(newLi);
	}
}
//拼接li 的 innerHTML 字符串
function joinLiCharByObj(userObj){
	return '<img src="images/'+userObj.img+'" class="f-left">'+
			'<div class="userInfo-box f-left">'+
				'<span class="userName">用户：'+userObj.Name+'</span>'+
				'<span class="userPhone">'+ userObj.Tel+'</span>'+
				'<p>获得'+userObj.Price+'</p>'+
			'</div>';
}
//从一个数组中随机获取n项，并更新该数组
function getRandomArray(arr,num){
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (arr.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*arr.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = arr[arrIndex];
            //然后删掉此索引的数组元素,这时候arr变为新的数组
            arr.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}
