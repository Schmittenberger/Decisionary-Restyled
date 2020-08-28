# Decisionary-Restyled
Decisionary is a Node.js based decision finding webapp. This is a simplistic and colorless Restyle of the [original project](https://github.com/SchulzeAS/Decisionary)

# Information concerning this fork

Start the server with the following command in the main folder
```
node index.js --max-http-header-size 65536
```
The server is reachable under the address configured in config.js.

## Installed npm modules

Run the following command to install all node moduls required for this project.
```
npm ci
```

- nodemon 
- express (for views)
- pug (Template Engine for express)
- Browsersync // start with "npm run ui" in a new console

## Configure the URL
Change the **baseUrl** variable in config.js to your liking. Do not add a trailing slash ("/") at the end.
Use **http://localhost:8000** for local access to the server. 

## Documentation

Documentation is done with [JSDoc](https://jsdoc.app/). 
Install JSDoc with the following command:
```
npm install -g jsdoc
```
Run `jsdoc -r .` in the root folder. The documentation is outputed to `./out/index.html`.
