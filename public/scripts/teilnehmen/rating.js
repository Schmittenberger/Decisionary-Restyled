
createTableRating(currentPoll.getAllCriterias(), ratingNamesWords, "alternativeRatingTable");
var currentAlternative = 0;
var inputRatingClassName = "ratingRadioInput";
var currentAlternativeAssertClicked = false;

/**
 * creates the table to rate each alternative
 * @param {array} critArray array of criterias
 * @param {array} ratingNames containing he simplified names for our ABX-Algorithm
 * @param {string} tableId of the table to append to
 */
function createTableRating(critArray, ratingNamesWords, tableId) {
    for (i = 0; i < critArray.length; i++) {
        var row = document.createElement("tr");
        row.className = "ratingRowClass";
        var cellCritName = document.createElement("td");
        var cellCritNameSpan = document.createElement("span");
        cellCritName.className = "critTd"
        cellCritNameSpan.className = "critTdSpan"
        var textnode = document.createTextNode(critArray[i]);

        cellCritNameSpan.appendChild(textnode);
        cellCritName.appendChild(cellCritNameSpan);
        row.appendChild(cellCritName);

        for (j = 0; j < ratingNamesWords.length; j++) {
            var cell = document.createElement("td");
            cell.className = "ratingTd";
            newLabel = document.createElement('label');
            newLabel.className = "radioLabel";

            newInput = document.createElement('input');
            newInput.type = "radio";
            newInput.className = "ratingRadioInput";
            tmpInputName = i;
            newInput.name = tmpInputName;
            newInput.value = critArray[i];
            newInput.setAttribute('data-rating', j);
            newInput.onclick = function () {
                //alert(this.name + "" + this.getAttribute('data-rating'));
                rateAlternative(this.name, this.getAttribute('data-rating'));
                if (resFlag) {
                    console.log("rerate after res");
                    overview();
                }
                if (currentAlternative == currentPoll.alternatives.length - 1) {
                    lastAltRatedUnlock();
                }
            };
            newInput.onchange= function () {
                radioColoring();
            };
            cell.onmouseenter = function () {
                ratingLabelHoverIn(this);
            };
            cell.onmouseleave = function () {
                ratingLabelHoverOut(this, this.childNodes[0].childNodes[0].checked);
            };

            newLabel.appendChild(newInput);

            newDescriptor = document.createElement('i');

            newDescriptor.innerHTML = ratingNamesWords[j]
            newLabel.appendChild(newDescriptor);

            cell.appendChild(newLabel);

            row.appendChild(cell);
        }
        document.getElementById(tableId).appendChild(row);
        
    }
}

/**
 * rates an alternative acording to a criteria
 * @param {int} critNumber the number of the criteria to rate
 * @param {int} ratingNames the rating to give the criteria
 */
function rateAlternative(critNumber, rating) {
    currentPoll.criterias[critNumber].values[currentAlternative] = ratingNames[rating];
    if (currentAlternativeAssertClicked == true) {
        recolorAfterRatingIfMarked();
    }
}
/**
 * debug function to automatically randomly rate everything
 * */
function debugRandomRate() {
    for (var i = 0; i < currentPoll.alternatives.length; i++) {
        for (var j = 0; j < currentPoll.criterias.length; j++) {
            randomRated = Math.floor(Math.random() * 3);
            currentPoll.criterias[j].values[i] = ratingNames[randomRated];
        }
    }
}

/**
 * clear all ratings when moving to the next/previous alternative
 */
function clearRatings() {
    var inputs = document.getElementsByClassName("ratingRadioInput");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
}

/**
 * load ratings when moving to the next/previous alternative
 */
function loadRatings() {
    for (i = 0; i < currentPoll.criterias.length; i++) {
        currentPoll.criterias[i].values
        if (currentPoll.criterias[i].values[currentAlternative] != null) {
            rateNumber = ratingNames.indexOf(currentPoll.criterias[i].values[currentAlternative]);
            $('input[name=' + i + ']')[rateNumber].checked = true; // excuse my jquery here but it's the easiest way to check a specific radio btn
            }
    }
}

/**
 * if the inputs have been marked as still to rate, then update the coloring after each click
 * reverting the color of already rated inputs
 * */
function recolorAfterRatingIfMarked() {
    rateH = document.getElementById("rateHint");
    rLabels = document.getElementsByClassName("radioLabel");
    for (i = 0; i < rLabels.length; i++) {
        //rLabels[0].style.outline = "inital";
        rLabels[i].style.color = ratingReturnSwitch();
    }
    unvalidatedViewAlternative();
}

/**
 * check if all alternatives/criteria have been rated before moving to the next one
 */
