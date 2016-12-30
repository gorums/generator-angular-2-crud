# Angular 2 Boilerplate

All this code is generated using a cli-tool ***(yo angular2-crud)*** with a reference to a file called **models.json** in the root of your project.

The code generated is a complete dashboard to handle (CRUD) the models defined into the **model.json**

Optional we generated a NodeJs Mock Server to test the server requests. 

### model.json

 ```
 {
    "doctor": {
        "id": { "type": "string", "require": "true" },
        "name": { "type": "string", "require": "true" },
        "address": "string"
    },
    "user": {
        "id": { "type": "string", "require": "true" },
        "name": { "type": "string", "require": "true" },
        "address": "string",
        "doctorId": { referent: doctor }
    }
}
 ```
 
The folder structure generated, how interact with the server and how keep the states in the client is based in the [angular 2 fundamentals course](http://courses.angularclass.com/courses/angular-2-fundamentals)


## What you need to run this app:

 * node and npm
 * Ensure you're running the latest versions Node v4.x.x+ (or v5.x.x) and NPM 3.x.x+
 * typescript (npm install --global typescript)
 * webpack (npm install --global webpack)
 * webpack-dev-server (npm install --global webpack-dev-server)

## Usage

To run the Angular 2 code
```
npm install
npm start
```
http://0.0.0.0:3000

To run a NodeJs Mock Server

```
cd server
npm install
npm start
```
http://0.0.0.0:3500



