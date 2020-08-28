/**
* base function called to create the overview of all inputs up to now
*/
function overview() {
	
	var descriptionSpan = document.getElementById("descriptionSpan");

	showHints(document.getElementById("overviewHint"));

	clearTable(document.getElementById("combinedTable"));
    var nameSpan = document.getElementById("nameSpan");
    //currentPoll.title = document.getElementById('NameInput').value;
    nameSpan.innerHTML = document.getElementById('NameInput').value;
    if (descriptionSpan.innerHTML == "") {
        descriptionSpan.innerHTML = " nicht vorhanden";
        descriptionSpan.style.fontStyle = "italic";
    }
    else {
        descriptionSpan.innerHTML = " " + currentPoll.description;
        descriptionSpan.style.fontStyle = "normal";

    }
    clearPoll();
    fillPoll();

	createTableOverview(currentPoll.getAllAlternatives(), currentPoll.getAllCriterias());
}

function updatedTitle(){
    var nameSpan = document.getElementById("nameSpan");
    nameSpan.innerHTML = document.getElementById('NameInput').value;
}
/**
 * clear poll alternatives and criterias before filling them up again
 * */
function clearPoll() {
    currentPoll.alternatives = [];
    currentPoll.criterias = [];
}

/**
 * fill poll object with data from the inputs
 * */
function fillPoll() {
    alternativeInputs = document.getElementsByClassName("AlternativeInputs");
    criteriaInputs = document.getElementsByClassName("CriteriaInputs");

    for (var i = 0; i < alternativeInputs.length; i++) {
        currentPoll.addAlternative(alternativeInputs[i].value);
    }
    for (var i = 0; i < criteriaInputs.length; i++) {
        currentPoll.addCriteria(criteriaInputs[i].value);
    }
}

/**
 * fills the overview table with alternatives and criteria
 * @param {array} altArray collection of alternatives
 * @param {array} critArray collection of criterias
 */
function createTableOverview(altArray, critArray) {
	var FirstRow = document.createElement("tr");

	var cell = document.createElement("td");
	var textnode = document.createTextNode("");
	cell.appendChild(textnode);
	FirstRow.appendChild(cell);

	for (i = 0; i < altArray.length; i++) {
		var cell = document.createElement("td");
		var textnode = document.createTextNode(altArray[i]);
		cell.appendChild(textnode);
		FirstRow.appendChild(cell);
	}
	document.getElementById("combinedTable").appendChild(FirstRow);

	for (i = 0; i < critArray.length; i++) {
		var row = document.createElement("tr");
		var cell2 = document.createElement("td");
		textnode2 = document.createTextNode(critArray[i]);
        cell2.className = "overviewCritRight";
		cell2.appendChild(textnode2);
		row.appendChild(cell2);

		for (j = 0; j < altArray.length; j++) {
			var cellT = document.createElement("td");
			row.appendChild(cellT);
		}



		document.getElementById("combinedTable").appendChild(row);
	}
}

/**
 * used to clear a table
 * @param {DOMElement} table element
 */
function clearTable(table) {
	while (table.childNodes.length > 0) {
		table.removeChild(table.lastChild);
	}
}
