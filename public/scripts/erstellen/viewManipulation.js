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
    if(!clickViewBool) passiveNavHover();
	document.getElementById("navBack").style.visibility = "visible";
	document.getElementById("navNext").style.visibility = "hidden";

	switch (curView) {
		case 0: // current view is "Thema", we are at the beginning
			document.getElementById("navBack").style.visibility = "hidden";
			break;
		case 1:	// current view is "Alternativen"
			while (altCounter < minAlternatives) {
				addInput("Alt");
			}
			break;
		case 2: // current view is "Kriterien"
			while (critCounter < minCriterias) {
				addInput("Crit");
			}
			break;
		case 3:	// current view is "Uebersicht"
            document.getElementById("navNext").src = 'icons/senden_orange.svg';
            document.getElementById("navNext").style.borderRadius = "10px";
			overview();
			addPencil();
			makeNavClickable();
            addMouseHover();
            document.getElementById("navNext").style.visibility = "visible";
			return;
			break;
		case 4:	// current view is "Link teilen" aka we are done
            shareRemoveSteps();
			document.getElementById("navBack").style.visibility = "hidden";
			document.getElementById("navNext").style.visibility = "hidden";
			document.getElementById("InputTeilnehmen").value = baseUrl + "/" + currentPoll.id;
			document.getElementById("InputAuswerten").value = baseUrl + "/auswertung/" + currentPoll.id ;
            document.getElementById("selberTeilnehmenLink").href = "/" + currentPoll.id ;
			makeNavUnclickable();
            removePencil();
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
    document.getElementById(nav).style.backgroundColor = navDisabledColor;
}

function shareRemoveSteps() {
    document.getElementById("step1Topic").remove();
    document.getElementById("step2Alternatives").remove();
    document.getElementById("step3Criterias").remove();
    document.getElementById("step4Overview").remove();
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
function clickToChangeView(view) {
    scrollToTop("stepsContainer");
    if (clickViewBool == true && assertView()){
		hideView(schritte[currentView]);
		disableNavElement(schritteNav[currentView]);
		modifyData(currentView); // was macht diese Funktion hier?
		currentView = view;

		document.getElementById(schritte[currentView]).style.visibility = "visible";
		document.getElementById(schritteNav[currentView]).style.backgroundColor = navActiveColor;

		specificViewChanges(view);
	}
}


/**
 * sets a boolean that allows nav elements on the top to be clicked to change views
 */
function makeNavClickable(){
    clickViewBool = true;
    $(".navSpanNoDrop").css("cursor", "pointer");
    document.getElementById(schritteNav[(schritteNav.length-1)]).style.cursor = "default";
    document.getElementById(schritteNav[(schritteNav.length-1)]).childNodes[1].style.cursor = "auto";
}


/**
 * if user hovers over disabled nav element show the no drop cursor
 * but if he hovers over current nav element do nothing
 * BUG POTENTIAL
 * */
function passiveNavHover() {
    
    for (var i = 0; i < schritteNav.length; i++) {
        if (document.getElementById(schritteNav[i]).childNodes.length > 1) {
            var x = document.getElementById(schritteNav[i]).childNodes[1].childNodes;
            if (x.length > 1)
                x[1].className = "navSpanNoDrop";
            else x[0].className = "navSpanNoDrop";
        }
    }

    var c = document.getElementById(schritteNav[currentView]).childNodes[0].childNodes;
    if (c.length > 1) { c[1].className = "navSpanDrop";}
    else c[0].className = "navSpanDrop";
}


/**
 * add on click events for the nav elements
 */
function makeNavUnclickable(){
	clickViewBool = false;
	for (var i = 0; i < schritteNav.length; i++) {
		$("#"+schritteNav[i]).mouseenter(function() {
			$(this).css("cursor", "auto");
			$(this).css("backgroundColor", navDisabledColor);
		})
	}
}
/**
 * mouse hover over nav elements
 * */
function addMouseHover(){
	for (var i = 0; i < schritteNav.length-1; i++) {
		$("#"+schritteNav[i]).mouseenter(function() {
            $(this).css("cursor", "pointer").css("backgroundColor", navActiveColor);
		}).mouseleave(function() {
			$(this).css("backgroundColor", navDisabledColor);

			$("#" + schritteNav[currentView]).css("backgroundColor", navActiveColor);
		});
	}
}
