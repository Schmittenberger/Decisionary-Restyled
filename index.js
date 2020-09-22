// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const fs = require("fs");
var cors = require('cors');



/**
 * App Variables
 */

const app = express();
app.use(cors());
const port = process.env.PORT || "80";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//app.use(express.static(path.join(__dirname, "icons"))); //funktioniert nicht
app.use(express.static(path.join(__dirname, "public")));


/**
 * Routes Definitions
 */

/*app.get("/", (req, res) => {
  res.status(200).send("Decisionary");
});*/
//router for saving poll objects

/*var corsOptions = {
  origin: 'decisionary.ddns.net',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/


app.get("/config.js", (req, res) => {
    fs.readFile('config.js', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        return res.end();
    });

});

app.get("/", (req, res) => {
  res.render("erstellen/index");
});

app.get("/teilnehmen", (req, res) => {
    res.render("teilnehmen/index");
});

app.get('/add/:poll', savePoll);
app.get('/addvote/:poll', saveVote);
app.get('/addAggMatrix/:poll', aggMatrixVote);
app.get('/get/:poll', getPoll);//implemented, but not used. Why, actually?
/**
 * returns poll data for the auswertung page
 * */
app.get('/auswertung/:uuid', (req, res) => {
  //console.log("called auswertung for " + req.params.uuid);
    res.render("auswerten/index", {

        uuid: fs.readFileSync("polls/" + req.params.uuid + '_votes.json',
            (err, data) => { if (err) throw err; console.log(data) }),

        uuid: fs.readFileSync("polls/" + req.params.uuid + '_votes.json', 
            (err, data) => {
                if (err) throw err;
                //console.log(data);
            }),
// 0892e3092ca531ce9ea6d18f52c4003cbdabaec4
        aggMatrixJSON: fs.readFileSync("polls/" + req.params.uuid + '_aggMatrix.json',
            (err, data) => {
                if (err) throw err;
                //console.log(data);
            }),
})});
/**
 * basic auswertung page with a pre defined poll for testing
 * */
app.get("/auswertung", (req, res) => {
    res.render("auswerten/index");
});
/**
 * debug function to print a poll to the server console
 * */
app.get("/print/:uuid", (req, res) => {
    temp = fs.readFileSync("polls/" + req.params.uuid + "_votes.json");
    cont = JSON.parse(temp);
    console.log(cont);
});
/**
 * returns a page for teilnehmen, specific poll is parsed from the url
 * */
app.get('/:uuid', (req, res) => {
//*  parsed = JSON.parse(obj);
  //*string = JSON.stringify(parsed);
    res.render("teilnehmen/index",{uuid: fs.readFileSync("polls/" + req.params.uuid + '.json',
        (err, data) => {
            if (err) throw err; //console.log(data);
        })
});
});

/*app.get("/user", (req, res) => {
  res.render("user", { title: "Profile", userProfile: { nickname: "User1" } });
});

/**
 * Server Activation
 */

 app.listen(port,'0.0.0.0', () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
/**
 * decodes an object after receiving from client
 * intended for future expansion
 * @param {any} ob request to decode
 */
function decodeObject(ob) {
    return decodeURIComponent(ob);
}

/**
 * function for handling pseudo post requests and saving created polls.
 */
 function savePoll(req, res) {
   
   //res.addHeader("Access-Control-Allow-Origin", "*"); obsolete due to CORS library usage
     //console.log(decodeURIComponent(req.params.poll));
     //console.log((req));
     //console.log("");
     poll = JSON.parse(req.params.poll);
     console.log("saving poll " + poll.id);
   fs.writeFile("polls/" + poll.id + '.json', JSON.stringify(poll), function (err) {
     if (err) throw err;
     //console.log('Replaced!');
   });
     //console.log("\n---- saving success ----\n");
}

/**
* function for getting polls
*
*/
function getPoll(req, res) {
  //res.addHeader("Access-Control-Allow-Origin", "*"); obsolete due to CORS library usage
  poll = JSON.parse(req.params.poll);
  //get "poll_votes.json"
//file is now existant, return innerts in res.
console.log("getting " + res); 
//res.params.data = fs.readFileSync(file_path);
//cont = votes from other people
cont = fs.readFileSync(file_path);
res.send(cont);
}
/**
 * saves a users results from teilnehmen
 * @param {any} req
 * @param {any} res
 */
function saveVote(req, res) {

  //res.addHeader("Access-Control-Allow-Origin", "*"); obsolete due to CORS library usage
    poll = JSON.parse(req.params.poll);
    file_path = "polls/" + poll.id + "_votes.json";
    console.log("saving vote for " + poll.id);
  /*console.log(poll);
  console.log("================");
  console.log();*/

  if (fs.existsSync(file_path)) {
    //file exists and is actually JSON
  } else {
    format = {// use this format for the object
      "id": poll.id,
      "pollTitle": poll.pollTitle,
      "votes" : [],
      "alternatives" : poll.alternatives
    }
fs.writeFileSync(file_path, JSON.stringify(format));
}

temp = fs.readFileSync(file_path);
cont = JSON.parse(temp);

cont.votes[cont.votes.length] = {"name" : poll.name, "winner" : poll.winner} ;

fs.writeFileSync(file_path, JSON.stringify(cont));

res.send();
}
/**
 * saves a users results in the aggregation matrix
 * @param {any} req
 * @param {any} res
 */
function aggMatrixVote(req, res) {
    receivedData = JSON.parse((req.params.poll));
    console.log("saving agg Matrix entry for " + receivedData.id);
    file_path = "polls/" + receivedData.id + "_aggMatrix.json";
        if (fs.existsSync(file_path)) {//file exists and is actually JSON
            temp = fs.readFileSync(file_path);
            readData = JSON.parse(temp);
            //console.log("read in data: ");
            //console.log(readData)

            oldMatrix = readData.matrix;
            limiter = readData.critList.length;
            alternativesLimiter = oldMatrix[readData.critList[0]].length;

            for (var i = 0; i < limiter; i++) {
                for (var j = 0; j < alternativesLimiter; j++) {
                    // concat the new results to the old results
                    // then remove duplicate letters and sort it again
                    if (receivedData.matrix[readData.critList[i]][j] == null) break;
                    if (oldMatrix[readData.critList[i]][j] == null) oldMatrix[readData.critList[i]][j] = "";
                    oldMatrix[readData.critList[i]][j] += receivedData.matrix[readData.critList[i]][j];
                    oldMatrix[readData.critList[i]][j] = sortString(removeDuplicateCharacters(oldMatrix[readData.critList[i]][j]));
                }
            }
            fs.writeFileSync(file_path, JSON.stringify(readData));
        } else {
            //console.log("creating file\n");
            format = {
                "id": receivedData.id,
                "critList": receivedData.critList,
                "matrix": receivedData.matrix
            }
            fs.writeFileSync(file_path, JSON.stringify(format));
        }
        res.send();
}
/**
 * removes duplicate chars from a string
 * used for aggregation matrix
 * returns a string
 * @param {string} string string to remove duplicates from
 */
function removeDuplicateCharacters(string) {
    return string
        .split('')
        .filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        .join('');
}
/**
 * sort a string alphabetically
 * returns a sorted string
 * @param {string} str string to sort
 */
function sortString(str) {
    var arr = str.split('');
    var tmp;
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr.join('');
}
