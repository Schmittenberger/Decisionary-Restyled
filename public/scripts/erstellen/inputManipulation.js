var originalBtnPos; // save the original position of the add input button

/**
 * adds a new input
 * @param {string} type name of the input type
 */
function addInput(type) {
	if (type == "Alt" || type == "Crit") {
        if (type == "Alt" && altCounter < maxAlternatives) {
            toPrepend = createInput(type);
            //document.getElementById(alternativesContainer).lastChild.prepend(toPrepend);
            //document.getElementById("lastAltRow").parentNode.prepend(toPrepend);
            e = document.getElementById("lastAltRow").parentNode;
            e.insertBefore(toPrepend, e.lastChild);

            //document.getElementById(alternativesContainer).appendChild(createInput(type));
			//$("#" + alternativesContainer).prev().after(createInput(type));
            c = document.getElementById(alternativesContainer).childNodes[0].childNodes;
			if (altCounter > minAlternatives) {
				c[c.length - 2].childNodes[1].childNodes[0].focus();
			} else {
                c[0].childNodes[1].childNodes[0].focus();
            }

			currentPoll.addAlternative("");
		}
        if (type == "Crit" && critCounter < maxCriterias) {
            toPrepend = createInput(type);
            e = document.getElementById("lastCritRow").parentNode;
            e.insertBefore(toPrepend, e.lastChild);

            c = document.getElementById(criteriasContainer).childNodes[0].childNodes;
			if (critCounter > minCriterias) { // very specific element to focus
                c[c.length - 2].childNodes[1].childNodes[0].focus();
			} else {
                c[0].childNodes[1].childNodes[0].focus();
			}

			currentPoll.addCriteria("");
		}
	}
	else {
		console.log("invalid type for adding input");
	}
}

/**
 * removed a specific div containing an input
 * and moves all other elements up
 * @param {string} div Id to be removed
 */
function removeSpecificInput(divId) {
	var divToBeRemoved = document.getElementById(divId);
	if (divId.includes(altId) && altCounter > minAlternatives) {
		
		var index = divId.replace(altId, '');
		altCounter--;
		divToBeRemoved.remove();
		currentPoll.removeAlternative(index);
        var container = document.getElementById('alternativesContainer').childNodes[0].childNodes;
		for (let i = 0; i < (container.length-1); i++) {
			// change id of remaining inputs to new position
			const element = container[i];
			var elementIndex = element.id.replace(altId, '');
			if (elementIndex > index) {
				element.id = altId + (elementIndex - 1);
			}
		}
		updateSpanNumbers("AlternativeSpanNumber");
	}
	if (divId.includes(critId) && critCounter > minCriterias) {
		
		var index = divId.replace(critId, '');
		critCounter--;
		divToBeRemoved.remove();
		currentPoll.removeCriteria(index);
        var container = document.getElementById('criteriasContainer').childNodes[0].childNodes;
        for (let i = 0; i < (container.length - 1); i++) {
			// change id of remaining inputs to new position
			const element = container[i];
			var elementIndex = element.id.replace(critId, '');
			if (elementIndex > index) {
				element.id = critId + (elementIndex - 1);
			}
		}
		updateSpanNumbers("CriteriaSpanNumber");
	}

	if (critCounter < maxCriterias) {
		showBtn(document.getElementById("addCriteriaButton"));
	}
	if (altCounter < maxAlternatives) {
		showBtn(document.getElementById("addAlternativeButton"));
	}

}

/**
 * updates numbering after removing an input
 * @param {String} name of the span class
 */
function updateSpanNumbers(span){
	var spans = document.getElementsByClassName(span);
	
	for (let i = 0; i < spans.length; i++) {
		spans[i].innerHTML = i+1;
	}
}

/**
 * creates a new input
 * @param {string} type name of the input type
 */
