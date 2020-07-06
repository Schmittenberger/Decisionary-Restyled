



document.getElementById("navNext").src = 'icons/teilnehmen_blau.svg';
document.getElementById("navNext").style.borderRadius = "10px";
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
    document.getElementById("curAlt").style.visibility = "hidden";
    if (!clickViewBool) passiveNavHover();
	document.getElementById("navBack").style.visibility = "visible";
	document.getElementById("navNext").style.visibility = "visible";

	switch (curView) {
		case 0: // current view is "name", we are at the beginning
			document.getElementById("navBack").style.visibility = "hidden";
            document.getElementById("navNext").src = 'icons/teilnehmen_blau.svg';
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
            document.getElementById("curAlt").style.visibility = "visible";
			break;
		case 3:	// current view is "Uebersicht"
            document.getElementById("navNext").src = 'icons/senden_orange.svg';
            document.getElementById("navNext").style.borderRadius = "10px";
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
    document.getElementById("navNext").style.borderRadius = "0px";
    document.getElementById("navBack").src = 'icons/Zuruck.svg';
    document.getElementById("navNext").src = 'icons/Weiter_grun.svg';
}

/**
 * disables a navigation element
 * @param {string} nav identifier of the navigation element
 */
function disableNavElement(nav) {
	document.getElementById(nav).style.backgroundColor = navDisabledTeilnehmenColor;
}


/**
 * if user hovers over disabled nav element show the no drop cursor
 * but if he hovers over current nav element do nothing
 * */
function passiveNavHover() {
    for (var i = 0; i < schritteNavTeilnehmen.length; i++) {
        document.getElementById(schritteNavTeilnehmen[i]).childNodes[1].className = "navSpanNoDrop";
    }
    document.getElementById(schritteNavTeilnehmen[currentView]).childNodes[1].className = "";
}

/**
 * adds a pencil to the first three nav Elements
 * to show the user that he can click the nav element to jump to view
 */
function addPencil() {
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
function makeNavClickable() {
    clickViewBool = true;
    $(".navSpanNoDrop").css("cursor", "pointer");
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