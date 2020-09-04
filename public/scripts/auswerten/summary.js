auswertenFlag = true;
document.getElementsByClassName("navAuswerten")[0].style.backgroundColor = navAuswertenColor;
//console.log(document.getElementsByClassName("navAuswerten")[0]);
var ctx = document.getElementById("summaryChart").getContext("2d");
var data = new SummaryData();
var jayson = document.getElementById("dada").innerHTML;
var aggJSON = document.getElementById("xaxa").innerHTML;
jayson = specialCharacterDecode(jayson);
aggJSON = specialCharacterDecode(aggJSON);
if(jayson == ""){ // default testing case
  data.addVote("Döner", 0);
  data.addVote("Döner", 1);
  data.addVote("Brot", 0);
  data.addVote("Salat", 0);
  data.addVote("Käseschnitzel", 0);
  data.addVote("Yoghurt", 2);
  data.addParticipant("Michelle");
  data.addParticipant("Christopher");
} else { // real data
var cont = JSON.parse(jayson);
    var aggConverted = JSON.parse(aggJSON);
    var aggArray = aggConverted.matrix;
    var aggCrits = aggConverted.critList;
    //console.log(aggArray);
    createTable(cont.alternatives, aggArray, "aggTable", aggCrits);
    //console.log(cont.alternatives);
    if (cont.pollTitle != undefined)
        document.getElementById("auswertenTitle").innerHTML = cont.pollTitle;
    else
        document.getElementById("auswertenTitle").innerHTML = "";

    //console.log(cont);

    var casts = [];
    for (var ob in cont.alternatives){
      casts[cont.alternatives[ob]] = 0;
    }
    for (let i = 0; i < cont.votes.length; i++) {
        data.addParticipant(cont.votes[i].name);
      for(let j = 0; j < cont.votes[i].winner.length; j++){
        if(typeof(casts[cont.votes[i].winner[j]]) === 'undefined'){
          casts[cont.votes[i].winner[j]] = 0;
        }
        casts[cont.votes[i].winner[j]] = (casts[cont.votes[i].winner[j]]) + 1;

      }
    }
}


//console.log(casts);
Object.keys(casts).forEach((item, i) => {
//console.log(" Item:" + item + "   cont:" + casts[item]);
data.addVote(item, casts[item]);
});

function updateChart() {
    mybarchart.update();
}


fillParticipants("participantsTable", data.participants);

/**
 * fills the participant table with data
 * @param {any} tableName table to fill
 * @param {any} alts participant array to fill with
 */
function fillParticipants(tableName, alts) {
    var WelcomeAltTable = document.getElementById(tableName);
    for (var i = 0; i < alts.length; i++) {

            var row = document.createElement("tr");
            var cell2 = document.createElement("td");
            var textnode2 = document.createTextNode(alts[i]);

        if (i == 0) { // if no one has participated yet 
            if (cont.votes.length == 1 && cont.votes[0].name === "") {
                //console.log("no one yet");
                document.getElementById("bisherige").remove();
                document.getElementById("aggMatrixContainer").remove();
                textnode2 = document.createTextNode("bis jetzt keine Teilnehmer");
                var link = document.createElement("a");
                link.innerHTML = "Link zum Teilnehmen"
                link.href = baseUrl + "/" + cont.id;
                link.target = "_blank";
                //console.log(link);
                cell2.appendChild(link);
                var bre = document.createElement("br");
                cell2.prepend(bre);



                //cell2.style.fontStyle = "italic";
            }
        } else {
            window.onload = function () {
                document.getElementById("aggSpoiler").addEventListener("click", function () {
                    toggleMatrix();
                });
            }
        }

            cell2.prepend(textnode2);
            row.appendChild(cell2);
            WelcomeAltTable.appendChild(row);
        }


}
/**
 * creates the aggregation matrix from data
 * @param {any} altArray alternatives array 
 * @param {any} critArray criteria array
 * @param {any} tableId table id to work with
 * @param {any} critList list of criterias
 */
