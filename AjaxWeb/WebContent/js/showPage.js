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
			let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
			let req = new XMLHttpRequest();
			req.open('get','../delbd?boardNo='+ id);
			req.send();
			req.onload = function(){
				console.log(req.responseText);
				// responseText: 서버에 요청하여 응답으로 받은 데이터를 문자열로 반환합니다.
			}
}
function addBtn(tr, callBackFunc){
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
		let bNo = result[j].childNodes[0].firstChild.nodeValue;		
		trTag.setAttribute('id','bd_'+bNo);
		for (let i = 0; i < result[j].childNodes.length; i++) {
			let tdTag = document.createElement('td');
			let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue);
			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);
		}
		// 임의로 버튼 추가.
		trTag.onmouseover = function(){			
			trTag.style.backgroundColor = "#ffcc00";
		}
		trTag.onmouseout = function(){
			trTag.style.backgroundColor = "";
		}
		trTag.onclick = function(){
			let bNo = document.getElementById('bNo')
			let title = document.getElementById('title');
			let content = document.getElementById('content');
			let writer = document.getElementById('writer');
			bNo.value = this.childNodes[0].firstChild.nodeValue;
			title.value = this.childNodes[1].firstChild.nodeValue;
			content.value = this.childNodes[2].firstChild.nodeValue;
			writer.value = this.childNodes[3].firstChild.nodeValue;
			
		}
		
		
		trTags.push(trTag);
	}
	return trTags;
}