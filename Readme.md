# Decisionary-Restyled
Decisionary is a Node.js based decision finding webapp. This is a minimalistic, colorless and one-page restyle of the [original project](https://github.com/SchulzeAS/Decisionary). 

# Lexicographical decision finding algorithm (ABX)
When setting up a decision the user enters the available options to choose from and critieras which influence the decision.
For example: When picking out a restaurant there are multiple different options (Greek, Chinese, etc.) to choose from and the criterias could be prices, meals, service, location etc.
Participating users define a order for the criterias based on their priorities. Options are then evaluated in relation to criterias with three possible answers (criteria completely fulfills the option - A, criteria barely fulfills the option - B, criteria does not fulfill option -X). The winning option is found by  iterating over the options and only keeping the highest scoring ones until one remains (or multiple if they are rated exactly the same). 

# Prerequisites

- Install Node.js
- Install npm (for Node.js modules) and install all required modules (below)
- (optional) port forwarding on router and dns address 

## Installed npm modules

Run the following command to install all node moduls required for this project.
```
npm ci
```

- nodemon  //start with "nodemon index"
- express (for views) and pug (templates)
- Browsersync // start with "npm run ui" in a new console

## Configure the URL
Change the **baseUrl** variable in config.js to your liking. Do not add a trailing slash ("/") at the end.
Use **http://localhost:PORT** for local access to the server. 

# How to start

Start the server with the following command in the main folder
```
node index.js --max-http-header-size 65536
```
The server is reachable under the address configured in config.js.

## Documentation

Documentation is done with [JSDoc](https://jsdoc.app/).
