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
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//app.use(express.static(path.join(__dirname, "icons"))); funktioniert noch nicht
app.use(express.static(path.join(__dirname, "public")));


/**
 * Routes Definitions
 */

/*app.get("/", (req, res) => {
  res.status(200).send("WHATABYTE: Food For Devs");
});*/
//router for saving poll objects

var corsOptions = {
  origin: 'localhost',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}




app.get("/", (req, res) => {
  res.render("erstellen/index");
});

app.get("/teilnehmen", (req, res) => {
    res.render("teilnehmen/index");
});

app.get('/add/:poll',cors(corsOptions), savePoll);
app.get('/addvote/:poll',cors(corsOptions), saveVote);
app.get('/get/:poll',cors(corsOptions), getPoll);//implemented, but not used. Why, actually?




app.get("/auswertung", (req, res) => {
    res.render("auswerten/index");
});

app.get("/test", (req, res) => {
    res.render("dragdropPrototype");
});

app.get("/print/:uuid", (req, res) => {
    temp = fs.readFileSync(req.params.uuid + "_votes.json");
    cont = JSON.parse(temp);
    console.log(cont);
});

app.get('/:uuid', (req, res) => {
//*  parsed = JSON.parse(obj);
  //*string = JSON.stringify(parsed);
    res.render("teilnehmen/index",{uuid: fs.readFileSync(req.params.uuid + '.json',
    (err, data) => {  if (err) throw err;  console.log(data)})
});
});

/*app.get("/user", (req, res) => {
  res.render("user", { title: "Profile", userProfile: { nickname: "User1" } });
});

app.get("/logout", (req, res) => {
  res.render("logout", { title: "Profile", userProfile: { nickname: "Auth0" } });
}); */

/**
 * Server Activation
 */

 app.listen(port,'0.0.0.0', () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

/**
 * function for handling pseudo post requests.
 */
 function savePoll(req, res) {

   //res.addHeader("Access-Control-Allow-Origin", "*"); obsolete due to CORS library usage
   poll = JSON.parse(req.params.poll);

   fs.writeFile(poll.id + '.json', JSON.stringify(poll), function (err) {
     if (err) throw err;
     console.log('Replaced!');
   });


}

/**
* function for h
*
*/
function getPoll(req, res) {

  //res.addHeader("Access-Control-Allow-Origin", "*"); obsolete due to CORS library usage
  poll = JSON.parse(req.params.poll);

  //get "poll_votes.json"




//file is now existant, return innerts in res.
console.log(res); ///WHAT THE MOTHERTRUCKING FIREFUCK ARE YOU!?
//res.params.data = fs.readFileSync(file_path);
//cont = votes from other people
cont = fs.readFileSync(file_path);
res.send(cont);



}

function saveVote(req, res) {

  //res.addHeader("Access-Control-Allow-Origin", "*"); obsolete due to CORS library usage
  poll = JSON.parse(req.params.poll);
    file_path = poll.id + "_votes.json";
  console.log(poll);
  console.log("================");
  console.log();

  if (fs.existsSync(file_path)) {
    //file exists and is actually JSON
  } else {
    format = {
      "id" : poll.id,
      "winner" : []
    }
fs.writeFileSync(file_path, JSON.stringify(format));
}

temp = fs.readFileSync(file_path);
cont = JSON.parse(temp);

cont.votes[cont.votes.length] = {"name" : poll.name, "winner" : poll.winner} ;

fs.writeFileSync(file_path, JSON.stringify(cont));


}
