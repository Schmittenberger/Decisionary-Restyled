/**
 * adds a new input
 * @param {string} type name of the input type
 */
function addInput(type) {
	if(type == "Alt" || type == "Crit") {
		if(type == "Alt" && altCounter < maxAlternatives) {
			document.getElementById(alternativesContainer).appendChild(createInput(type));
			currentPoll.addAlternative("");
		}
		if(type == "Crit" && critCounter < maxCriterias) {
			document.getElementById(criteriasContainer).appendChild(createInput(type))
			currentPoll.addCriteria("");
		}
	}
	else{
		console.log("invalid type for adding input");
	}
}

/**
 * removes an input
 * @param {string} type name of the input type
 */
function removeInput(type) {
	if(type == "Alt" || type == "Crit"){
		removeElement = false;
		//only remove inputs if there are more then the minimum left
		if(type == "Alt" && altCounter > minAlternatives){
			var tempString = altId + altCounter;
			altCounter--;
			removeElement = true;
		}
		if(type == "Crit" && critCounter > minCriterias){
			var tempString = critId + critCounter;
			critCounter--;
			removeElement = true;
		}
		if(removeElement){
			var toBeRemoved = document.getElementById(tempString);
			toBeRemoved.parentNode.removeChild(toBeRemoved);
		}
	}
}

/**
 * removed a specific div containing an input
 * and moves all other elements up
 * @param {string} div Id to be removed
 */

function removeSpecificInput(divId){
	var divToBeRemoved = document.getElementById(divId);
	divToBeRemoved.remove();
}

/**
 * creates a new input
 * @param {string} type name of the input type
 */
function createInput(type) {
	
	var newInputDiv = document.createElement('div');
	var newInputH3 = document.createElement('h3');
	var newInput = document.createElement('input');
	var newInputDeleteBtn = document.createElement('button');
	newInputDeleteBtn.innerHTML = "X";
	var displayIndex;
	
	if(type == "Alt") {
		displayIndex = ++altCounter
		tempString = "Alternative " + displayIndex + " " ;
		newInput.className = "AlternativeInputs";
		newInputDiv.className = "Alternative";
		newInputDiv.id = "alt" + displayIndex;
		newInputDeleteBtn.id = "removeAlternativeBtn";
		newInputDeleteBtn.onclick = function() { 
			removeSpecificInput(newInputDiv.id);
			currentPoll.removeAlternative(displayIndex - 1);
		};
	}
	if (type == "Crit") {
		displayIndex = ++critCounter;
		tempString = "Kriterium " + displayIndex + " " ;
		newInput.className = "CriteriaInputs";
		newInputDiv.className = "Criteria";
		newInputDiv.id = "crit" + displayIndex;
		newInputDeleteBtn.id = "removeCriteriaBtn";
		newInputDeleteBtn.onclick = function() { 
			removeSpecificInput(newInputDiv.id);
			currentPoll.removeCriteria(displayIndex - 1);
		};
	}
	newInputDeleteBtn.className = "removeBtn";
	newInput.addEventListener("input", onUpdateInput);
	newInputH3.innerHTML = tempString;
	newInputH3.appendChild(newInput);
	newInputH3.appendChild(newInputDeleteBtn);
	newInputDiv.appendChild(newInputH3);
	
	return newInputDiv;
}

/**
 * reacting to the input changed event
 * @param {event} e input changed event arguments
 */
function onUpdateInput(e) {
	var input = e.target.value;
	var parent = e.target.parentElement.parentElement;
	var idx;
	if (parent.className == "Alternative") {
		idx = parent.id.replace(altId, "") - 1;
		currentPoll.alternatives[idx] = input;
	} 
	if (parent.className == "Criteria") {
		idx = parent.id.replace(critId, "") - 1;
		currentPoll.criterias[idx].name = input;
	}
}