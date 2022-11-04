# Timesheet 3 

## Plans
- Will be written in Javascript (Node, Express, and React(will make life much easier))
- Security will be main concern 
- All code will be documented for future purposes
- JS files will be connected wth ES modules
- going to add docker file to run it 

## Documentaion

#### Prequesities
Start by downloading and installing these:
- [Node JS](https://nodejs.org/en/) is needed for the backend 
- [Docker Engine](https://www.docker.com/) is required to run the server software.
- [Docker Compose](https://docs.docker.com/compose/) is required to orchestrate Docker. You might already have it, depending on your OS; see [the install page](https://docs.docker.com/compose/install/) for more details.

#### JavaScript  Pakages
Download these by command line:
- [Express.js](https://expressjs.com/) will have to be installed from the command line after a successful Node installation:
```Bash
$ npm i express --save
```
- Nodemon:
```bash
$ npm i nodemon -D 
```
- Bycrypt JS:
```bash
$ npm i bycrpt --save
```


#### Downloading the live database

The dashboard requires real data to function. You must import the live data into your local instance like so:
1. Log into the server phpMyAdmin at `https://dashboard.binghamtonsa.org/phpmyadmin/`.
2. Select the database you wish to use locally.
3. Click *Export*.
4. Under *Export method*, select `Custom`, so that we can access the next options.
5. Enable *Add `CREATE DATABASE / USE` statement*, as we will be importing the database from a clean slate.
6. Click *Go* at the bottom of the page to export the ZIP file or SQL file.


