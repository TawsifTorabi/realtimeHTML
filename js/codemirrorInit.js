var myTextarea = document.getElementById("codewriter");

		// Initialize CodeMirror instance
		var editor = CodeMirror.fromTextArea(myTextarea, {
		  mode: "htmlmixed",
		  lineNumbers: true,
		  theme: "default",
		  lineWrapping: true
		});

		// Set initial content
		editor.setValue('');
		
		editor.on("keyup", function (cm, event) {
		  compile();
		});
		
		// Get the content of the editor
		var code = editor.getValue();
		console.log(code);
		
		function changeFontSize(){
			// Retrieve elements with the specified class name
			var elements = document.getElementsByClassName("CodeMirror");

			// Iterate through the elements and change the font size
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.fontSize = "17px"; // Set the desired font size
			}
		}

	  var input = document.getElementById("select");
	  function selectTheme() {
		var theme = input.options[input.selectedIndex].textContent;
		localStorage.setItem("realtimeHTML_editorTheme",theme);
		editor.setOption("theme", theme);
		location.hash = "#" + theme;
	  }

	  function LoadTheme(){
		var theme;
	  	if(localStorage.getItem("realtimeHTML_editorTheme") != ''){
			theme = localStorage.getItem("realtimeHTML_editorTheme");
			location.hash = "#" + theme;
			editor.setOption("theme", theme);
		}
	  }
	  var choice = (location.hash && location.hash.slice(1)) ||
				   (document.location.search &&
					decodeURIComponent(document.location.search.slice(1)));
	  if (choice) {
		input.value = choice;
		editor.setOption("theme", choice);
	  }
	  CodeMirror.on(window, "hashchange", function() {
		var theme = location.hash.slice(1);
		if (theme) { input.value = theme; selectTheme(); }
	  });