function validateAllInputsAlternative() {
    rateH = document.getElementById("rateHint");
    hideHints(rateH);


    rLabels = document.getElementsByClassName("radioLabel");
    for (i = 0; i < rLabels.length; i++) {
        //rLabels[0].style.outline = "inital";
        rLabels[i].style.color = ratingReturnSwitch();
    }
    res = true;
    for (i = 0; i < currentPoll.criterias.length; i++) {
        //console.log(i+"|"+currentPoll.criterias[i].values[currentAlternative]);
        if (currentPoll.criterias[i].values[currentAlternative] == null) {
            //console.log("not empty: " + currentPoll.criterias[i].values[currentAlternative]);
            res = false;
            showHints(rateH);
        }
    }
    return res;
}
/**
 * instructions to do when not all rated
 */
function unvalidatedViewAlternative() {
    currentAlternativeAssertClicked = true;
    ratingRows = document.getElementsByClassName("ratingRowClass");
    for (i = 0; i < currentPoll.criterias.length; i++) {
        if (currentPoll.criterias[i].values[currentAlternative] == null) {
            //ratingRows[i].style.backgroundColor = "red";
            for (j = 1; j < 4; j++) {
                //ratingRows[i].childNodes[j].childNodes[0].style.outline = "1px solid red";
                ratingRows[i].childNodes[j].childNodes[0].style.color = " red";
            }
        }
    }
    
}

/**
 * move to the next alternative rating
 */
function nextAlternative() {
    currentAlternative++;
    updateAlternativeHUD();
    currentAlternativeAssertClicked = false;
}
/**
 * updates the alternative name and number
 */
function updateAlternativeHUD() {
    document.getElementById("curAlt").innerHTML = "(" + (currentAlternative + 1) + " / " + currentPoll.alternatives.length + ")";
    document.getElementById("currentAlternativeSpan").innerHTML = currentPoll.getAllAlternatives()[currentAlternative];
    if (currentAlternative >= currentPoll.alternatives.length-1) {
        document.getElementById("navNext").style.visibility = "hidden";
    } else {
        document.getElementById("navNext").style.visibility = "visible";
    }
    if (currentAlternative == 0) {
        document.getElementById("navBack").style.visibility = "hidden";
    } else {
        document.getElementById("navBack").style.visibility = "visible";
    }
    clearRatings();
    loadRatings();
    radioColoring();
}
/**
 * move to the previous alternative rating
 */
function backAlternative() {
    rLabels = document.getElementsByClassName("radioLabel");
    for (i = 0; i < rLabels.length; i++) {
        rLabels[i].style.color = "black";
    }
    currentAlternative--;
    updateAlternativeHUD();
}

/**
 * color active radio
 * @param {DOMElement} thisRadio active radio
 * @param {DOMElement} parent the label to color
 */
function radioChangeState(thisRadio, parent) {
    // it is actually always true but checking anyway
    if (thisRadio.checked == true) {

        parent.style.backgroundColor = activeRatingSwitch();
        parent.parentElement.style.backgroundColor = activeRatingSwitch();
    }
    passiveRadioColoring();
}
/**
 * on hover over event for the labels containing the rating possibilities
 * changes background color
 * @param {DOMelement} elem DOMelement to modifiy
 */
function ratingLabelHoverIn(elem) {
    //elem.style.backgroundColor = hoverRadioColor // - irgendein wert, ein wenig transparenters;
    elem.style.backgroundColor = hoverRatingSwitch(); 
}
/**
 * inverse to ratingLabelHoverIn
 * @param {DOMelement} elem element to modify
 * @param {boolean} state true or false
 */
function ratingLabelHoverOut(elem,state) {
    if (state == true) elem.style.backgroundColor = activeHoverSwitch();
    if (state == false) elem.style.backgroundColor = passivHoverSwitch();
}
/**
 * changes background color of cells in the rating table when click
 * */
function radioColoring() {
    inputs = document.getElementsByClassName("ratingRadioInput");
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked == false) {
            //inputs[i].parentElement.style.backgroundColor = passiveRadioColor;
            inputs[i].parentElement.parentElement.style.backgroundColor = passivHoverSwitch();
        } else {
            //inputs[i].parentElement.style.backgroundColor = activeRadioColor;
            inputs[i].parentElement.parentElement.style.backgroundColor = activeHoverSwitch();// color the cell not just the input
        }
    }
    
}

function lastAltRatedUnlock() {
    var res = true;
    for (i = 0; i < currentPoll.criterias.length; i++) {
        if (currentPoll.criterias[i].values[currentPoll.alternatives.length-1] == null) {
            res = false;
        }
    }
    if (res) {
        unlockView("resUnlock");
    }
}