function barcodeGen() {
	const singleModeTextInput = document.getElementById("singleModeTextInput");
	var ready = false;
	if(singleModeTextInput.style.display=='flex'){
		data = parseInt(document.getElementById("singleBarCode").value);
		ready = data>=1000 && data<10000;
	}
	else{
		var begin = parseInt(document.getElementById("multipleBarCodeBegin").value);
		var end = parseInt(document.getElementById("multipleBarCodeEnd").value);
		ready = begin>=1000 && begin<10000 && end>=1000 && end<10000 && begin<end;
		if(ready){
			data = parseInt(document.getElementById("multipleBarCodeBegin").value);
		}
	}

	if(ready){
    	JsBarcode('#barcode', data , {

	        background : '#fff',

	        color : '#000',

	        height : 50,

	        displayValue : document.getElementById("displayNumber").checked

	    });
	    return true;
	}
	else{
		alert("Input must be between 1000 and 9999!");
		return false;
	}
}

function convertToPng() {
	const result = document.getElementById("barcode");
	if(result.src!='' && barcodeGen()){
		html2canvas(result).then(function (canvas) {			
			var anchorTag = document.createElement("a");
			document.body.appendChild(anchorTag);
			anchorTag.download = "filename.jpg";
			anchorTag.href = canvas.toDataURL();
			anchorTag.target = '_blank';
			anchorTag.click();
		});
	}
}

 async function downloadInBatch() {
 	result = document.getElementById("barcode");
	if(result.src!='' && barcodeGen()){

	 	let data = parseInt(document.getElementById("multipleBarCodeBegin").value);
	 	let end = parseInt(document.getElementById("multipleBarCodeEnd").value);

	 	let i = data;
	 	var zip = new JSZip();
	 	var img = zip.folder("images");

	 	while(i<=end){
	 		let fileName = "filename_"+i+".png";
	 		JsBarcode('#barcode', i , {background : '#fff',color : '#000',height : 30,displayValue : document.getElementById("displayNumber").checked});
			let canvas = await html2canvas(document.getElementById("barcode"))
			dataURL = canvas.toDataURL("image/png");
			dataURL = dataURL.replace("data:image/png;base64,", "");
			img.file(fileName, dataURL, {base64: true});

	 		i=i+1;
	 	}

	    zip.generateAsync({type:"blob"}).then(function(content) {
	    	saveAs(content, "Results.zip");
		});  
	}
}

 function changeMode() {
 	const mode = document.getElementById("mode").value;
 	const downloadImg = document.getElementById("downloadImg");
 	const singleModeTextInput = document.getElementById("singleModeTextInput");
	const multipleModeBegin = document.getElementById("multipleModeBegin");
	const multipleModeEnd = document.getElementById("multipleModeEnd");

	if(mode=="single"){
		downloadImg.innerHTML = "Download Image";
		downloadImg.onclick = convertToPng;
		singleModeTextInput.style.display = 'flex';
		multipleModeBegin.style.display = 'none';
		multipleModeEnd.style.display = 'none';
	}
	else{
		downloadImg.innerHTML = "Download Images";
		downloadImg.onclick = downloadInBatch;
		singleModeTextInput.style.display = 'none';
		multipleModeBegin.style.display = 'flex';
		multipleModeEnd.style.display = 'flex';
	}
 }
