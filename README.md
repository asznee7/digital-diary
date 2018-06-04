# Digital school diary for DSR JS School project 2018
[![license](https://img.shields.io/github/license/dotaxe/digital-diary.svg)](https://github.com/dotaxe/digital-diary/blob/master/LICENSE)

This is digital school diary web application created for the DSR JS School assignment. 

See the software requirement specification [here](https://github.com/dotaxe/digital-diary/blob/master/SRS.md).
## Demo
To do
## Dependencies
* NodeJS and npm
* PostgreSQL
* Windows only: Bash for Windows to run start scripts
## Installation
Make sure you have the appropriate dependencies installed and configured for your platform. 
1. Clone this repository
2. Set up local PostgreSQL server, create file ```/server/src/config/local.js``` and put there your database connection details like so: 
```javascript
    module.exports = {
      database: {
        config: {
          name: 'digital-diary',
          username: 'postgres',
          password: 'password'
        }
      }
    }
```
3. On the first start run ```bash ./install-start.sh``` to install package dependencies, use ```bash ./start.sh``` later on.
4. Now you should be able to access the web app at [http://localhost:3001](http://localhost:3001/)  and the server app at [http://localhost:3000](http://localhost:3000/).
## Usage
To login to the app you can take a pair of ```username:password``` in the file ```credentials.txt``` placed in the root of the repository.

App functionality described [here](https://github.com/dotaxe/digital-diary/blob/master/SRS.md#roles-and-permissions).
