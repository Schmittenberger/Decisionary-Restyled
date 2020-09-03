var initialInputBackgroundColor;
var initialbackgroundColor;
var initalTextColor;

var nightmodeFlag = false;
/**
 * supposed to save inital colors for reverting to, 
 * but as I cant use variables with jquery css selectors i won't use this
 * */
function setInitalColors() {
    //initialInputColor = document.getElementsByClassName("NameInputH3")[0].style.color;
    initialInputBackgroundColor = "white";
    initialbackgroundColor = "white";
    //initialbackgroundColor = document.getElementById("root").style.backgroundColor;
    initalTextColor = "black";
}
/**
 * switches betweens night and day mode
 * */
function modeSwitch() {
    
    if (!nightmodeFlag) {
        console.log("switching to night mode");
        nightmodeFlag = true;
        nightmode();
    }
    else {
        console.log("switching to day mode");
        nightmodeFlag = false;
        daymode();
    }
    switchCritOrderSpan();
    switchRating();
    if (teilnehmenFlag == true) {
        updateAlternativeHUD();
        ratingResultTableSwitch();
    }
}

/*
 *  input[type="text"], textarea {
 *   background-color: #d1d1d1!important;
*}
 * 
 * */


/**
 * changes all colors to nightmode 
 * */
function nightmode() {
    $("body").css({ "background-color": "#212121" }); 
    $("h1,h2,h3,h4,h5,h6").css({ "color": "white" }); 
    $("div,span").css({ "color": "white" }); 
    $("textarea").css({ "background-color": "#212121" }); 
    $("textarea").css({ "color": "white" }); 
    $("textarea").css({ "border": "1px solid white" }); 
    $("#addAlternativeButton").attr("src", "icons/Plus_nightmode.svg");
    $("#addCriteriaButton").attr("src", "icons/Plus_nightmode.svg");

    $("input").css({ "background-color": "#212121" }); 
    $("input").css({ "border-bottom": "1px solid white" }); 
    $("input").css({ "color": "white" }); 

    $("i").css({ "color": "white" }); 

    if (teilnehmenFlag == true) {
        highlightDecidingCriteria(result.decidingIndex, "teilnehmenTable", "#212121", "green");
    }
    switchMinusBts();
    //document.styleSheets.
}
/**
 * changes colors back to normal aka day mode
 * */
function daymode() {
    $("body").css({ "background-color": "white" }); 
    $("h1,h2,h3,h4,h5,h6").css({ "color": "black" }); 
    $("div").css({ "color": "black" });
    $("span").css({ "color": "black" }); 
    $("textarea").css({ "background-color": "white" });
    $("textarea").css({ "color": "black" }); 
    $("textarea").css({ "border": "1px solid black" });
    $("#addAlternativeButton").attr("src", "icons/Plus.svg");
    $("#addCriteriaButton").attr("src", "icons/Plus.svg");

    $("input").css({ "background-color": "white" });
    $("input").css({ "border-bottom": "1px solid #3D3D3D" }); 
    $("input").css({ "color": "black" }); 

    $("i").css({ "color": "black" }); 

    if (teilnehmenFlag == true) {
        highlightDecidingCriteria(result.decidingIndex, "teilnehmenTable", "white", lighterNavActiveTeilnehmenColor);
    }

    switchMinusBts();
}
/**
 * returns src for images depending on mode
 * @param {string} type "minus" for remove buttons
 */
function plusMinusModeSwitch(type) {
    if (type == "minus") {
        if (!nightmodeFlag) return "icons/Minus.svg";
        if (nightmodeFlag) return "icons/Minus_nightmode.svg";
    }
}
/**
 * changes input remove buttons depending on mode
 * */
function switchMinusBts() {
    var bts = document.getElementsByClassName("removeBtn");
    if (bts.length > 0) {
        for (var i = 0; i < bts.length; i++) {
            bts[i].src = plusMinusModeSwitch("minus");
        }
    }

}

function switchInputs() {
    var bts = document.getElementsByClassName("w3-input");
    if (bts.length > 0) {
        for (var i = 0; i < bts.length; i++) {
            if (nightmodeFlag) {
                bts[i].style.borderBottom = " 1px solid white";
                bts[i].style.color = "white";
            }
            else {
                bts[i].style.borderBottom = " 1px solid black";
                bts[i].style.color = "black";
            }
        }
    }

}

