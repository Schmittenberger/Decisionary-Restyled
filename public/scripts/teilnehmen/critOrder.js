
/**
 * appends each criteria to the criteria ordering view
 * @param {array} critArray array of criterias
 * @param {string} divId id to append to
 */
function loadCriterias(critArray, divId)
{
    for (i = 0; i < critArray.length; i++)
    {
        var newSpan = document.createElement('span');
        var newSpanCrit = document.createElement('span');
        var newSpanNumber = document.createElement('span');
        var newSpanImage = document.createElement('img');

        newSpanImage.src = "icons/Pfeil.svg";
        newSpanImage.className = "verticalMove";

        newSpanNumber.innerHTML = (i + 1) + ".";
        newSpanNumber.className = "critSpanNumber";
        
        newSpan.className = "critSpan";
        newSpanCrit.className = "critSpanInside";
        newSpan.id = "critSpan" + i;
        newSpanCrit.innerHTML = critArray[i];
        newSpan.appendChild(newSpanNumber);
        newSpan.appendChild(newSpanCrit);
        newSpan.appendChild(newSpanImage);
        document.getElementById(divId).appendChild(newSpan);
    }

    var el = document.getElementById(divId);
    sortable = Sortable.create(el,
        {
            handle: '',
            delay: 50,
            animation: 150,
            ghostClass: "sortable-ghost",  // Class name for the drop placeholder
            chosenClass: "sortable-chosen",  // Class name for the chosen item
            dragClass: "sortable-drag",  // Class name for the dragging item
            //direction: 'vertical', // Direction of Sortable (will be detected automatically if not given)
            onEnd: function (/**Event*/evt) {
                //var itemEl = evt.item;  // dragged HTMLElement
                //itemEl.draggable = true; // work on this

                rearrangedCrits();
            },
        });
}

/**
 * called after rearranging the criterias
 * resorts the criteries in the poll criteria array according to there position in the new list
 * */
function rearrangedCrits()
{


    critNumbers = document.getElementsByClassName("critSpanNumber");

    for (var i = 0; i < critNumbers.length; i++)
    {
        critNumbers[i].innerHTML = (i + 1) + ".";
    }

    var copyPoll = JSON.parse(JSON.stringify(currentPoll)); // create a deep copy from poll
    //console.log(currentPoll.criterias);

    critInside = document.getElementsByClassName("critSpanInside");
    var newCritOrderArrayString = new Array(currentPoll.criterias.length);
    for (var h = 0; h < critInside.length; h++) {
        var t = critInside[h].innerHTML;
        newCritOrderArrayString[h] = t;
    }


    for (var j = 0; j < newCritOrderArrayString.length; j++)
    {
        var t = newCritOrderArrayString[j];

        var oldIndex = findOldIndex(t, copyPoll);

        currentPoll.criterias[j] = copyPoll.criterias[oldIndex];

    }
    afterCritOrder();

}

/**
 * called after criteria in the poll has been updated after rearanging
 * */
function afterCritOrder()
{
    if (resFlag) {
        //console.log("rearranged new eval");
        overview();
    }
    document.getElementById("alternativeRatingTable").innerHTML = "";
    createTableRating(currentPoll.getAllCriterias(), ratingNamesWords, "alternativeRatingTable", lighterNavActiveTeilnehmenColor);
    updateAlternativeHUD();
}
/**
 * find the old position of a criteria in the poll object
 * 
 * @param {any} text the criteria to look for
 * @param {any} oldPoll copy of current poll to do the searching in
 */
function findOldIndex(text, oldPoll)
{
    for (var i = 0; i < oldPoll.criterias.length; i++) {
        if (oldPoll.criterias[i].name == text) {
            return i;
        }
    }
    return -1;
}
