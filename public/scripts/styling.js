

var inputs = document.getElementsByTagName('input');
for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].type.toLowerCase() == 'text') {
        //alert(inputs[i].value);
		inputs[i].addEventListener("focus", activeInput);
		inputs[i].addEventListener("mouseleave", unactiveInput);
		inputs[i].addEventListener("mouseenter", activeInput);
		
    }
}
/**
 * highlights the active input
 * @param {DOMElement} e element to highlight
 */
function activeInput(e){
	
	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].type.toLowerCase() == 'text') {
			//alert(inputs[i].value);
            inputs[i].style.backgroundColor = inputSwitch();
		}
	}
    e.target.style.backgroundColor = inputHighlightSwitch();
}

/**
 * removes highlighting from currently active element
 * @param {DOMElement} e element to remove highlighting from
 */
function unactiveInput(e){
    e.target.style.backgroundColor = inputHighlightSwitch();
}
