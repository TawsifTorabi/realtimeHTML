//Byte Size Formatter
function formatBytes(bytes, decimals = 2, isBinary = false) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
      if (!+bytes) {
        return `0 ${sizes[0]}`;
      }
    
      const inByte = isBinary ? 1024 : 1000;
      const dm = decimals < 0 ? 0 : decimals;
    
      const pow = Math.floor(Math.log(bytes) / Math.log(inByte));
      const maxPow = Math.min(pow, sizes.length - 1);
    
      return `${parseFloat((bytes / Math.pow(inByte, maxPow)).toFixed(dm))} ${
        sizes[maxPow]
      }`;
}



function SetVertical(){
	document.getElementById('dividerDrag').remove();
	const verElem = document.createElement('hr');
	verElem.id = 'dividerDrag';
	verElem.classList.add('dividerVertical');
	document.getElementById('resizerContainer').appendChild(verElem);
	document.getElementById('dividerDrag').addEventListener('mousedown', initDrag, false);
	
	var editor = document.getElementById('codewriter');
	var result = document.getElementById('resultcont');
	
	editor.style.width = '48%';
	editor.style.display = 'inline-block';
	editor.style.height = '548px';
	editor.style.maxHeight = '548px';
	
	result.style.width = '48%';
	result.style.display = 'inline-block';
	result.style.height = '550px';
	result.style.maxHeight = '550px';
	
	//document.getElementById('resizerContainer').innerHTML = '<hr id="dividerDrag" class="dividerHorizontal"/>';
}

function SetHorizontal(){
	document.getElementById('dividerDrag').remove();
	const horElem = document.createElement('hr');
	horElem.id = 'dividerDrag';
	horElem.classList.add('dividerHorizontal');
	document.getElementById('resizerContainer').appendChild(horElem);
	document.getElementById('dividerDrag').addEventListener('mousedown', initDrag, false);
	
	var editor = document.getElementById('codewriter');
	var result = document.getElementById('resultcont');
	editor.style.width = '99%';
	editor.style.display = 'inline';
	editor.style.height = '242px';
	editor.style.maxHeight = '500px';
	
	result.style.width = '100%';
	result.style.display = 'inline';
	result.style.height = '280px';
	result.style.maxHeight = '500px';
	
	//document.getElementById('resizerContainer').innerHTML = '<hr id="dividerDrag" class="dividerHorizontal"/>';
}

//Get Arrangement Style From LocalStorage
function SetArrangement(){
	let Arrangement = localStorage.getItem('realtimeHTML_Arrangement');
	if(Arrangement == 'vertical'){
		document.getElementById('arrangeBtn').innerHTML = '<i class="fa-solid fa-grip-vertical"></i>';
		SetVertical();
	}
	if(Arrangement == 'horizontal'){
		document.getElementById('arrangeBtn').innerHTML = '<i class="fa-solid fa-grip"></i>';
		SetHorizontal();
	}	
};
SetArrangement();

//Switches Arrangement Style
function SwitchArrangement(){
	if(localStorage.getItem('realtimeHTML_Arrangement') == null){
		localStorage.setItem('realtimeHTML_Arrangement', 'horizontal');
	}
	let Arrangement = localStorage.getItem('realtimeHTML_Arrangement');
	if(Arrangement == 'vertical' || Arrangement == ''){
		localStorage.setItem('realtimeHTML_Arrangement', 'horizontal');
		document.getElementById('arrangeBtn').innerHTML = '<i class="fa-solid fa-grip"></i>';
	}
	if(Arrangement == 'horizontal'){
		localStorage.setItem('realtimeHTML_Arrangement', 'vertical');
		document.getElementById('arrangeBtn').innerHTML = '<i class="fa-solid fa-grip-vertical"></i>';
	}
	SetArrangement();
}


//Compiles everything while user is typing
function compile(){
	//Send Code to Iframe
	let code = document.getElementById('codewriter').value;
	document.getElementById('resultcont').srcdoc = code;
	
	//Set Iframe Title to Parent
	var iFrame = document.getElementById('resultcont'); 
	var iFrameDoc = iFrame.contentWindow.document || iFrame.contentDocument;
	document.title = iFrameDoc.title;
	
	//Get Textarea Data size in Byte
	const textEncoder = new TextEncoder();
	document.getElementById('datasize').innerHTML = formatBytes(textEncoder.encode(code).length);
	
	//Line Counter
	let count = 0;
	const a = document.getElementById('codewriter');
	for (let i = 0; i < a.value.length; i++) {
		if (a.value[i] == '\n') {
		  count++;
		}
	}
	document.getElementById('linecount').innerHTML =  count+" Lines";

}


