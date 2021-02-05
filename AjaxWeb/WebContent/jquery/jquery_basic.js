console.log('first');
	$(document).ready(function(){
		console.log('second');
	//document:작업하고있는 문서, .ready():처음부터 끝까지 로딩 
	console.log(document.getElementById('food_1').childNodes[1].firstChild.nodeValue);
	console.log($('#food_1').children().eq(0).html());
	// children(자식들요소중에서).eq(1)첫번째 node값을 가져오겠다.html(): children().eq(1)의 html값을 가져오겠음
	$('#food_1 > ul > li').eq(0).css('background', 'red');
	$('#food_1 > ul > li').eq(1).html('bulgogi');
	//html(): innerHTML의 속성을 가져오겠다 괄호안에 값을 넣으면 innerHTMl값으로 들어감 
	});
	console.log('third');