function switchCritOrderSpan() {
    var bts = document.getElementsByClassName("critSpan");
    if (bts.length > 0) {
        for (var i = 0; i < bts.length; i++) {
            if (nightmodeFlag) {
                bts[i].style.border = " 1px solid white";
                bts[i].style.color = "white";
                bts[i].style.backgroundColor = "#212121";
                //bts[i].children[2].src = "icons/Pfeil_nightmode.svg";
            }
            else {
                bts[i].style.border = " 1px solid black";
                bts[i].style.color = "black";
                bts[i].style.backgroundColor = "white";
                //bts[i].children[2].src = "icons/Pfeil.svg";
            }
        }
    }

} 

function switchRating() {
    var bts = document.getElementsByClassName("ratingTd");
    if (bts.length > 0) {
        for (var i = 0; i < bts.length; i++) {
            if (nightmodeFlag) {
                bts[i].style.border = " 1px solid white";
                bts[i].style.color = "white";
                bts[i].style.backgroundColor = "#212121";
                //bts[i].children[2].src = "icons/Pfeil_nightmode.svg";
            }
            else {
                bts[i].style.border = " 1px solid black";
                bts[i].style.color = "black";
                bts[i].style.backgroundColor = "white";
                //bts[i].children[2].src = "icons/Pfeil.svg";
            }
        }
    }

}

function inputSwitch() {
    if (nightmodeFlag) return "#212121";
    else return "white";
}

function inputHighlightSwitch() {
    if (nightmodeFlag) return "#212121";
    else return "white";
}

function ratingReturnSwitch() {
    if (nightmodeFlag) return "white";
    else return "black";
}

function activeRatingSwitch() {
    if (nightmodeFlag) return "red";
    else return activeRadioColor;
}

function hoverRatingSwitch() {
    if (nightmodeFlag) return "rgba(0, 128, 0,1)";
    else return hoverRadioColor;
}

function activeHoverSwitch() {
    if (nightmodeFlag) return "rgba(0, 128, 0,0.4)";
    else return activeRadioColor;
}

function passivHoverSwitch() {
    if (nightmodeFlag) return "#212121";
    else return passiveRadioColor;
}

function ratingResultTableSwitch() {

    if (nightmodeFlag) {
        $("#firstTdFirstRowTeilnehmen").css("background-color", "#212121");
        $("#firstTdFirstRowTeilnehmen").css("border", "1px solid white");
    }
    else {
        $("#firstTdFirstRowTeilnehmen").css("background-color", "#e6e6e6");
        $("#firstTdFirstRowTeilnehmen").css("border", "1px solid black");
    }
        
        var bts = document.getElementsByClassName("alternativeTd");
        if (bts.length > 0) {
            for (var i = 0; i < bts.length; i++) {
                if (nightmodeFlag) {
                    bts[i].style.border = " 1px solid white";
                    bts[i].style.backgroundColor = "#212121";

                }
                else {
                    bts[i].style.border = " 1px solid black";
                    bts[i].style.backgroundColor = "#e6e6e6";
                }
            }
    }



    var bts = document.getElementsByClassName("critTdTable");
    if (bts.length > 0) {
        for (var i = 0; i < bts.length; i++) {
            if (nightmodeFlag) {
                bts[i].style.border = " 1px solid white";
                bts[i].style.backgroundColor = "#212121";

            }
            else {
                bts[i].style.border = " 1px solid black";
                bts[i].style.backgroundColor = "#e6e6e6";
            }
        }
    }

    var bts = document.getElementsByClassName("rateTd");
    if (bts.length > 0) {
        for (var i = 0; i < bts.length; i++) {
            if (nightmodeFlag) {
                bts[i].style.border = " 1px solid white";
                bts[i].style.backgroundColor = "#212121";
                bts[i].style.color= "white";

            }
            else {
                bts[i].style.border = " 1px solid black";
                bts[i].style.backgroundColor = "white";
                bts[i].style.color = "black";
            }
        }
    }
    
}

function highlightDecisiveSwitch() {
    if (nightmodeFlag) return "green";
    else return lighterNavActiveTeilnehmenColor;
}