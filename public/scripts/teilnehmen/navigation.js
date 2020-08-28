var alternativeRatingViewFlag = false;

document.getElementById('TeilnehmerNameInput').addEventListener('keyup', function (event) {
    if (!nameFlag) setTimeout(function () { unlockView("nameUnlock"); }, showDelay);
});

/**
 * move to the next view
 */
function next() {
    
    if (!alternativeRatingViewFlag && assertView()) {
		//hideView(schritteTeilnehmen[currentView]);
		//disableNavElement(schritteNavTeilnehmen[currentView]);
		if (currentView < schritteTeilnehmen.length - 1) {
			currentView += 1;
		} 
		document.getElementById(schritteTeilnehmen[currentView]).style.visibility = "visible";
		//document.getElementById(schritteNavTeilnehmen[currentView]).style.backgroundColor = navActiveTeilnehmenColor;
		specificViewChanges(currentView);
		if (currentView == 2) { // reached the alternative ratings view where we will "fake" move next, but stay at current view
            alternativeRatingViewFlag = true;
        }
    } else {
        currentAlternativeAssertClicked == false;
		//console.log("inside alternatives and they are:" + validateAllInputsAlternative());
		if (validateAllInputsAlternative()) {
			if (currentAlternative >= currentPoll.alternatives.length-1) { // leaving rating view
                alternativeRatingViewFlag = false;
				next();
            } else {
                scrollToTop("stepsContainer");
				nextAlternative();
			}
		} else {
			unvalidatedViewAlternative(); // not all criterias rated
        }
    }
}

function unlockView(flag) {
    if (flag == "nameUnlock") {
        if (nameFlag == false) {
            nameFlag = true;
            currentView += 1;
            showView(document.getElementById(schritteTeilnehmen[currentView]));

            specificViewChanges(currentView);
            document.getElementById("TeilnehmerNameInput").focus();

        }
        return;
    }
    if (flag == "orderUnlock") {
        if (orderFlag == false) {
            altViewFlag = true;
            currentView += 1;
            showView(document.getElementById(schritte[currentView]));
            specificViewChanges(currentView);

            window.location = "#critJump";
            document.getElementsByClassName("AlternativeInputs")[1].focus();

        }
        return;
    }
}

/**
 * move to the previous view
 */
function back() {
	if (!alternativeRatingViewFlag) {
		hideView(schritteTeilnehmen[currentView]);
		disableNavElement(schritteNavTeilnehmen[currentView]);
		if (currentView > 0) {
			currentView -= 1;
		} else {
			currentView = schritteTeilnehmen.length - 1;
		}
		document.getElementById(schritteTeilnehmen[currentView]).style.visibility = "visible";
		document.getElementById(schritteNavTeilnehmen[currentView]).style.backgroundColor = navActiveTeilnehmenColor;
		specificViewChanges(currentView);
		if (currentView >= 2) { // reached the alternative ratings view where we will "fake" move next, but stay at current view
            alternativeRatingViewFlag = true;
		}
	} else {
		rateHint = document.getElementById("rateHint");
		hideHints(rateHint);
		if (currentAlternative <= 0) {
            alternativeRatingViewFlag = false;
			back();
		} else {
			backAlternative();
        }
    }
}
/**
 * checks if all conditions are met before switching to next view
 * same as erstellen assertview but specific for teilnehmen
 * */
function assertView() {
    
	switch (currentView)
	{
		case 0: // current view is "Name", we are at the beginning
			nameInput = document.getElementById("TeilnehmerNameInput");
			startHint = document.getElementById("nameHint");
			unHighlightInput(nameInput);
			hideHints(startHint);

			if (nameInput.value == "") {
				highlightInput(nameInput);
				nameInput.placeholder = "Namen eingeben";

				showHints(startHint);
				return false;
			}

			break;
		case 1:	// current view is "Kriterien ordnen"
			return true;
			break;
		case 2: // current view is "Alternativen raten"
			return true;
			break;
		case 3:	// current view is "Uebersicht"
			return true;
			break;
		default:
			return true;
	}
	return true;
}
