    //document.getElementById('your_iframe_id').contentWindow.document.body.style.backgroundColor='yellow';

	var StorageStat = localstoragetest(true);
	var usedSpace = StorageStat[0].usedspace;
	var unusedSpace = StorageStat[0].unusedspace;
	var totalSpace = usedSpace + unusedSpace;
	var usedspacePercent = ((usedSpace*100/totalSpace));
	document.getElementById('storageStat').value = parseFloat(usedspacePercent).toFixed(2);
	document.getElementById('usedStr').innerHTML = formatBytes(usedSpace);
	document.getElementById('unusedStr').innerHTML = formatBytes(unusedSpace);
	document.getElementById('percentStr').innerHTML = parseFloat(usedspacePercent).toFixed(2)+"%";

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


	var localstorageavail;
	function localstoragetest(remaining) {
	  if (typeof(Storage) !== "undefined") {
		localstorageavail = true;
		var usedspace = JSON.stringify(localStorage).length;
		if (remaining == true) {
			var unusedspace = 0, data = "m", adddata, stored = 0;
			for (adddata = "m";;) {
			  try {
				localStorage.setItem("UN", data);
				if (stored < JSON.stringify(localStorage).length) {
				  stored = JSON.stringify(localStorage).length;
				  adddata += adddata;
				  data += adddata;
				}
				else throw "toolong";
			  } catch(e) {
			  if (adddata == "m") break;
			  else adddata = "m"; 
			  data += adddata;
			}
			}
			var totalspace = JSON.stringify(localStorage).length;
			unusedspace = totalspace - usedspace;
			localStorage.removeItem("UN");
			var returnJson = [
							 {
							  "usedspace": usedspace,
							  "unusedspace": unusedspace,
							  "log": "Success!",
							  "bool": true
							 }
							];
			return returnJson;
		}  
	  } else {
		var returnJson = [
						 {
						  "usedspace": 0,
						  "unusedspace": 0,
						  "log": "Success!",
						  "bool": false
						 }
						];
		localstorageavail = false;
		return returnJson;
	  }
	  if (localstorageavail == false) return localstorageavail;
	  else return unusedspace;
	}
	
	
	
	///////////////////////////
    //Setting function starts//
    ////////////////////////////
	settings();

    function settings(){
		
        //Sets settings for the Autosave
		var autosaveData = localStorage.getItem("realtimeHTML_autosave");
		var AutoSaveIntervalInput = document.getElementById('autosaveInterval');	
		
        var AutoSaveSettingsInput = document.getElementsByName('autosaveSwt');
        for(var j=0; AutoSaveSettingsInput.length>j; j++){
            
			if(AutoSaveSettingsInput[j].value == 'yes'){
                AutoSaveSettingsInput[j].addEventListener("click", function(){
					localStorage.setItem("realtimeHTML_autosave","true-10000");
					AutoSaveIntervalInput.removeAttribute('disabled');
					window.parent.autosaveInit();
				});
				if(autosaveData.split('-')[0] == 'true'){
					AutoSaveSettingsInput[j].setAttribute('checked', 'checked');
					AutoSaveIntervalInput.removeAttribute('disabled');
				}
            }
			
            if(AutoSaveSettingsInput[j].value == 'no'){
                AutoSaveSettingsInput[j].addEventListener("click", function(){
					window.parent.clearAutosave();
					AutoSaveIntervalInput.disabled = true;
				});
                if(autosaveData.split('-')[0] == 'false'){
                    AutoSaveSettingsInput[j].setAttribute('checked', 'checked');
					AutoSaveIntervalInput.disabled = true;
                }
            }
        }
		
		if(autosaveData.split('-')[1] != null){
			var LoadedValue = autosaveData.split('-')[1]/1000;
			for(var f=0; AutoSaveIntervalInput.length>f; f++){
				if(AutoSaveIntervalInput[f].value == LoadedValue){
					AutoSaveIntervalInput.selectedIndex = f;
				}
			}
		}
		
		
		AutoSaveIntervalInput.addEventListener("change", function(){
			var IntervalStr = "true-" + (parseInt(AutoSaveIntervalInput.value)*1000);
			localStorage.setItem("realtimeHTML_autosave", IntervalStr);
			window.parent.stopAutosave();
			window.parent.autosaveInit();
		});
    }
	
	function SetInterval(){
		
	}
    //////////////////////////
    //Setting function Ends//
    /////////////////////////