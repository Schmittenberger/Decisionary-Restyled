const altId = "alt";
const critId = "crit";

var currentView = 0;
var clickViewBool = false;
var schritte = ["step1Topic", "step2Alternatives", "step3Criterias", "step4Overview", "step5Share"];
var schritteNav = ["navTopic", "navAlternatives", "navCriterias", "navOverview", "navShare"];
var schritteNavTeilnehmen = ["navName", "navCriteriaOrder", "navRating", "navOverview"];
var schritteTeilnehmen = ["step1Name", "step2CriteriaOrder", "step3Rating", "step4Overview"];

var ratingNames = ["A", "B", "X"];
var ratingNamesWords = ["Sehr gut", "Gut genug", "Überhaupt nicht"]; // has to have the same amount of elements as ratingNames!

var minAlternatives = 2;
var maxAlternatives = 15;
var altCounter = 0;

var minCriterias = 1;
var maxCriterias = 15;
var critCounter = 0;

var showDelay = 1000// number of milliseconds to wait before showing next view
//boolean flags for checking  if a view has been displayed
var titleFlag = false;
var altViewFlag = false;
var critViewFlag = false;
//for teilnehmen same flags
var nameFlag = false;
var orderFlag = false;
var resFlag = false;


var teilnehmenFlag = false;
var auswertenFlag = false;

var alternativesContainer = "alternativesContainer";
var criteriasContainer = "criteriasContainer";

var navActiveColor = "#A0C940"; 
var navDisabledColor = "#708F28"; 


var navActiveTeilnehmenColor = "#8fefec";
var navDisabledTeilnehmenColor = "#1abbb6";
var lighterNavActiveTeilnehmenColor = "rgba(143, 239, 236,0.3)";

var activeRadioColor = navActiveTeilnehmenColor; 
var passiveRadioColor = "white";
var hoverRadioColor = "rgba(189,236,232,0.5)"; // ein wenig heller als activeRadioColor

var navAuswertenColor = "#ff9854"; // same as erstellen passiv farbe

var currentPoll;
/**
 * encode special characters for sending to the server
 * reserve function to specialCharacterDecode
 * @param {string} object string to perform replacements on
 */
function specialCharacterEncode(object) {
    //return object.replace(/\?/g, "FRAGEZEICHEN").replace(/\#/g, "HASHTAG").replace(/\%/g, "PROZENT");
    return encodeURIComponent(object);
}
/**
 * decode special character received from server
 * reserve function to specialCharacterEncode
 * @param {string} object string to perform replacements on
 */
function specialCharacterDecode(object) {
    //return object.replace(/FRAGEZEICHEN/g, "?").replace(/HASHTAG/g, "#").replace(/PROZENT/g, "%");
    return object.replace(/&amp;/g,"&"); 
    //return decodeURIComponent(object);
}
/**
 * scrolls to the top of a class element
 * @param {any} classNameDiv class to scroll to top
 */
function scrollToTop(classNameDiv) {
    var myDiv = document.getElementsByClassName(classNameDiv)[0];
    myDiv.scrollTop = 0;
}
/**
 * shows a view
 * @param {any} DOM
 */
function showView(DOM) {
    DOM.style.visibility = "visible";
    DOM.style.display = "block";
    setTimeout(function () { DOM.style.opacity = 1; }, 1);

}