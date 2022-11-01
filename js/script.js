//Set Vertical Orientation
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
	//editor.style.display = 'inline-block';
	editor.style.height = '548px';
	editor.style.maxHeight = '548px';
	editor.style.maxWidth = '95%';
	
	result.style.width = '49%';
	//result.style.display = 'inline-block';
	result.style.height = '550px';
	result.style.maxHeight = '550px';
	result.style.maxWidth = '95%';
	
	//document.getElementById('resizerContainer').innerHTML = '<hr id="dividerDrag" class="dividerHorizontal"/>';
}


//Set Horizontal Orientation
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
	//editor.style.display = 'inline-block';
	editor.style.height = '242px';
	editor.style.maxHeight = '500px';
	editor.style.maxWidth = '100%';
	
	result.style.width = '100%';
	//result.style.display = 'inline-block';
	result.style.height = '280px';
	result.style.maxHeight = '500px';
	result.style.maxWidth = '100%';
	
	//document.getElementById('resizerContainer').innerHTML = '<hr id="dividerDrag" class="dividerHorizontal"/>';
}

//Get Arrangement Style From LocalStorage
function SetArrangement(){
	let Arrangement = localStorage.getItem('realtimeHTML_Arrangement');
	if(Arrangement == 'vertical'){
		document.getElementById('arrangeBtn').innerHTML = '<i class="fa-solid fa-grip-vertical"></i>';
		notificator('Switched Vertical Interface!', true);
		SetVertical();
	}
	if(Arrangement == 'horizontal'){
		document.getElementById('arrangeBtn').innerHTML = '<i class="fa-solid fa-grip"></i>';
		notificator('Switched Horizontal Interface!', true);
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
	//notificator('Typing...', true);
	
}


var SavedCode = localStorage.getItem("realtimeHTML_code");
if(localStorage.getItem("realtimeHTML_codeAvailable") == 'true'){
	document.getElementById('codewriter').innerHTML = SavedCode;
	notificator('Code from previous session loaded!', false);
	//console.log('Code Loaded!');
}

var intervalId01;
autosaveInit();
//Check if autosave is set
function autosaveInit(){
	if(localStorage.getItem("realtimeHTML_autosave") != null){
		var autosaveData = localStorage.getItem("realtimeHTML_autosave");
		//Check if autosave is set true
		if(autosaveData.split('-')[0] == 'true'){
			var autosaveInterval = autosaveData.split('-')[1];
			if(autosaveInterval != '0'){
				intervalId01 = window.setInterval(function(){
					SaveLocal(document.getElementById('codewriter').value);
				}, autosaveInterval);
			}
		}
	}else{
		localStorage.setItem("realtimeHTML_autosave","true-10000");
		autosaveInit();
		console.log('Autosave Done!');
	}
}

//Save and Autosave Functions
function SaveLocal(code){
	localStorage.setItem("realtimeHTML_code",code);
	localStorage.setItem("realtimeHTML_codeAvailable","true");
	notificator('Autosave Done!', true);
}

function clearAutosave(){
	stopAutosave();
	localStorage.setItem("realtimeHTML_codeAvailable","false");
	var newData2 = localStorage.getItem("realtimeHTML_autosave").split('-')[1];
	localStorage.setItem("realtimeHTML_autosave","false-"+newData2);
	localStorage.removeItem("realtimeHTML_code");
	notificator('Autosave Stopped!', true);
	console.log('Autosave Stopped!');
}

function stopAutosave(){
	clearInterval(intervalId01);
}

//Notificator
function notificator(txt, bool){
	let elem = document.getElementById('notificationText');
	elem.innerHTML = txt;
	clearTimeout(timeoutId);
	if(bool == true){
		var timeoutId = window.setTimeout(function(){elem.innerHTML = 'I\'m Waiting...';}, 2500);
	}
}



function reset(){
	document.getElementById('codewriter').value = '';
	compile();
	notificator('Everything Got Reset!', false);
}

function font(name){
	document.getElementById('codewriter').style.fontFamily = name;
	notificator('Editor Font Switched to '+name, true);
}
function fontsize(size){
	document.getElementById('codewriter').style.fontSize = size;
	notificator('Font Size Set to '+size, true);
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
	notificator('File Downloaded!', true);
}


//Enable Tabbing on Textarea
document.addEventListener('keydown', (e) => {
    if (e.code === 'Tab') {
        e.preventDefault();

        const TAB_WIDTH = 4;

        //* Apply 1 space for every tab width
        document.execCommand('insertText', false, ' '.repeat(TAB_WIDTH));
    }
});


//Show or Hide Editor
function hide(){
	let editor = document.getElementById('codewriter');
	let result = document.getElementById('resultcont');
	let resizer = document.getElementById('resizerContainer');
	let Arrangement = localStorage.getItem('realtimeHTML_Arrangement');
	
    if(editor.style.display == "inline-block"){
		resizer.style.display = "none";
		editor.style.display = "none";
		document.getElementById('hideshownotifier').innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
		if(Arrangement == 'vertical'){
			result.style.width = "99%";
			result.style.maxWidth = "99%";
		}
		if(Arrangement == 'horizontal'){
			result.style.height = "530px";
			result.style.maxHeight = "530px";
		}	
		notificator('Editor is Hidden!', false);
	}else{
		resizer.style.removeProperty("display");
		editor.style.display = "inline-block";
		document.getElementById('hideshownotifier').innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';	
		if(Arrangement == 'vertical'){
			result.style.width = "48%";
			result.style.removeProperty("max-width");
		}
		if(Arrangement == 'horizontal'){
			result.style.height = "280px";
		}
		notificator('Editor back to normal!', false);
	}
	
}




//Load Demo File List
var xmlhttpFileList = new XMLHttpRequest();
var url = 'json/demo.json';
var out = "";
xmlhttpFileList.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) {
		var arr = JSON.parse(this.responseText);
		var i;
		var html_1 = "<option value='sample.html'>Load A Sample File</option>";
		out += html_1;
		for(i = 0; i < arr.length; i++){
			out += 	"<option value='"+arr[i].file+"'>"+arr[i].name+"</option>";
		}
	}
	document.getElementById('demos').innerHTML = out;
};
xmlhttpFileList.open("GET", url, true);
xmlhttpFileList.send();

//Load Demo File
function loadDemo(filename){
	let xmlhttpFile = new XMLHttpRequest();
	let url = 'demo/'+filename;
	xmlhttpFile.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = this.responseText;
			document.getElementById('codewriter').value = data;
			compile();
		}
	};
	xmlhttpFile.open("GET", url, true);
	xmlhttpFile.send();
	notificator('Demo File Loaded!', false);
}
	





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
	if(IOArrangement == null){
	   document.documentElement.addEventListener('mousemove', doDragHorizontal, false);
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


