function showPage() {
	let doc = xhtp.responseXML;
	//responseXML: 서버에 요청하여 응답으로 받은 데이터를 XML DOM 객체로 반환합니다.
	let data = doc.getElementsByTagName('record');
	console.log(data);
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border', '1');
	tableTag.setAttribute('id', 'tdl');

	// title tr
	// data tr => [배열]
	let headerTr = titleRow(data);
	let dataTrs = contentRow(data);
	tableTag.appendChild(headerTr);
	for (let i = 0; i < dataTrs.length; i++) {
		tableTag.appendChild(addBtn(dataTrs[i], delFunc));
	}
	document.getElementById('show').appendChild(tableTag);
}

function delFunc(){
	console.log(this.parentNode.parentNode.remove());
	
	let req = new XMLHttpRequest;
	let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
	//parentNode: 부모노드
	//childNodes: 자식노드
	//firstChild: 첫 번째 자식노드	
	req.open('get', '../deleteEmp?empId=' + id);
	req.send();
	req.onload = function(){
		console.log(req.responseText);		
	}	
}
function addBtn(tr, callBackFunc){
	//버튼 추가 코드, 이벤트 등록
	let butn = document.createElement('button');
	butn.onclick = callBackFunc;
	butn.innerHTML = '삭제';
	let tdTag = document.createElement('td');
	tdTag.appendChild(butn);
	tr.appendChild(tdTag);
	
	return tr;		
}
function titleRow(result) {
	let trTag = document.createElement('tr');
	for (let i = 0; i < result[0].childNodes.length; i++) {
		let tdTag = document.createElement('th');
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		tdTag.appendChild(textNode);
		trTag.appendChild(tdTag);
	}
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
	trTag.onmouseover = function(){
		this.style.background = "#ffcc00";
	}
	trTag.onmouseout = function(){
		this.style.background = "";
	}
		
		
		trTags.push(trTag);
	}
	return trTags;
}
