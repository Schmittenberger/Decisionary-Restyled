
createTableRating(currentPoll.getAllCriterias(), ratingNames, "alternativeRatingTable");
var currentAlternative = 0;
var inputRatingClassName = "ratingRadioInput";
var currentAlternativeAssertClicked = false;

/**
 * creates the table to rate each alternative
 * @param {array} critArray array of criterias
 * @param {array} ratingNames containing he simplified names for our ABX-Algorithm
 * @param {string} tableId of the table to append to
 */
function createTableRating(critArray, ratingNames, tableId) {
    for (i = 0; i < critArray.length; i++) {
        var row = document.createElement("tr");
        row.className = "ratingRowClass";
        var cellCritName = document.createElement("td");
        cellCritName.className = "critTd"
        var textnode = document.createTextNode(critArray[i]);
        cellCritName.appendChild(textnode);
        row.appendChild(cellCritName);

        for (j = 0; j < ratingNames.length; j++) {
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
            };
            newInput.onchange= function () {
                radioColoring();
            };
            newLabel.onmouseenter = function () {
                ratingLabelHoverIn(this);
            };
            newLabel.onmouseleave = function () {
                ratingLabelHoverOut(this, this.childNodes[0].checked);
            };

            newLabel.appendChild(newInput);

            newDescriptor = document.createElement('i');

            newDescriptor.innerHTML = ratingNames[j]
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
        rLabels[i].style.color = "black";
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
        rLabels[i].style.color = "black";
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
    document.getElementById("curAlt").innerHTML = (currentAlternative + 1) + " / " + currentPoll.alternatives.length;
    document.getElementById("currentAlternativeSpan").innerHTML = currentPoll.getAllAlternatives()[currentAlternative];
    clearRatings();
    loadRatings();
    radioColoring();
}
/**
 * move to the previous alternative rating
 */
function backAlternative() {
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
        parent.style.backgroundColor = activeRadioColor;
    }
    passiveRadioColoring();
}

function ratingLabelHoverIn(elem) {
    elem.style.backgroundColor = hoverRadioColor // - irgendein wert, ein wenig transparenters;
}

function ratingLabelHoverOut(elem,state) {
    if (state == true) elem.style.backgroundColor = activeRadioColor;
    if (state == false) elem.style.backgroundColor = passiveRadioColor;
}

function radioColoring() {
    inputs = document.getElementsByClassName("ratingRadioInput");
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked == false) {
            inputs[i].parentElement.style.backgroundColor = passiveRadioColor;
        } else {
            inputs[i].parentElement.style.backgroundColor = activeRadioColor;
        }
    }
    
}