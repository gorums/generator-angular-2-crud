# generator-angular-2-crud 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> This npm generate a CRUD for Angular 2 using a json model definition

## Installation

First, install [Yeoman](http://yeoman.io) and [generator-angular-2-crud][npm-url] using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)). Ensure you're running the latest versions Node v4.x.x+ (or v5.x.x) and NPM 3.x.x+

```bash
npm install -g yo
npm install -g generator-angular-2-crud
```

To run your new project you need install the next packages:

```bash
npm install --global typescript
npm install --global webpack
npm install --global webpack-dev-server
```
 
## DataModel

Access to the project folder and create a file named **dataModel.json**

```bash
mkdir my_new_crud && cd my_new_crud
touch dataModel.json
```

 * Example of dataModel.json

```json
 {
    "Doctors": {
        "Id": { "key": "true"},
        "Name": { "type": "string", "require": "true" },
        "Address": "string"
    },
    "Patients": {
        "Id": { "key": "true" },
        "Name": { "type": "string", "require": "true" },
        "Address": "string",
        "DoctorId": { "referent": "Doctors", "render": "Name" }
    },
    "relativeURI": "/api"
}
 ```
 * **key**: Define a field as key
 
 * **type**: Allow *string*, *boolean* and *number*
 
 * **require**: Define a field as require for validation
 
 * **referent**: Define the relation
 
 * **render**: Define what field show in the relation, in the example above it is going to render Doctors.Name instance of DoctorId
 
 * **relativeURI**: Define the relative URI. An example using */api* http://127.0.0.1:3000/api/myentity 
 
 without *relativeURI* the URL is going to be http://127.0.0.1:3000/myentity

## Generation

Then generate your new project into your project folder with the **dataModel.json** defined:

```bash
yo angular-2-crud
```

## Run

Now you can run your new CRUD

```bash
npm start
```

http://127.0.0.1:3000 or http://0.0.0.0:3000


## License

MIT © [gorums]()


[npm-image]: https://badge.fury.io/js/generator-angular-2-crud.svg
[npm-url]: https://npmjs.org/package/generator-angular-2-crud
[travis-image]: https://travis-ci.org/gorums/generator-angular-2-crud.svg?branch=master
[travis-url]: https://travis-ci.org/gorums/generator-angular-2-crud
[daviddm-image]: https://david-dm.org/gorums/generator-angular-2-crud.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gorums/generator-angular-2-crud