function createTable(altArray, critArray, tableId,critList) {
    //console.log(critList);
    var FirstRow = document.createElement("tr");

    var cell = document.createElement("td");
    var textnode = document.createTextNode("");
    cell.appendChild(textnode);
    FirstRow.appendChild(cell); // empty first cell in first row

    for (var i = 0; i < altArray.length; i++) {
        var cell = document.createElement("td");
        cell.className = "alternativeTd";
        var textnode = document.createTextNode(altArray[i]);
        cell.appendChild(textnode);
        FirstRow.appendChild(cell);
    }
    document.getElementById(tableId).appendChild(FirstRow);
    
    for (var i = 0; i < critList.length; i++) {
        //console.log(critList[i]);
        var row = document.createElement("tr");
        var cell2 = document.createElement("td");
        cell2.className = "critTdTable";

        var textnode2 = document.createTextNode(critList[i]);

        cell2.appendChild(textnode2);
        row.appendChild(cell2);

        for (var j = 0; j < altArray.length; j++) {
            var cellALT = document.createElement("td");
            var textnodeALT = document.createTextNode(critArray[critList[i]][j]);
            cellALT.className = "rateTd";

            cellALT.appendChild(textnodeALT);
            row.appendChild(cellALT);
        }


        document.getElementById(tableId).appendChild(row);
    }
}
//nice to have functionality, not done yet
function saveImage() {
    console.log("saving iamge");
    var url_base64 = document.getElementById('summaryChart').toDataURL('image/png');
    document.getElementById("link").href = url_base64;
}
/**
 * toggles visibility of aggregation matrix
 * */
function toggleMatrix() {
    var x = document.getElementById("aggTable");
    var y = document.getElementById("aggToggle");
    //console.log(x.style.display);
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
        y.innerHTML = "-";
    } else {
        x.style.display = "none";
        y.innerHTML = "+";
    }
}

window.configNight = {
    type: "bar",
    data: {
        labels: data.getLabels(),
        datasets: [{
            label: "Anzahl der Siege (Mehrere Sieger pro Person möglich)",
            data: data.getAmounts(),
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false,//we are manually adding the axis labels with html
            labels: {
                boxWidth: 0,
                boxHeight: 0,
                fontSize: 15,

                //fontColor:'#FFFFFF'
            },
        },
        scales: {
            yAxes: [{
                gridLines: {
                    zeroLineColor: 'white',
                    color: '#454545'
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                    suggestedMax: 2,
                    fontColor: "white"
                },
                scaleLabel: {
                    display: false, //we are manually adding the axis labels with html
                    labelString: 'Anzahl der Siege (Mehrere Sieger pro Person möglich)'
                }
            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: 'white',
                    color:'#454545'
                },
                ticks: {
                    fontColor: "white"
                },
            }]
        }
    }
};


    // created the bar graph showing the poll results

    window.config = {
        type: "bar",
        data: {
            labels: data.getLabels(),
            datasets: [{
                label: "Anzahl der Siege (Mehrere Sieger pro Person möglich)",
                data: data.getAmounts(),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            legend: {
                display: false,//we are manually adding the axis labels with html
                labels: {
                    boxWidth: 0,
                    boxHeight: 0,
                    fontSize: 15,

                    //fontColor:'#FFFFFF'
                },
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        zeroLineColor: 'black'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        suggestedMax: 2,
                        fontColor: barChartSwitch(),
                    },
                    scaleLabel: {
                        display: false, //we are manually adding the axis labels with html
                        labelString: 'Anzahl der Siege (Mehrere Sieger pro Person möglich)'
                    }
                }],
                xAxes: [{
                    gridLines: {
                        zeroLineColor: 'black'
                    },
                    ticks: {
                        fontColor: barChartSwitch()
                    },
                }]
            }
        }
    };


window.mybarchart = new Chart(ctx, config);

