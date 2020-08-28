/**
 * move to the next view
 */

function next(flag) {
    if (flag == "titleUnlock") {
        if (titleFlag == false) {
            titleFlag = true;
            currentView += 1;
            showView(document.getElementById(schritte[currentView]));

            specificViewChanges(currentView);
            document.getElementById("NameInput").focus();
            modifyData(0);
            
        }
        return;
    }
    if (flag == "altUnlock") {
        if (altViewFlag == false) {
            altViewFlag = true;
            currentView += 1;
            showView(document.getElementById(schritte[currentView]));
            specificViewChanges(currentView);
            
            window.location = "#critJump";
            document.getElementsByClassName("AlternativeInputs")[1].focus();
            
        }
        return;
    }
    if (flag == "critUnlock") {
        if (critViewFlag == false) {
            critViewFlag = true;
            currentView += 1;
            showView(document.getElementById(schritte[currentView]));
            specificViewChanges(currentView); 
            window.location = "#overJump";
            document.getElementsByClassName("CriteriaInputs")[0].focus();

        }
        return;
    }
        if (assertView()) {
            disableNavElement(schritteNav[currentView]);
            //modifyData(currentView); // was macht diese Funktion hier?
            if (currentView < schritte.length - 1) {
                currentView += 1;
            } else {
                currentView = 0;
            }
            showView(document.getElementById(schritte[currentView]));
            document.getElementById(schritteNav[currentView]).style.backgroundColor = navActiveColor;
            specificViewChanges(currentView);
            if (currentView == 4) { // sending the data to the server to create a poll

                clearPoll();// fill poll object again just to be on the safe side
                fillPoll();

                sendPoll();
                sendEmptyResult();// send an empty vote to fill up the results file to show some empty data even before the first person has participated
                iniliazeAggMatrix();
            }
        }
    
}



/**
 * move to the previous view
 */
function back()
{
	hideView(schritte[currentView]);
	disableNavElement(schritteNav[currentView]);
	if (currentView > 0) {
		currentView -= 1;
	} else {
		currentView = schritte.length - 1;
	}
	document.getElementById(schritte[currentView]).style.visibility = "visible";
	document.getElementById(schritteNav[currentView]).style.backgroundColor = navActiveColor;
	specificViewChanges(currentView);
}
/**
 * check if all inputs have been entered before moving to next view
 * */
function assertView(){
    var temp = assertViewReal();
    if (temp == false) {
        shake(document.getElementById("navNext"),5);
        return false;
    }
    return true;

}

function assertViewReal() {
    nameInput = document.getElementById("NameInput");
    startHint = document.getElementById("startHint");
    critsCheck = document.getElementsByClassName("CriteriaInputs");
    critHint = document.getElementById("critHint");
    altsCheck = document.getElementsByClassName("AlternativeInputs");
    altHint = document.getElementById("altHint");

    unHighlightInput(nameInput);
    hideHints(startHint);
    hideHints(altHint);
    hideHints(critHint);

    for (var i = 0; i < critsCheck.length; i++) {
        unHighlightInput(critsCheck[i]);
    }
    for (var i = 0; i < altsCheck.length; i++) {
        unHighlightInput(altsCheck[i]);
    }

    if (nameInput.value == "") {
        highlightInput(nameInput);
        nameInput.placeholder = "Bitte einen Namen eingeben";

        showHints(startHint);
        window.location = "#TopicJump";
        return false;
    }

    altFlagAssert = true;
    for (var i = 0; i < altsCheck.length; i++) {
        if (altsCheck[i].value == "") {
            highlightInput(altsCheck[i]);
            altsCheck[i].placeholder = "Alternative eingeben";
            showHints(altHint);
            window.location = "#AltJump";
            altFlagAssert = false;
        }
    }
    if (altFlagAssert == false) return altFlagAssert;

    critFlagAssert = true;
    for (var i = 0; i < critsCheck.length; i++) {
        if (critsCheck[i].value == "") {
            highlightInput(critsCheck[i]);
            critsCheck[i].placeholder = "Kriterium eingeben";
            showHints(critHint);
            window.location = "#critJump";
            critFlagAssert = false;
        }
    }
    if (critFlagAssert == false) return critFlagAssert;
    return true;
}

function sendPoll() {
    //mistreating a get request as a pseudo post to save on some header space, because only literal knowledge is transferred and no semantic is required.
    $.get(baseUrl + "/add/" + specialCharacterEncode(JSON.stringify(currentPoll)),
        function (data, status) {

        });
}

    /**
     * create an empty result file when first creating a poll
     * */
function sendEmptyResult() {
    poll = { "id": currentPoll.id, "pollTitle": currentPoll.title, "name": "", "winner": [], "alternatives": currentPoll.alternatives };
    $.get(baseUrl + "/addvote/" + specialCharacterEncode(JSON.stringify(poll)),
        function (data, status) { });
}
function iniliazeAggMatrix() {
    var aggMatrix = {};
    for (var i = 0; i < currentPoll.criterias.length; i++) {
        aggMatrix[currentPoll.criterias[i].name] = new Array(currentPoll.alternatives.length);
    }

    var critList = new Array(currentPoll.criterias.length);
    for (var i = 0; i < currentPoll.criterias.length; i++) {
        critList[i] = currentPoll.criterias[i].name;
    }

    var data = {
        "id": currentPoll.id,
        "matrix": aggMatrix,
        "critList": critList
    };

    $.get(baseUrl + "/addAggMatrix/" + specialCharacterEncode(JSON.stringify(data)),
        function (data, status) { });
}

