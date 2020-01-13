
init();
init1();
function init(){
	var key=localStorage.getItem('key');
	if(key==55558888){
		return
	}else{
		window.location.href='zonghengkey.html';
	}
}
function init1(){
	$.ajax({
			url:"http://wx.ptnetwork001.com/app/list.jhtml?isLottery=1",
			type:"GET",
			dataType: "jsonp",
			success:function(data){
				var result=data.result;
				var str='';
				for(var i=0;i<result.length;i++){
					var star='****';
					str+=`
						<tr>
							<td><p style="font-size: 24px;">${result[i].name}</p></td>
							<td><p style="font-size: 24px;">${result[i].phone.slice(0,3)+star+result[i].phone.slice(7,12)}</p></td>
						</tr>
					`
				}
				$('.list').html(str);
			}
		})
}
var phone = new Array();
var names = new Array();
var phonetxt = $('.phone');
var isBegin = false;
var pcount,phone1,t,rand;
//开始停止
$(document).keydown(function(e){
			var u=96;
			if(!e) var e = window.event; 
			if(e.keyCode==13){
				$.ajax({
					url:'http://wx.ptnetwork001.com/app/list.jhtml',
					type:'GET',
					dataType: "jsonp",
					success:function(data){
						console.log(data);
						phone1 = data.result;
						
						for(var i=0;i<phone1.length;i++){
							phone[i]=phone1[i].phone;
						}
						for(var j=0;j<phone1.length;j++){
							names[j]=phone1[j].name;
						}
						pcount = phone.length-1;

						if(isBegin){
							return false
						}
						isBegin = true;
						$(".num").css('backgroundPositionY',0);
						var result = numRand();
						
						//$('#res').text('随机摇奖结果 = '+result);
						var num_arr = (result+'').split('');
						$(".num").each(function(index){
							var _num = $(this);
							setTimeout(function(){
								_num.animate({
									backgroundPositionY: (u*60) - (u*num_arr[index]) - 30
								},{
									duration: 2000+ Math.sqrt(index*1000000),
									easing: "easeInOutCirc",
									complete: function(){
										if(index==10) {
											isBegin = false
											var star='****';
											var arr=[];
											$('.list').prepend("<tr>"+"<td>"+"<p style='font-size: 24px;'>"+names[rand]+"</p>"+"</td>"+"<td>"+"<p style='font-size: 24px;'>"+phone[rand].slice(0,3)+star+phone[rand].slice(7,12)+"</p>"+"</td>"+"</tr>");

											//localStorage.setItem('phone',phone);
											$.ajax({
												url:"http://wx.ptnetwork001.com/app/lottery.jhtml",
												type:"GET",
												data:{
													phone:phone[rand]
												},
												dataType: "jsonp",
												success:function(data){
													console.log(data);
												}
											})
											
											phone.splice($.inArray(phone[rand], phone), 1);
										};
									}
								});
							}, index * 300);
							//$(".fade").css('height',document.body.scrollHeight);
							//$(".fade").css('width',document.body.scrollWidth);
							//$(".fade").css('display','block');
						});
					},
					error: function (e) {
						alert(e);

					}
				});
				//if(runing){
				//	runing=false;
				//	$('#btntxt').removeClass('start').addClass('stop');
				//	$('#btntxt').html('停止');
				//	startNum();
				//}
				//else{
				//	runing=true;
				//	$('#btntxt').removeClass('stop').addClass('start');
				//	$('#btntxt').html('开始');
				//	stop();
				//	$('.list').prepend("<p>"+" -- "+phone[num]+"</p>");
				//	phone.splice($.inArray(phone[num], phone), 1);
				//
				//}

			}
});
function numRand() {
	rand = Math.floor(Math.random() * pcount);
	console.log(phone[rand]);
	return phone[rand];
}
function nameRand() {
	rand = Math.floor(Math.random() * pcount);
	console.log(name[rand]);
	return name[rand];
}


