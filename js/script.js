var splitInstance;
//Set Vertical Orientation
function SetVertical(){

	console.log('vertical settt');
	// Remove Old Gutters
	var gutters = document.getElementsByClassName("gutter");

	// Iterate through the elements and remove
	for (var i = 0; i < gutters.length; i++) {
	  gutters[i].remove(); // Set the desired font size
	}

	//let container = document.querySelector('.content');
	//let splitContent = document.querySelector('.content').innerHTML;
    //container.innerHTML = splitContent;
	splitInstance = Split(['.a', '.b'], {
		gutterSize: 5,
		direction: 'vertical',
		sizes: [50, 43]
	});
	
	// Retrieve elements with the specified class name
	var gutter = document.getElementsByClassName("gutter")[0];
	gutter.style.cursor = "s-resize"; // Set the desired font size


	// Retrieve elements with the specified class name
	var content = document.getElementsByClassName("content")[0];
	content.style.display = "inline"; // Set the desired font size




	// Retrieve elements with the specified class name
	var elements = document.getElementsByClassName("split");

	// Iterate through the elements and change the font size
	for (var i = 0; i < elements.length; i++) {
	  elements[i].style.height = "45%"; // Set the desired font size
	  elements[i].style.width = ""; // Set the desired font size
	}	
	//editorContainer.style.height = '';
	
}


//Set Horizontal Orientation
function SetHorizontal(){
	console.log('horizontal settt');
	// Remove Old Gutters
	var gutters = document.getElementsByClassName("gutter");

	// Iterate through the elements and remove
	for (var i = 0; i < gutters.length; i++) {
	  gutters[i].remove(); // Set the desired font size
	}

	//let container = document.querySelector('.content');
	//let splitContent = document.querySelector('.content').innerHTML;
	//container.innerHTML = splitContent;
	splitInstance = Split(['.a', '.b'], {
		gutterSize: 5,
		direction: 'horizontal',
		sizes: [50, 50]
	});
	
	
	// Retrieve elements with the specified class name
	var gutter = document.getElementsByClassName("gutter")[0];
	gutter.style.cursor = "e-resize"; // Set the desired font size


	// Retrieve elements with the specified class name
	var content = document.getElementsByClassName("content")[0];
	content.style.display = "flex"; // Set the desired font size
	
	
	// Retrieve elements with the specified class name
	var elements = document.getElementsByClassName("split");

	// Iterate through the elements and change the font size
	for (var i = 0; i < elements.length; i++) {
	  elements[i].style.width = ""; // Set the desired font size
	  elements[i].style.height = "98%";
	  
	}	
	//editorContainer.style.height = '';
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

	if(Arrangement == ''){
		document.getElementById('arrangeBtn').innerHTML = '<i class="fa-solid fa-grip"></i>';
		//SetHorizontal();
		SetVertical();
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
	//let code = document.getElementById('codewriter').value;
	let code = editor.getValue();
	document.getElementById('resultcont').srcdoc = code;
	
	//Set Iframe Title to Parent
	//var iFrame = document.getElementById('resultcont'); 
	//var iFrameDoc = iFrame.contentWindow.document || iFrame.contentDocument;
	//document.title = iFrameDoc.title;
	
	//Get Textarea Data size in Byte
	const textEncoder = new TextEncoder();
	document.getElementById('datasize').innerHTML = formatBytes(textEncoder.encode(code).length);
	
	//Line Counter
	let count = 0;
	const a = document.getElementById('codewriter');
	for (let i = 0; i < code.length; i++) {
		if (code[i] == '\n') {
		  count++;
		}
	}
	document.getElementById('linecount').innerHTML =  count+" Lines";
	//notificator('Typing...', true);	
}


var SavedCode = localStorage.getItem("realtimeHTML_code");
if(localStorage.getItem("realtimeHTML_codeAvailable") == 'true'){
	editor.setValue(SavedCode);
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
					SaveLocal(editor.getValue());
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
	editor.setValue('');
	compile();
	notificator('Everything Got Reset!', false);
}

function font(name){

	// Retrieve elements with the specified class name
	var elements = document.getElementsByClassName("CodeMirror");

	// Iterate through the elements and change the font size
	for (var i = 0; i < elements.length; i++) {
	  elements[i].style.fontFamily = name; // Set the desired font size
	}
	notificator('Editor Font Switched to '+name, true);
	
}

function fontsize(size){
	// Retrieve elements with the specified class name
	var elements = document.getElementsByClassName("CodeMirror");

	// Iterate through the elements and change the font size
	for (var i = 0; i < elements.length; i++) {
	  elements[i].style.fontSize = size; // Set the desired font size
	}
	notificator('Font Size Set to '+size, true);
}



//Download HTML File
function downloadFile() {
	var textdata = editor.getValue(); 
	var file = new Blob([textdata], {type: 'text/html'});
	var a = document.createElement("a");
	a.style.display = "none";
	a.href = URL.createObjectURL(file);
	a.download = "realtimeHTML"+Date.now()+".html";
	a.click();
	a.remove();
	notificator('File Downloaded!', true);
}
var outputStyle;
//fullscreen output
function fullscreen(){
	outputStyle = document.getElementById('iframecontainer').style;
	document.getElementById('iframecontainer').style = `
			/*display: none;*/
			position: fixed;
			top: 0px;
			bottom: 0px;
			right: 0px;
			width: 100%;
			border: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			z-index: 999999;
			height: 100%;
		  `;
	closeBtn.style.display = "inherit";
}

//Show or Hide Editor
function hide(){
	let editor = document.getElementById('editorContainer');
	let result = document.getElementById('resultcont');
	let Arrangement = localStorage.getItem('realtimeHTML_Arrangement');
	
    if(editor.style.display == "inline-block"){
		//Hide Editor
		editor.style.display = "none";
		document.getElementsByClassName('gutter')[0].style.display = 'none';
		document.getElementById('hideshownotifier').innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
		//document.getElementById('iframecontainer').style.width = '110%';
		if(Arrangement == 'vertical'){
			result.style.width = "99%";
			result.style.maxWidth = "99%";
		}
		if(Arrangement == 'horizontal'){
			result.style.height = "90vh";
			result.style.maxHeight = "90vh";
		}	
		notificator('Editor is Hidden!', false);
	}else{
		//Show Editor
		editor.style.display = "inline-block";
		document.getElementsByClassName('gutter')[0].style.display = 'inherit';
		document.getElementById('hideshownotifier').innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';	
		document.getElementById('iframecontainer').style.width = 'calc(50% - 2.5px)';
		if(Arrangement == 'vertical'){
			result.style.width = "99%";
		}
		if(Arrangement == 'horizontal'){
			result.style.height = "90vh";
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
			editor.setValue(data);
			compile();
		}
	};
	xmlhttpFile.open("GET", url, true);
	xmlhttpFile.send();
	notificator('Demo File Loaded!', false);
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


