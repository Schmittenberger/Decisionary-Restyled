
var nameInput = document.getElementById("TeilnehmerNameInput");
/**
* base function called to create the overview of all inputs up to now
*/
function overview() {
	//var nameSpan = document.getElementById("nameSpan");
	//var descriptionSpan = document.getElementById("descriptionSpan");

	clearTable(document.getElementById("teilnehmenTable"));

	//nameSpan.innerHTML = currentPoll.title;
	//descriptionSpan.innerHTML = currentPoll.description;

	createTableOverview(currentPoll.getAllAlternatives(), currentPoll.criterias, "teilnehmenTable");
    result = currentPoll.evaluate(); //let had to go because then saving votes to server will be 100x easier.
    tableBackgroundColor = document.getElementById("teilnehmenTable").childNodes[0].style.backgroundColor;
    document.getElementById("result").innerHTML = result.bestAlternatives.join(", ");
    if (result.decidingIndex >= 0) {
        document.getElementById("decisiveIndexSpan").style.opacity = 1;
        document.getElementById("decisiveIndex").innerHTML = currentPoll.criterias[result.decidingIndex].name;
    } else {
        document.getElementById("decisiveIndexSpan").style.opacity = 0;
        document.getElementById("decisiveIndex").innerHTML = "keins, weil es keinen klaren Gewinner gibt ";
    }

    highlightDecidingCriteria(result.decidingIndex, "teilnehmenTable", tableBackgroundColor, lighterNavActiveTeilnehmenColor);
    boldResult(result);
    $("#firstTdFirstRowTeilnehmen").css("background-color", "#e6e6e6");



}
/**
 * highlights important information to the user
 * @param {any} result result to highlight in table
 */
function boldResult(result) {
    altTdsTop = document.getElementsByClassName("alternativeTd");
    allCritCells = document.getElementsByClassName("overviewRow");
    for (var i = 0; i < result.bestAlternatives.length; i++) {

        for (var j = 0; j < currentPoll.alternatives.length; j++) {

            if (altTdsTop[j].innerHTML == result.bestAlternatives[i]) {
                
                altTdsTop[j].style.fontWeight = "bold";
                if (result.bestAlternatives.length > 1) {
                    for (var x = 0; x < allCritCells.length; x++) {
                        allCritCells[x].children[j + 1].style.fontWeight = "bold";
                    }
                }
                else {
                    
                        allCritCells[result.decidingIndex+1].children[j + 1].style.fontWeight = "bold";
                    
                }
            }
        }
    } 
}
/**
 * send the poll data to the server
 * */
function sendData() {
    //return object to the server
    //console.log(currentPoll);
    pair = { "id": currentPoll.id, "pollTitle": currentPoll.title,"name": nameInput.value, "winner": result.bestAlternatives, "alternatives": currentPoll.alternatives };
    //again misusing nodejs path wildcards to use get request in order to save up on some network capability, might result in
    //better scalability in case this ever leaves "academic project for CP"-stage, which it shouldn't do. In case it does:
    //change this.
    $.get(baseUrl + "/addvote/" + specialCharacterEncode(JSON.stringify(pair)),
        function (data, status) { });
}

/**
 * fills the overview table with alternatives and criteria
 * @param {array} altArray collection of alternatives
 * @param {array} critArray collection of criterias
 * @param {string} tableId if of table to append to
 */
function createTableOverview(altArray, critArray,tableId) {
	var FirstRow = document.createElement("tr");
    FirstRow.className = "overviewRow";

    var cell = document.createElement("td");
    cell.id = "firstTdFirstRowTeilnehmen";
	var textnode = document.createTextNode("");
	cell.appendChild(textnode);
	FirstRow.appendChild(cell); // empty first cell in first row

	for (i = 0; i < altArray.length; i++) {
		var cell = document.createElement("td");
		cell.className = "alternativeTd";
		var textnode = document.createTextNode(altArray[i]);
		cell.appendChild(textnode);
		FirstRow.appendChild(cell);
	}
	document.getElementById(tableId).appendChild(FirstRow);

	for (i = 0; i < critArray.length; i++) {
        var row = document.createElement("tr");
        row.className = "overviewRow";
		var cell2 = document.createElement("td");
		cell2.className = "critTdTable";

		textnode2 = document.createTextNode(critArray[i].name);

		cell2.appendChild(textnode2);
		row.appendChild(cell2);

		for (j = 0; j < altArray.length; j++) {
			var cellALT = document.createElement("td");

            convertedRating = ratingNamesWords[ratingNames.indexOf(critArray[i].values[j])];
            textnodeALT = document.createTextNode(convertedRating);
			cellALT.className = "rateTd";

			cellALT.appendChild(textnodeALT);
			row.appendChild(cellALT);
        }


		document.getElementById(tableId).appendChild(row);
	}
}
/**
 * highlights the decisive row
 * @param {int} index of the criteria that was decisive in the evaluation
 * @param {string} tableId of the table to work on
 * @param {string} defaultColor background color
 * @param {string} highlightColor highlights
 */

function highlightDecidingCriteria(index, tableId, defaultColor,highlightColor) {
    rows = document.getElementById(tableId).childNodes;
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = defaultColor;
    }

    if (index >= 0) { // catch -1 aka undecisive
        rows[index + 1].style.backgroundColor = highlightDecisiveSwitch();
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

function hideHint(id) {
	$("#" + id).css("visibility", "hidden");
}
