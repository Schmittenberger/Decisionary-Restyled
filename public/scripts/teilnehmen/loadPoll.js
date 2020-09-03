//Niklas: ich erstelle mir hier ein Dummy Poll Object als default
tempPoll = new Poll("uniqueid", "Abendbrot", "Was sollen wir essen?");
tempPoll.alternatives = ["Döner", "Brot", "Salat","Käseschnitzel","Yoghurt"];
tempPoll.addCriteria("Preis");
tempPoll.addCriteria("Verfügbarkeit");
//tempPoll.addCriteria("Geschmack");
//tempPoll.addCriteria("Laune");

teilnehmenFlag = true;

jayson = document.getElementById("eidi").innerHTML;
jayson = specialCharacterDecode(jayson);
//jayson is printed in to the html page by the server in a div and then extracted from that div for further use
if(jayson == ""){

} else {

parsed = JSON.parse(jayson);

loadedPolll = new Poll(parsed.id, parsed.title, parsed.description);
loadedPolll.alternatives = parsed.alternatives;
parsed.criterias.forEach(element => {

  loadedPolll.addCriteria(element.name);
});
}

if(jayson == ""){
currentPoll = tempPoll;
} else {
currentPoll = loadedPolll;}
currentAltArray = currentPoll.alternatives;

loadPoll(currentPoll);
maxCurrentAlternatives = 0;

/**
 * intiliazes the poll, filling in all the needed data to participate
 * @param {poll} poll to load from
 */
function loadPoll(poll)
{
    document.getElementById("ThemaSpan").innerHTML = poll.title;
    if (poll.description != "") {
        document.getElementById("BeschreibungSpan").innerHTML = poll.description;
        document.getElementById("BeschreibungSpan").style.fontWeight = "normal";
    }
    else {
        document.getElementById("BeschreibungSpan").innerHTML = "nicht vorhanden";
        document.getElementById("BeschreibungSpan").style.fontStyle = "italic";
        document.getElementById("BeschreibungSpan").style.fontWeight = "normal";
    }
    loadCriterias(poll.getAllCriterias(), "critOrder");
    prepareAlternatives(poll.alternatives);
    maxCurrentAlternatives = poll.alternatives.length;
    fillWelcomeAltTable("WelcomeAltTable", poll.alternatives)
    if (poll.criterias.length == 1) ifOneCriteria();
}

function ifOneCriteria() {
    document.getElementById("CritH3changeable").innerHTML = "Da es nur ein Kriterium gibt, können Sie keine Reihenfolge festlegen."
    document.getElementById("orderHint").style.visibility = "hidden";
}


/**
 * preparing function first called when initializing alternative rating scheme
 * @param {array} altArray array of Alternatives
 */
function prepareAlternatives(altArray)
{
    document.getElementById("currentAlternativeSpan").innerHTML = altArray[0];
    document.getElementById("curAlt").innerHTML = "(1 / " + currentPoll.alternatives.length + ")";
    document.getElementById("curAlt").style.visibility = "hidden";
}
/**
 *
 * @param {any} tableName name of table element to append to
 * @param {any} alts alternative array from poll
 */
function fillWelcomeAltTable(tableName, alts) {
    WelcomeAltTable = document.getElementById(tableName);
    if (alts.length <= 4) {
        for (i = 0; i < alts.length; i++) {
            var row = document.createElement("tr");
            var cell2 = document.createElement("td");
            textnode2 = document.createTextNode(alts[i]);

            cell2.appendChild(textnode2);
            row.appendChild(cell2);
            WelcomeAltTable.appendChild(row);
        }
    } else {
        var rounded = Math.round(alts.length / 2);
        var c = 0;
        for (i = 0; i < rounded; i++) {
            var row = document.createElement("tr");
            var cell2 = document.createElement("td");
            textnode2 = document.createTextNode(altSafeguard(alts, c++));
            cell2.appendChild(textnode2);

            var cell3 = document.createElement("td");
            textnode3 = document.createTextNode(altSafeguard(alts, c++));
            cell3.appendChild(textnode3);

            row.appendChild(cell2);
            row.appendChild(cell3);
            WelcomeAltTable.appendChild(row);
        }
    }

}
/**
 * safely return values from array with proper bounds
 * @param {any} alts alternatives array
 * @param {int} c counter
 */
function altSafeguard(alts,c) {
    if (c < alts.length) return alts[c];
    else return "";
}
