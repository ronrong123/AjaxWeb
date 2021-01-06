function showPage() {
	let doc = xhtp.responseXML;
	//responseXML: 서버에 요청하여 응답으로 받은 데이터를 XML DOM 객체로 반환합니다.
	let data = doc.getElementsByTagName('record');
	console.log(data);
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border', '1');

	// title tr
	// data tr => [배열]
	let headerTr = titleRow(data);
	let dataTrs = contentRow(data);
	tableTag.appendChild(headerTr);
	for (let i = 0; i < dataTrs.length; i++) {
		tableTag.appendChild(dataTrs[i]);
	}
	document.getElementById('show').appendChild(tableTag);
}

function titleRow(result) {
	let trTag = document.createElement('tr');
	for (let i = 0; i < result[0].childNodes.length; i++) {
		let tdTag = document.createElement('th');
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		tdTag.appendChild(textNode);
		trTag.appendChild(tdTag);
	}
	let tdTag = document.createElement('th');
	let textNode = document.createTextNode('처리');
	tdTag.appendChild(textNode);
	trTag.appendChild(tdTag);
	
	return trTag;
}

function contentRow(result) {
	let trTags = [];
	for (let j = 0; j < result.length; j++) {
		let trTag = document.createElement('tr');
		
		for (let i = 0; i < result[j].childNodes.length; i++) {
			let tdTag = document.createElement('td');
			let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue);
			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);
		}
		// 임의로 버튼 추가.
		let button = document.createElement('button');
		button.innerHTML = '삭제';		
		button.onclick = function(){
			console.log(this.parentNode.parentNode.remove());
			let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
			let req = new XMLHttpRequest();
			req.open('get','../deleteEmp?empId='+ id);
			req.send();
			req.onload = function(){
				console.log(req.responseText);
				// responseText: 서버에 요청하여 응답으로 받은 데이터를 문자열로 반환합니다.
			}
			//this 키워드는 이벤트가 발생하는 엘리먼트
		}
		trTag.onmouseover = function(){			
			trTag.style.backgroundColor = "#ffcc00";
		}
		trTag.onmouseout = function(){
			trTag.style.backgroundColor = "";
		}
		let tdTag = document.createElement('td');
		tdTag.appendChild(button);
		trTag.appendChild(tdTag);
		
		
		trTags.push(trTag);
	}
	return trTags;
}