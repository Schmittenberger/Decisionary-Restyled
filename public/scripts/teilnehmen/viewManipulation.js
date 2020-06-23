﻿document.getElementById("navNext").style.backgroundImage = "url('teilnehmen.png')";
var orderHintFlag = false;
/**
 * hides a view
 * @param {int} view index of the view to hide
 */
function hideView(view) {
	document.getElementById(view).style.visibility = "hidden";
	document.getElementById(view).style.zIndex = 0;
}

/**
 * makes changes to the view
 * @param {int} curView index of the current view
 */
function specificViewChanges(curView) {
	document.getElementById("navBack").style.visibility = "visible";
	document.getElementById("navNext").style.visibility = "visible";

	switch (curView) {
		case 0: // current view is "name", we are at the beginning
			document.getElementById("navBack").style.visibility = "hidden";
			document.getElementById("navNext").style.backgroundImage = "url('teilnehmen.png')";
			currentAlternative = 0; // reset alternative rating step
			updateAlternativeHUD();
			alternativeRatingViewFlag = false;
			return;
			break;
		case 1:	// current view is "Kriterien Reihenfolge"
			if (!orderHintFlag) showHints(document.getElementById("orderHint"));
			alternativeRatingViewFlag = false;
			break;
		case 2: // current view is "Bewerten"
			alternativeRatingViewFlag = true;
			break;
		case 3:	// current view is "Uebersicht"
			document.getElementById("navNext").style.backgroundImage = "url('finishedBtn.png')";
			overview();
			addPencil();
			makeNavClickable();
			addMouseHover();
			alternativeRatingViewFlag = false;
			return;
			break;
		default:
			break;
	}
	document.getElementById("navBack").style.backgroundImage = "url('backBtn.png')";
	document.getElementById("navNext").style.backgroundImage = "url('nextBtn.png')";
}

/**
 * disables a navigation element
 * @param {string} nav identifier of the navigation element
 */
function disableNavElement(nav) {
	document.getElementById(nav).style.backgroundColor = navDisabledTeilnehmenColor;
}


/**
 * adds a pencil to the first three nav Elements
 * to show the user that he can click the nav element to jump to view
 */
function addPencil(){
	pencils = document.getElementsByClassName("pencil");
	
	for (var i = 0; i < pencils.length; i++) {
		pencils[i].style.visibility="visible";
	}
}

/**
 * removes the pencil of the first three nav Elements
 */
function  removePencil(){
	pencils = document.getElementsByClassName("pencil");
	
	for (var i = 0; i < pencils.length; i++) {
		pencils[i].style.visibility="hidden";
	}
}

/**
 * changes the view when clicking a nav element on the top
 * @param {int} the view to jump to
 */
function clickToChangeView(view){
	if(clickViewBool == true){
		hideView(schritteTeilnehmen[currentView]);
		disableNavElement(schritteNavTeilnehmen[currentView]);
		currentView = view;
		
		document.getElementById(schritteTeilnehmen[currentView]).style.visibility = "visible";
		document.getElementById(schritteNavTeilnehmen[currentView]).style.backgroundColor = navActiveTeilnehmenColor;
		
		specificViewChanges(view);
	}
}


/**
 * sets a boolean that allows nav elements on the top to be clicked to change views
 */
function makeNavClickable(){
	clickViewBool = true;
}
 
 
/**
 * add on click events for the nav elements
 */
function makeNavUnclickable(){
	clickViewBool = false;
	for (var i = 0; i < schritteNavTeilnehmen.length-1; i++) {
		$("#" + schritteNavTeilnehmen[i]).mouseenter(function() {
			$(this).css("cursor", "auto");
			$(this).css("backgroundColor", navDisabledTeilnehmenColor);
		})
	}
}

function addMouseHover(){
	for (var i = 0; i < schritteNavTeilnehmen.length; i++) {
		$("#" + schritteNavTeilnehmen[i]).mouseenter(function() {
			$(this).css("cursor", "pointer").css("backgroundColor", navActiveTeilnehmenColor);
		}).mouseleave(function() {
			$(this).css("backgroundColor", navDisabledTeilnehmenColor);
			//console.log(currentView);
			$("#" + schritteNavTeilnehmen[currentView]).css("backgroundColor", navActiveTeilnehmenColor);
		});
	}
}