function createInput(type) {

	var newInputRow = document.createElement('tr');
	var typeTextTd = document.createElement('td');
	var typeTextSpan = document.createElement('div');
    var newSpanNumber = document.createElement('span');
    var inputTd = document.createElement('td');
    var newInput = document.createElement('input');
    var buttonTd = document.createElement('td');
    var newInputDeleteBtn = document.createElement('img');
    newInputDeleteBtn.src = "icons/Minus.svg";
	
	var index;

	if (type == "Alt") {
		index = altCounter++;
		if(index == 0){
			newInput.placeholder = "erste Alternative";
		}
		tempString = "Alternative";
		newInput.className = "AlternativeInputs";
		newInputRow.className = "Alternative";
		newSpanNumber.className = "AlternativeSpanNumber";
		newInputRow.id = "alt" + index;
		newInputDeleteBtn.id = "removeAlternativeBtn";
		newInputDeleteBtn.onclick = function () {
			removeSpecificInput(newInputRow.id);
        };

        newInput.addEventListener('keydown', function (event) {
            if (event.code == 'Enter') {
                addInput("Alt");
            }
        });

		if (altCounter >= maxAlternatives) {
			hideBtn(document.getElementById("addAlternativeButton"));
		}
    }

	if (type == "Crit") {
		index = critCounter++;
		tempString = "Kriterium";
		newInput.className = "CriteriaInputs";
		newInputRow.className = "Criteria";
		newSpanNumber.className = "CriteriaSpanNumber";
		newInputRow.id = "crit" + index;
		newInputDeleteBtn.id = "removeCriteriaBtn";
		newInputDeleteBtn.onclick = function () {
			removeSpecificInput(newInputRow.id);
        };

        newInput.addEventListener('keydown', function (event) {
            console.log("typing m8");
            if (event.code == 'Enter') {
                addInput("Crit");
            }
        });

		if (critCounter >= maxCriterias) {
			hideBtn(document.getElementById("addCriteriaButton"));
        }
    }

	newInputDeleteBtn.className = "removeBtn plusMinusButtons";
	typeTextSpan.className +="inputH3";
    newSpanNumber.className += " SpanNumber";
    inputTd.className = "inputTd";
    typeTextTd.className = "typeTextTd";

	newInput.addEventListener("focus", activeInput); 
	newInput.addEventListener("mouseleave", unactiveInput); 
	newInput.addEventListener("mouseenter", activeInput);


	newInput.addEventListener("input", onUpdateInput);
	typeTextSpan.innerHTML = tempString;
	newSpanNumber.innerHTML = (index+1);
	//typeTextTd.appendChild(newSpanNumber);
    //typeTextTd.appendChild(newInput);

    typeTextTd.appendChild(typeTextSpan);
    typeTextTd.appendChild(newSpanNumber);
    newInputRow.appendChild(typeTextTd);

    inputTd.appendChild(newInput);
    newInputRow.appendChild(inputTd);

    if (newInputRow.className == "Criteria" && critCounter > minCriterias || newInputRow.className == "Alternative" && altCounter > minAlternatives) {
        buttonTd.appendChild(newInputDeleteBtn);
    }
    else {
        buttonTd.innerHTML = "";
    }
    newInputRow.appendChild(buttonTd);
	newInputRow.className += " inputDiv";
	

	return newInputRow;
}

/**
 * hides an object
 * @param {DOMElement} Element to hide
 */
function hideBtn(Btn) {
	//Btn.style.visibility = "hidden";
	// the button can not be hidden using the visibilty property because of using views
	// it caused the button to be still visible even in other views/steps after showing it again
	//move the button out of the render area to make it unclickable
	Btn.style.opacity = 0;
	originalBtnPos = Btn.style.left;
	Btn.style.left="-500px";

}
/**
 * shows a hidden object
 * @param {DOMElement} Element to show
 */
function showBtn(Btn) {
	//Btn.style.visibility = "visible";
	Btn.style.opacity = 1;
	Btn.style.left = originalBtnPos;
}

/**
 * reacting to the input changed event
 * @param {event} e input changed event arguments
 */
function onUpdateInput(e) {
	var input = e.target.value;
	var parent = e.target.parentElement.parentElement;
	var idx;
	if (parent.className.includes("Alternative")) {
		idx = parent.id.replace(altId, "");
		currentPoll.alternatives[idx] = input;
	}
	if (parent.className.includes("Criteria")) {
		idx = parent.id.replace(critId, "");
		currentPoll.criterias[idx].name = input;
	}
}