//Save and Autosave Functions
function SaveLocal(code){
	localStorage.setItem("code",code);
	localStorage.setItem("codeAvailable","true");
}
if(localStorage.getItem("autosaveData") != null){
	if(localStorage.getItem("autosaveData").split('-')[0] == 'true'){
		var autosaveData = localStorage.getItem("autosaveData");
		var autosaveInterval = autosaveData.split('-')[1];
		if(autosaveInterval == ''){
			var intervalId = window.setInterval(function(){
				SaveLocal(document.getElementById('codewriter').value);
			}, 2000);
		}else{
			var intervalId = window.setInterval(function(){
				SaveLocal(document.getElementById('codewriter').value);
			}, autosaveInterval);
		}
	}
}else{
	localStorage.setItem("autosaveData","true-3000");
}
function stopAutosave(){
	clearInterval(intervalId);
}






function reset(){
	document.getElementById('resultcont').innerHTML = ''; 
	document.getElementById('codewriter').value = '';
}

function font(name){
	document.getElementById('codewriter').style.fontFamily = name;
}
function fontsize(size){
	document.getElementById('codewriter').style.fontSize = size;
}
function  bgcolor(color){
	document.getElementById('codewriter').style.backgroundColor = color;
}
function  txtcolor(color){
	document.getElementById('codewriter').style.color = color;
}


//Download HTML File
function downloadFile() {
	var textdata = document.getElementById('codewriter').value; 
	var file = new Blob([textdata], {type: 'text/html'});
	var a = document.createElement("a");
	a.style.display = "none";
	a.href = URL.createObjectURL(file);
	a.download = "realtimeHTML"+Date.now()+".html";
	a.click();
	a.remove();
}


//Show or Hide Editor
function hide(){
    if(document.getElementById('codewriter').style.display == "inherit"){
		document.getElementById('codewriter').style.display = "none";
		document.getElementById('hideshownotifier').innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
	}else{
		document.getElementById('codewriter').style.display = "inherit";
		document.getElementById('hideshownotifier').innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';		
	}
};







var resizer = document.getElementById('dividerDrag');
resizer.addEventListener('mousedown', initDrag, false);
var startX, startY, startWidth, startHeight, startWidth2, startHeight2;

var editor = document.getElementById('codewriter');
var viewer = document.getElementById('resultcont');

function initDrag(e) {
	startX = e.clientX;
	startY = e.clientY;

	startWidth = parseInt(document.defaultView.getComputedStyle(editor).width, 10);
	startHeight = parseInt(document.defaultView.getComputedStyle(editor).height, 10);

	startWidth2 = parseInt(document.defaultView.getComputedStyle(viewer).width, 10);
	startHeight2 = parseInt(document.defaultView.getComputedStyle(viewer).height, 10);

	var IOArrangement = localStorage.getItem('realtimeHTML_Arrangement');
	if(IOArrangement == 'horizontal'){
	   document.documentElement.addEventListener('mousemove', doDragHorizontal, false);
	}
	if(IOArrangement == 'vertical'){
	   document.documentElement.addEventListener('mousemove', doDragVertical, false);
	}
	
	document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDragHorizontal(e) {
	if(parseInt(editor.style.height) >= 10){
		editor.style.height = (startHeight + e.clientY - startY) + 'px';
		viewer.style.height = (startHeight2 - e.clientY + startY) + 'px';
	}else{
		editor.style.height = (parseInt(editor.style.height)+1) + 'px';
		viewer.style.height = (parseInt(viewer.style.height)+1) + 'px';
	}
}

function doDragVertical(e) {
	if(parseInt(editor.style.width) >= 10){
		editor.style.width = (startWidth + e.clientX - startX) + 'px';
		viewer.style.width = (startWidth2 - e.clientX + startX) + 'px';
	}else{
		editor.style.width = (parseInt(editor.style.width)+1) + 'px';
		viewer.style.width = (parseInt(viewer.style.width)+1) + 'px';
	}
}




function stopDrag(e) {
	var IOArrangement = localStorage.getItem('realtimeHTML_Arrangement');
	if(IOArrangement == 'horizontal'){
	   document.documentElement.removeEventListener('mousemove', doDragHorizontal, false);
	}
	if(IOArrangement == 'vertical'){
	   document.documentElement.removeEventListener('mousemove', doDragVertical, false);
	}   
	document.documentElement.removeEventListener('mouseup', stopDrag, false);
}
